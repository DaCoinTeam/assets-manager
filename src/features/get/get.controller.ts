import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { GetInput } from "./shared"
import GetService from "./get.service"

@Controller()
export default class GetController {
    constructor(
        private readonly getService: GetService
    ) {

    }
    @MessagePattern("get")
    async get(input: GetInput) {
        return this.getService.get(input)
    }
}