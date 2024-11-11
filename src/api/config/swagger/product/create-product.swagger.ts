import CreateProductDto from '@api/dtos/product/create-product.dto';
import ProductsMock from '@datasource/typeorm/seed/seed-tables/product.seed';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CreateProductSwaggerConfig() {
    return applyDecorators(
        ApiOperation({ summary: 'Create product' }),
        ApiResponse({ status: 201, description: 'Product created' }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }),
        ApiBody({
            type: CreateProductDto,
            examples: Object.call(() => { }, ProductsMock.map((item, i) => {
                return {
                    summary: `Exemplo ${i}`,
                    value: {
                        name: item.name,
                        category: item.category,
                        description: item.description,
                        price: item.price
                    } as CreateProductDto
                }
            }))
        })
    );
}