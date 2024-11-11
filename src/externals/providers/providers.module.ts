import { DynamicModule } from "@nestjs/common";
import PaymentProvider   from "@providers/mercado-pago/mercado-pago.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import QRCodeGeneratorProvider  from "@providers/qr-code-generator/qrCodeGenerator.provider";
import EnvironmentConfigModule from "@api/config/environment-config/environment-config.module";
import EnvironmentConfigService  from "@api/config/environment-config/environment-config.service";

export default class ProvidersModule {
    static register(): DynamicModule {
        return {
            module: this,
            imports: [HttpModule, EnvironmentConfigModule],
            providers: [
                EnvironmentConfigService,
                PaymentProvider,
                QRCodeGeneratorProvider
            ],
            exports: [PaymentProvider]
        }
    }
}
