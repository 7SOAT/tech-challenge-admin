import CheckoutOrderDto from '@api/dtos/order/input/checkout-order.dto';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export function CreateOrderSwaggerConfig() {
    return applyDecorators(
        ApiOperation({ summary: 'Create an order' }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: 'Order created successfully',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: "Client/product not found",
        }),
        ApiBody({
            type: CheckoutOrderDto,
            examples: {
                a: {
                    summary: "Exemplo cliente identificado",
                    value: {
                        customerId: randomUUID(),
                        productIds: [randomUUID(), randomUUID(), randomUUID(), randomUUID()],
                        description: "Pedido para viagem.",
                    } as CheckoutOrderDto
                },
                b: {
                    summary: "Exemplo Anônimo",
                    value: {
                        productIds: [randomUUID(), randomUUID(), randomUUID(), randomUUID()]
                    } as CheckoutOrderDto
                }
            }
        })
    );
}