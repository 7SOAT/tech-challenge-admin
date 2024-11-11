import CreateCustomerDto from "@api/dtos/customer/input/create-customer.dto";
import FindCustomerByParamsDto from "@api/dtos/customer/input/find-one-by-params.dto";
import ICustomerGateway from "@interfaces/datasource/customer.gateway";
import CustomerEntity from "core/entities/customer.entity";


export default class CustomerUseCase {
    constructor(private _customerGateway: ICustomerGateway) { }

    findCustomerByParams(params: FindCustomerByParamsDto): Promise<CustomerEntity> {
        return new Promise(async (resolve) => {
            resolve(this._customerGateway.findOneByParams(params))
        });
    }

    async createCustomer(customer: CreateCustomerDto): Promise<CustomerEntity> {
        try {
            const newCustomer = new CustomerEntity(
                customer.name,
                customer.email,
                customer.cpf
            );

            return await this._customerGateway.insert(newCustomer);
        } catch (err) {
            throw err;
        }
    }
}