import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { DeleteResult, Repository } from 'typeorm';
import { SupplierDto } from './dto/supplier.dto';
import { StatusEnum } from '@shared/enums/status.enum';
import { HttpResponseErrorsEnum } from '@shared/enums/http.response.errors.enum';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(supplierDto: SupplierDto): Promise<Supplier> {
    const { name, mobile, address } = supplierDto;

    if (!name || !mobile || !address) {
      throw new BadRequestException(HttpResponseErrorsEnum.MissingFields);
    }

    const supplier = new Supplier();
    supplier.name = name;
    supplier.mobile = mobile;
    supplier.address = address;
    supplier.status = supplierDto.status || StatusEnum.Active;

    return this.supplierRepository.save(supplier);
  }

  async getAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  async getOne(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOneBy({ id });
    if (!supplier) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }
    return supplier;
  }

  async update(id: number, supplierDto: SupplierDto): Promise<Supplier> {
    let supplier = await this.supplierRepository.findOneBy({ id });

    if (!supplier) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }

    supplier = { ...supplier, ...supplierDto };
    return this.supplierRepository.save(supplier);
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.supplierRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(HttpResponseErrorsEnum.NotFoundEntry);
    }

    return result;
  }
}
