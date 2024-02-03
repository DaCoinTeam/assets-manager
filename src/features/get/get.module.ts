import { Module } from "@nestjs/common"
import GetController from "./get.controller"
import GetService from "./get.service"

@Module({
    imports: [],
    controllers: [GetController],
    providers: [GetService],
})
export default class GetModule {}