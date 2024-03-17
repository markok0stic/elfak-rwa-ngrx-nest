import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from '../product/entities/product.entity';
import { SaleDto } from './dto/sale.dto';
import { SaleDetail } from './entities/sale.details.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private readonly saleDetailRepository: Repository<SaleDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createSale(dto: SaleDto): Promise<Sale> {
    const sale = new Sale();
    sale.total = dto.saleDetails.reduce(
      (acc, cur) => acc + cur.salesPrice * cur.quantity,
      0,
    );
    sale.createdOn = new Date();

    const savedSale = await this.saleRepository.save(sale);

    for (const detail of dto.saleDetails) {
      const product = await this.productRepository.findOneBy({
        id: detail.productId,
      });
      if (!product) {
        throw new BadRequestException(
          `Product with ID ${detail.productId} not found`,
        );
      }
      const saleDetail = new SaleDetail();
      saleDetail.sale = savedSale;
      saleDetail.product = product;
      saleDetail.quantity = detail.quantity;
      saleDetail.salesPrice = detail.salesPrice;

      await this.saleDetailRepository.save(saleDetail);

      product.quantity -= detail.quantity;
      await this.productRepository.save(product);
    }

    return savedSale;
  }

  public async getAllSales(): Promise<Sale[]> {
    return this.saleRepository.find({
      relations: { saleDetails: { product: true } },
    });
  }

  public async getSaleById(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: { saleDetails: { product: true } },
    });

    if (!sale) throw new BadRequestException('Sale Not Found');

    return sale;
  }

  public async delete(id: number): Promise<{ success: boolean }> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['saleDetails'],
    });

    if (!sale) {
      throw new BadRequestException('Sale Not Found');
    }

    try {
      await this.saleRepository.remove(sale);
      return { success: true };
    } catch (error) {
      // You should also log the error for debugging purposes
      console.error(error);
      throw new BadRequestException('Failed to delete the sale');
    }
  }
}
