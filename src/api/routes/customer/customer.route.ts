import CreateCustomerDto from '@api/dtos/customer/input/create-customer.dto';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CustomerController from 'adapters/controllers/customer.controller';
import CustomerEntity from 'core/entities/customer.entity';
import FindCustomerByParamsDto from '../../dtos/customer/input/find-one-by-params.dto';
import CustomerDto from '@api/dtos/customer/output/customer.dto';

@ApiTags('customers')
@Controller('customers')
export default class CustomerRoute {
  private readonly _customerController: CustomerController = new CustomerController(this._customerRepository);

  constructor(
    private _customerRepository: CustomerRepository
  ) { }

  @Get('by-params')
  async findOne(@Query() queryParams: FindCustomerByParamsDto) {
    try {
      return await this._customerController.findCustomerByParams(queryParams);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return this._customerController.createCustomer(createCustomerDto);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
