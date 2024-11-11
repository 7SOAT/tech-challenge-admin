import OrderEntity from '@entities/order/order.entity';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllSwaggerConfig() {
    return applyDecorators(
        ApiOperation({ summary: 'Retrieve all orders' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Orders retrieved successfully',
            type: Array<OrderEntity>,
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        })
    );
}

