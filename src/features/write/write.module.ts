import { Module } from "@nestjs/common"
import WriteController from "./write.controller"
import WriteService from "./write.service"

@Module({
    imports: [],
    controllers: [WriteController],
    providers: [WriteService],
})
export default class WriteModule {}