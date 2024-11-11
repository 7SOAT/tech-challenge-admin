import { randomInt } from "crypto";
import ProductsMock from "@datasource/typeorm/seed/seed-tables/product.seed";
import OrderStatusEnum from "core/enums/order-status.enum";
import OrderModel  from "@models/order/order.model";

const currentDate = new Date();

const OrdersMock: OrderModel[] = [...Array(30)].map((x, i) => {
    const randomStatusId = randomInt(5);
    return new OrderModel({
        id: `11000000-0000-0000-0000-0000000000${("00" + i).slice(-2)}`,
        products: ProductsMock,
        orderNumber: randomInt(100, 500),
        status: OrderStatusEnum[OrderStatusEnum[randomStatusId].valueOf()],
        createdAt: new Date(currentDate.setMonth(currentDate.getMonth() + i)),
        totalValue: parseFloat(ProductsMock?.reduce<number>((a, b) => a + b.price, 0).toString())
    })
})

export default OrdersMock;