import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { ModelDto } from './dto/model.dto';
import { ModelUpdateDto } from './dto/model.update';
import { HttpResponseErrorsEnum } from '@shared/enums/http.response.errors.enum';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model) private modelRepository: Repository<Model>,
  ) {}

  async create(modelDto: ModelDto): Promise<Model> {
    const { name, status } = modelDto;

    if (!name) {
      throw new BadRequestException(HttpResponseErrorsEnum.MissingFields);
    }

    if (await this.findOne(name)) {
      throw new BadRequestException(
        HttpResponseErrorsEnum.AlreadyExistingModel,
      );
    }

    const model = new Model();
    model.name = name;
    model.status = status;

    return this.modelRepository.save(model);
  }

  async getAll(): Promise<Model[]> {
    return this.modelRepository.find();
  }

  async getOne(id: number): Promise<Model> {
    const model = await this.modelRepository.findOneBy({ id });
    if (!model) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }
    return model;
  }

  async findOne(name: string): Promise<Model | undefined> {
    return this.modelRepository.findOneBy({ name: name });
  }

  async update(id: number, modelUpdateDto: ModelUpdateDto): Promise<Model> {
    const { name, status } = modelUpdateDto;
    const model = await this.modelRepository.findOneBy({ id });
    if (!model) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }

    model.name = name || model.name;
    model.status = status || model.status;

    return this.modelRepository.save(model);
  }

  async delete(id: number): Promise<void> {
    await this.modelRepository.delete(id);
  }
}
