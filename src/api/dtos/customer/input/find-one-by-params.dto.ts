import { AtLeastOneField } from "@api/validators/at-least-one-field.validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

@AtLeastOneField()
export default class FindCustomerByParamsDto {
    @IsOptional()
    @IsString({ message: 'Customer CPF should be a string' })
    @IsNotEmpty({ message: 'Customer CPF should be not empty' })
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF must be in format XXX.XXX.XXX-XX' })
    @ApiProperty({ type: 'string', description: 'Customer CPF', required: false })
    cpf: string;

    @IsOptional()
    @IsString({ message: 'Customer e-mail should be a string' })
    @IsEmail(undefined, { message: 'Customer e-mail should be valid' })
    @ApiProperty({ type: 'string', description: 'Customer e-mail', required: false })
    email: string;
}
