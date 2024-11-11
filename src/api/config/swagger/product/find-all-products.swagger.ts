import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllProductsSwaggerConfig() {
    return applyDecorators(
        ApiOperation({ summary: "Find all products" }),
        ApiResponse({
            status: 200, description: 'Retrieve products list',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        })
    );
}