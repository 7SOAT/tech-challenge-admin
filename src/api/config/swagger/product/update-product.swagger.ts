import { UUIDParamDto } from '@api/dtos/identificator.dto';
import UpdateProductBodyDto from '@api/dtos/product/update-product.dto';
import ProductCategory from '@enums/product-category.enum';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function UpdateProductSwaggerConfig() {
    return applyDecorators(
        ApiParam({ name: 'id', schema: { description: "product UUID" }}),
        ApiOperation({ summary: 'Update product' }),
        ApiResponse({ status: 200, description: 'Product updated' }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }),
        ApiBody({
            type: UpdateProductBodyDto,
            examples: {
                a: {
                    summary: "Exemplo Ativo",
                    value: {
                        name: "X-Salada",
                        category: ProductCategory.Burger,
                        description: "Hambúrguer, alface, tomate, queijo, presunto e maionese, servido em um pão de hambúrguer.",
                        price: 23.50,
                    } as UpdateProductBodyDto
                },
                b: {
                    summary: "Exemplo Inativo",
                    value: {
                        name: "Batata Frita",
                        category: ProductCategory.Side,
                        description: "Batatas em tiras e fritas em óleo quente, com sal e alecrim.",
                        price: 12.00,
                    } as UpdateProductBodyDto
                }
            }
        })
    );
}