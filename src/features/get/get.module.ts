import { Module } from "@nestjs/common"
import GetController from "./get.controller"

@Module({
    imports: [],
    controllers: [GetController],
    providers: [],
})
export default class GetModule {}