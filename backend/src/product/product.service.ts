import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductUpdateDto } from './dto/product.update';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public async create(productDto: ProductDto): Promise<Product> {
    const productBySku: Product = await this.productRepository.findOneBy({
      sku: productDto.sku,
    });

    if (productBySku)
      throw new BadRequestException(
        `Product with SKU: ${productDto.sku} already exists`,
      );

    const category: Category | null = await this.categoryRepository.findOneBy({
      id: productDto.categoryId,
    });

    if (!category) throw new BadRequestException('Invalid Category');

    const product = this.productRepository.create(productDto);
    product.category = category;
    product.createdOn = new Date();

    return this.productRepository.save(product);
  }

  public async update(dto: ProductUpdateDto): Promise<Product> {
    const product: Product = await this.productRepository.findOne({
      where: { id: dto.id },
      relations: { category: true },
    });

    if (!product) throw new BadRequestException('Product Not Found');

    const category: Category | null = await this.categoryRepository.findOneBy({
      id: dto.categoryId,
    });

    if (!category) throw new BadRequestException('Invalid Category');

    product.name = dto.name;
    product.description = dto.description;
    product.quantity = dto.quantity;
    product.purchasePrice = dto.purchasePrice;
    product.salesPrice = dto.salesPrice;
    product.category = category;

    return this.productRepository.save(product);
  }

  public async getAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { category: true },
    });
  }

  public async getRecentlyAdded(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { category: true },
      order: {
        createdOn: 'DESC',
      },
      take: 10,
    });
  }

  public async getOne(id: number) {
    const product: Product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: { category: true },
    });

    if (!product) return new BadRequestException('Product Not Found');

    return product;
  }

  public async delete(id: number) {
    const product: Product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: { category: true },
    });

    if (!product) return new BadRequestException('Product Not Found');

    if (!(await this.productRepository.delete(id))) return { success: false };

    return { success: true };
  }
}
