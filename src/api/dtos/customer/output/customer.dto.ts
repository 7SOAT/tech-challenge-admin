import { UUID } from 'crypto';

export default class CustomerDto {
  constructor(
    public id: UUID,
    public name: string,
    public email: string,
    public cpf: string,
  ) {}
}
