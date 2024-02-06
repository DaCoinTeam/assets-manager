import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { extnamesConfig, servicesConfig } from "@config"
import { GlobalModule } from "@global"
import { FeaturesModule } from "@features"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [servicesConfig, extnamesConfig],
        }),

        GlobalModule,
        FeaturesModule,
    ],
    controllers: [],
    providers: [
    ],
})
export default class AppModule {}
