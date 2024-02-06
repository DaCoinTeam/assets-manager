import { Module } from "@nestjs/common"
import ReadController from "./read.controller"
import ReadService from "./read.service"

@Module({
    imports: [],
    controllers: [ReadController],
    providers: [ReadService],
})
export default class ReadModule {}