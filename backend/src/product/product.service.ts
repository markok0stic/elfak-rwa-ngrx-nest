import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../model/entities/model.entity';
import { ProductUpdateDto } from './dto/product.update';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
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

    const brand: Brand | null = await this.brandRepository.findOneBy({
      id: productDto.brandId,
    });

    if (!brand) throw new BadRequestException('Invalid Brand');

    const model: Model | null = await this.modelRepository.findOneBy({
      id: productDto.modelId,
    });

    if (!model) throw new BadRequestException('Invalid Model');

    const product = this.productRepository.create(productDto);
    product.category = category;
    product.brand = brand;
    product.model = model;
    product.createdOn = new Date();

    return this.productRepository.save(product);
  }

  public async update(dto: ProductUpdateDto): Promise<Product> {
    const product: Product = await this.productRepository.findOne({
      where: { id: dto.id },
      relations: { category: true, brand: true, model: true },
    });

    if (!product) throw new BadRequestException('Product Not Found');

    const category: Category | null = await this.categoryRepository.findOneBy({
      id: dto.categoryId,
    });

    if (!category) throw new BadRequestException('Invalid Category');

    const brand: Brand | null = await this.brandRepository.findOneBy({
      id: dto.brandId,
    });

    if (!brand) throw new BadRequestException('Invalid Brand');

    const model: Model | null = await this.modelRepository.findOneBy({
      id: dto.modelId,
    });

    if (!model) throw new BadRequestException('Invalid Model');

    product.name = dto.name;
    product.description = dto.description;
    product.quantity = dto.quantity;
    product.purchasePrice = dto.purchasePrice;
    product.salesPrice = dto.salesPrice;
    product.category = category;
    product.brand = brand;
    product.model = model;

    return this.productRepository.save(product);
  }

  public async getAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { category: true, model: true, brand: true },
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
      relations: { category: true, model: true, brand: true },
    });

    if (!product) return new BadRequestException('Product Not Found');

    return product;
  }

  public async delete(id: number) {
    const product: Product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: { category: true, model: true, brand: true },
    });

    if (!product) return new BadRequestException('Product Not Found');

    if (!(await this.productRepository.delete(id))) return { success: false };

    return { success: true };
  }
}
