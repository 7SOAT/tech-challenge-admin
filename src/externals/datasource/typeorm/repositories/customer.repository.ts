
import CustomerEntity from '@entities/customer.entity';
import CustomerModel from '@models/customer.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';

export default class CustomerRepository {
  constructor(
    @InjectRepository(CustomerModel)
    private _customerRepository: Repository<CustomerModel>
  ) {}

  async findOneById(id: UUID): Promise<CustomerModel> {
    try {
      return await this._customerRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(`Error finding customer by id: ${error}`);
    }
  }

  async findOneByParams(params: CustomerEntity): Promise<CustomerModel> {
    try {
      return await this._customerRepository.findOne({ where: params });
    } catch (error) {
      throw new Error(`Error finding customer by cpf: ${error}`);
    }
  }

  async insert(customer: CustomerModel): Promise<CustomerModel> {
    try {
      return await this._customerRepository.save(customer);
    } catch (error) {
      throw new Error(`Error inserting customer: ${error}`);
    }
  }
}
