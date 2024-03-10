import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../model/entities/model.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Brand)
    private reportRepository: Repository<Brand>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public async create(productDto: ProductDto): Promise<Product> {
    const category: Category | null = await this.categoryRepository.findOneBy({
      id: productDto.categoryId,
    });

    if (!category) throw new BadRequestException('InvalidCategory');

    product.gallery = paths;
    product.createdBy = user;
    product.category = category;

    return this.productRepository.save(product);
  }

  public async update(
    dto: ProductDto,
    images: Array<Express.Multer.File>,
    user: User,
  ): Promise<Product> {
    if (!user) throw new BadRequestException('InvalidUser');

    const ad: Product = await this.productRepository.findOne({
      where: { id: dto.id },
      relations: { category: true },
    });

    if (!ad) throw new BadRequestException('ProductNotFound');

    const category: Category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) throw new BadRequestException('CategoryNotFound');

    ad.title = dto.title;
    ad.price = dto.price;
    ad.brand = dto.brand;
    ad.caliber = dto.caliber;
    ad.description = dto.description;
    ad.category = category;

    let imgs: string[] = [];
    if (images.length !== 0) {
      images.forEach((img) => imgs.push(img.filename));

      const fs = require('fs');
      ad.gallery.forEach((img) => {
        fs.unlinkSync(`${UPLOAD_DESTINATION}/${img}`);
      });
    } else {
      imgs = dto.gallery;
    }

    ad.gallery = imgs;

    if (!(await this.productRepository.update(dto.id, ad))) return null;

    return ad;
  }

  public async getBySearch(dto: ProductDto): Promise<Product[]> {
    const { searchInput, categoryId } = dto;

    let ads: Product[] = await this.productRepository.find({
      where: { deleted: false },
      relations: { createdBy: true, category: true },
    });

    if (categoryId) {
      ads = ads.filter((ad: Product) => ad.category.id == categoryId);
    }

    if (searchInput.length > 0) {
      ads = ads.filter(
        (ad) =>
          ad.title.includes(searchInput) ||
          ad.brand.includes(searchInput) ||
          ad.caliber.includes(searchInput),
      );
    }

    return ads;
  }

  public async getAll(): Promise<Product[]> {
    const ads: Product[] = await this.productRepository.find({
      where: { deleted: false },
      relations: { createdBy: true, category: true },
    });

    return ads;
  }

  public async getOne(id: number, accessUser: User) {
    if (!accessUser) return new BadRequestException('InvalidUser');

    const user: User = await this.userRepository.findOne({
      where: { id: accessUser.id },
      relations: { favourites: true },
    });

    const ad: Product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: { createdBy: true, category: true },
    });

    if (!ad) return new BadRequestException('AdNotFound');

    const isSaved = !!user.favourites.find((fav) => {
      return fav.id === ad.id;
    });

    const data = {
      ...ad,
      isSaved: isSaved,
    };

    return data;
  }

  public async getByUser(id: number) {
    const user: User | null = await this.userRepository.findOne({
      where: { id: id },
      relations: { myAds: true },
    });

    if (!user) throw new BadRequestException('InvalidUser');

    const data = user.myAds.map((ad: Product) => {
      if (!ad.deleted)
        return {
          ...ad,
          createdBy: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
            imagePath: user.imagePath,
            address: user.address,
          },
        };
    });

    return data;
  }

  public async getByUserSaved(accessUser: User) {
    if (!accessUser) return new BadRequestException('InvalidUser');

    const user: User = await this.userRepository.findOne({
      where: { id: accessUser.id },
      relations: { favourites: true },
    });

    const data = user.favourites.map((ad: Product) => {
      if (!ad.deleted)
        return {
          ...ad,
          createdBy: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
            imagePath: user.imagePath,
            address: user.address,
          },
        };
    });

    return data;
  }

  public async softDelete(dto: ProductDto, userId: number) {
    const { id } = dto;
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || user.role !== Role.Admin)
      throw new BadRequestException('Forbidden');

    const ad: Product = await this.productRepository.findOne({
      where: { id: id },
      relations: { reports: true },
    });

    if (!ad) throw new BadRequestException('AdNotFound');

    ad.reports.forEach(async (report: Report) => {
      await this.reportRepository.update(report.id, {
        status: ReportStatus.Resolved,
      });
    });

    ad.deleted = true;

    if (!(await this.productRepository.save(ad))) return { success: false };

    return { success: true };
  }

  public async delete(id: number, userId: number) {
    const ad: Product = await this.productRepository.findOne({
      where: { id: id },
      relations: { createdBy: true, reports: true },
    });

    if (ad.createdBy.id !== userId) {
      throw new BadRequestException('InvalidUser');
    }

    if (ad.gallery.length > 0) {
      const { gallery } = ad;

      const fs = require('fs');

      gallery.forEach((img) => {
        const path = `${UPLOAD_DESTINATION}/${img}`;
        fs.unlinkSync(path);
      });
    }

    if (!(await this.productRepository.delete(id))) return { success: false };

    return { success: true };
  }
}
