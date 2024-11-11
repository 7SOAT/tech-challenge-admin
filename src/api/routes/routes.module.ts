import { HttpModule } from "@nestjs/axios";
import { DynamicModule } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import EnvironmentConfigService from "api/config/environment-config/environment-config.service";
import CustomerRoute from "@routes/customer/customer.route";
import HealthRoute from "@routes/health/health.route";
import OrderRoute from "@routes/order/order.route";
import ProductRoute from "@routes/product/product.route";
import RepositoriesModule from "@datasource/typeorm/repositories/repositories.module";
import PaymentRoute from "./payment/payment.route";
import PaymentProvider from "@providers/mercado-pago/mercado-pago.provider";
import PaymentProviderGateway from "@gateways/payment-provider.gateway";
import ProvidersModule from "@providers/providers.module";

export default class RoutesModule {
    static resgister(): DynamicModule {
        return {
            module: this,
            imports: [TerminusModule, HttpModule, RepositoriesModule.resgister(), ProvidersModule.register()],
            providers: [
                EnvironmentConfigService,
                PaymentProvider,
                PaymentProviderGateway
            ],
            controllers: [
                HealthRoute,
                ProductRoute,
                CustomerRoute,
                OrderRoute,
                PaymentRoute
            ]
        }
    }
};