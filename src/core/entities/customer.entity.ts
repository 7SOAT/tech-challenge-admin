import { UUID } from 'crypto';

export default class CustomerEntity {

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly cpf: string,
    public readonly id?: UUID
  ) {}
}
