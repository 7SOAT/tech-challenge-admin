import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function FindProductByIdSwaggerConfig() {
    return applyDecorators(
        ApiParam({ name: 'productId' }),
        ApiOperation({ summary: "Find product by Id", parameters: [{ name: "id", in: "path" }] }),
        ApiResponse({ status: 200, description: 'Retrieve a product' }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        })
    );
}