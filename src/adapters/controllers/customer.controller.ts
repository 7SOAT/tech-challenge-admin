import CreateCustomerDto from '@api/dtos/customer/input/create-customer.dto';
import FindCustomerByParamsDto from '@api/dtos/customer/input/find-one-by-params.dto';
import CustomerDto from '@api/dtos/customer/output/customer.dto';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import CustomerGateway from '@gateways/customer.gateway';
import CustomerUseCase from '@usecases/customer.usecase';
import CustomerPresenter from 'adapters/presenters/customer.presenter';
import CustomerEntity from 'core/entities/customer.entity';

export default class CustomerController {
  private readonly _customerGateway = new CustomerGateway(
    this._customerRepository
  );
  private readonly _customerUseCase = new CustomerUseCase(
    this._customerGateway
  );

  constructor(private _customerRepository: CustomerRepository) {}

  async findCustomerByParams(
    queryParams: FindCustomerByParamsDto
  ): Promise<CustomerDto> {
    const result: CustomerEntity = await this._customerUseCase.findCustomerByParams(queryParams);
    return CustomerPresenter.PresentOne(result);
  }

  async createCustomer(customer: CreateCustomerDto): Promise<CustomerDto> {
    const result = await this._customerUseCase.createCustomer(customer);
    return CustomerPresenter.PresentOne(result);
  }
}
