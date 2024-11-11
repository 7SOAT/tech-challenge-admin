import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteProductSwaggerConfig() {
    return applyDecorators(
        ApiParam({ name: 'productId', schema: { description: "product UUID" } }),
        ApiOperation({ summary: 'Delete product' }),
        ApiResponse({ status: 200, description: 'Product deleted' }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Internal server error',
        })
    );
}