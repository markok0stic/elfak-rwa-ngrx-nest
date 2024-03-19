import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Sale } from '../sale/entities/sale.entity';
import { SaleDetail } from '../sale/entities/sale.details.entity';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { DashboardDataDto } from './dto/dashboard.data.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private saleDetailsRepository: Repository<SaleDetail>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getDashboardData() {
    const userCount = await this.userRepository.count();
    const categoriesCount = await this.categoryRepository.count();
    const productsCount = await this.productRepository.count();
    const totalSales = await this.saleRepository.count();

    const totalProfit = await this.calculateTotalProfit();
    const bestSellingProducts = await this.getBestSellingProducts();
    const latestSales = await this.saleRepository.find({
      order: {
        createdOn: 'DESC',
      },
      relations: { saleDetails: { product: true } },
      take: 10,
    });
    const recentlyCreatedProducts = await this.productRepository.find({
      order: {
        createdOn: 'DESC',
      },
      take: 10,
    });

    return {
      userCount,
      categoriesCount,
      productsCount,
      totalSales,
      bestSellingProducts,
      latestSales,
      recentlyCreatedProducts,
      totalProfit: totalProfit.toFixed(2),
    } as DashboardDataDto;
  }

  async getBestSellingProducts(): Promise<any[]> {
    return await this.saleDetailsRepository
      .createQueryBuilder('saleDetail')
      .select('product.name', 'productName')
      .addSelect('SUM(saleDetail.quantity)', 'totalSold')
      .innerJoin('saleDetail.product', 'product')
      .groupBy('product.id')
      .orderBy('totalSold', 'DESC')
      .getRawMany();
  }

  async calculateTotalProfit(): Promise<number> {
    const sales = await this.saleRepository.find({
      relations: { saleDetails: { product: true } },
    });

    return sales.reduce((acc, sale) => {
      const saleProfit = sale.saleDetails.reduce((accDetail, detail) => {
        const purchasePriceTotal =
          detail.product.purchasePrice * detail.quantity;
        const salePriceTotal = detail.salesPrice * detail.quantity;
        return accDetail + (salePriceTotal - purchasePriceTotal);
      }, 0);

      return acc + saleProfit;
    }, 0);
  }
}
