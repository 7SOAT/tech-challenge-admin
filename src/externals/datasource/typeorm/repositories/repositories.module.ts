import { DynamicModule } from "@nestjs/common";
import CustomerRepository from "./customer.repository";
import OrderStatusRepository from "./order-status.repository";
import OrderRepository from "./order.repository";
import TypeOrmConfigModule from "../typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import PaymentStatusRepository from "./payment-status.repository";
import PaymentRepository from "./payment.repository";
import OrderModel from "../../../../package/models/order/order.model";
import OrderStatusModel from "../../../../package/models/order/order-status.model";
import CustomerModel from "../../../../package/models/customer.model";
import ProductModel from "../../../../package/models/product.model";
import PaymentModel from "../../../../package/models/payment/payment.model";
import PaymentStatusModel from "../../../../package/models/payment/payment-status.model";
import ProductRepository from "./product.repository";

export default class RepositoriesModule {
    static resgister(): DynamicModule {

        const entities = [
            CustomerModel,
            OrderModel,
            OrderStatusModel,
            ProductModel,
            PaymentModel,
            PaymentStatusModel
        ]

        const repositories = [
            PaymentStatusRepository,
            CustomerRepository,
            OrderRepository,
            OrderStatusRepository,
            ProductRepository,
            PaymentRepository
        ]

        return {
            module: this,
            imports: [TypeOrmConfigModule, TypeOrmModule.forFeature(entities)],
            providers: repositories,
            exports: repositories
        }
    }
};
