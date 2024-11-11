import ProductCategory from '@enums/product-category.enum';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindProductsByCategorySwaggerConfig() {
    return applyDecorators(
        ApiParam({ name: 'productCategory', enum: ProductCategory }),
        ApiOperation({ summary: "Find products by category name" }),
        ApiResponse({ status: 200, description: 'Retrieve a product by category name' }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        })
    );
}