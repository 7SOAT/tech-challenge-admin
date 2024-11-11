import CustomerDto from '@api/dtos/customer/output/customer.dto';
import CustomerEntity from '@entities/customer.entity';
import { plainToInstance } from 'class-transformer';

class CustomerPresenter {
  static PresentOne(customer: CustomerEntity): CustomerDto {
    return new CustomerDto(
      customer.id,
      customer.name,
      customer.email,
      customer.cpf
    );
  }
}

export default CustomerPresenter;
