import OrderEntity from '@entities/order/order.entity';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindQueueSwaggerConfig() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve orders queue' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Orders queue retrieved successfully',
      type: Array<OrderEntity>,
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
}