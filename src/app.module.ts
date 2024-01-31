import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { servicesConfig } from "@config"
import { GlobalModule } from "@global"
import { ServicesModule } from "@services"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [servicesConfig],
        }),

        GlobalModule,
        ServicesModule,
    ],
    controllers: [],
    providers: [
    ],
})
export default class AppModule {}
