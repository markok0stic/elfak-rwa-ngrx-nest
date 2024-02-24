import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { BrandDto } from './dto/brand.dto';
import { BrandUpdateDto } from './dto/brand.update';
import { HttpResponseErrorsEnum } from '@shared/enums/http.response.errors.enum';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async create(brandDto: BrandDto): Promise<Brand> {
    const { name, status } = brandDto;

    if (!name) {
      throw new BadRequestException(HttpResponseErrorsEnum.MissingFields);
    }

    if (await this.findOne(name)) {
      throw new BadRequestException(
        HttpResponseErrorsEnum.AlreadyExistingBrand,
      );
    }

    const brand = new Brand();
    brand.name = name;
    brand.status = status;

    return this.brandRepository.save(brand);
  }

  async getAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async getOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }
    return brand;
  }

  async findOne(name: string): Promise<Brand | undefined> {
    return this.brandRepository.findOneBy({ name: name });
  }

  async update(id: number, brandUpdateDto: BrandUpdateDto): Promise<Brand> {
    const { name, status } = brandUpdateDto;
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }

    brand.name = name || brand.name;
    brand.status = status || brand.status;

    return this.brandRepository.save(brand);
  }

  async delete(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }
}
