import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export default class CreateCustomerDto {
    @IsString({ message: 'Customer name should be a string'})
    @ApiProperty({ type: 'string', description: 'Customer name' })
    name: string;

    @IsString({ message: 'Customer e-mail should be a string' })
    @IsEmail()
    @ApiProperty({ type: 'string', description: 'Customer e-mail' })
    email: string;

    @IsString({ message: 'Customer CPF should be a string' })
    @IsNotEmpty({ message: 'Customer CPF should be not empty' })
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF must be in format XXX.XXX.XXX-XX' })
    @ApiProperty({ type: 'string', description: 'Customer CPF' })
    cpf: string;
}
