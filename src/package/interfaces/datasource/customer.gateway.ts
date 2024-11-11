import FindCustomerByParamsDto from '@api/dtos/customer/input/find-one-by-params.dto';
import CustomerEntity from 'core/entities/customer.entity';
import { UUID } from 'crypto';

export default interface ICustomerGateway {
  insert(customer: CustomerEntity): Promise<CustomerEntity>;
  findOneByParams(params: FindCustomerByParamsDto): Promise<CustomerEntity>;
  findOneById(id: UUID): Promise<CustomerEntity>;
}
