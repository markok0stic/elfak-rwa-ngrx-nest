import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { HttpResponseErrorsEnum } from '@shared/enums/http.response.errors.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(categoryDto): Promise<Category> {
    const { name, description } = categoryDto;

    if (!name) {
      throw new BadRequestException(HttpResponseErrorsEnum.MissingFields);
    }

    if (await this.findOne(name)) {
      throw new BadRequestException(
        HttpResponseErrorsEnum.AlreadyExistingCategory,
      );
    }

    const category = new Category();
    category.name = name;
    category.description = description;

    return this.categoryRepository.save(category);
  }

  public async findOne(name: string): Promise<Category | undefined> {
    return this.categoryRepository.findOneBy({ name: name });
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }
    return category;
  }

  async update(id: number, categoryDto): Promise<Category> {
    const { name, description } = categoryDto;
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }

    if (await this.findOne(name)) {
      throw new BadRequestException(
        HttpResponseErrorsEnum.AlreadyExistingCategory,
      );
    }

    category.name = name || category.name;
    category.description = description || category.description;

    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
