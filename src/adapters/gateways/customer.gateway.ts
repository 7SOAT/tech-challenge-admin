
import ICustomerGateway from '@interfaces/datasource/customer.gateway';
import CustomerModel from '@models/customer.model';
import CustomerRepository from '@repositories/customer.repository';
import { plainToInstance } from 'class-transformer';
import CustomerEntity from 'core/entities/customer.entity';
import { UUID } from 'crypto';

export default class CustomerGateway implements ICustomerGateway {
  constructor(
    private _customerRepository: CustomerRepository
  ) {}

  async findOneById(id: UUID): Promise<CustomerEntity> {
    try {
      const result = await this._customerRepository.findOneById(id);
      return plainToInstance(CustomerEntity, result, {enableImplicitConversion: true});
    } catch (error) {
      throw new Error(`Error finding customer by id: ${error}`);
    }
  }

  async findOneByParams(params: CustomerEntity): Promise<CustomerEntity> {
    try {
      const customer = await this._customerRepository.findOneByParams(params);
      return plainToInstance(CustomerEntity, customer, {enableImplicitConversion: true});
    } catch (error) {
      throw new Error(`Error finding customer by cpf: ${error}`);
    }
  }

  async insert(customer: CustomerEntity): Promise<CustomerEntity> {
    try {
      const customerModel = plainToInstance(CustomerModel, customer, {enableImplicitConversion: true})
      const result = this._customerRepository.insert(customerModel)
      return plainToInstance(CustomerEntity, result, {enableImplicitConversion: true});
    } catch (error) {
      throw new Error(`Error inserting customer: ${error}`);
    }
  }
}
