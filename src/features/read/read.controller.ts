import { Controller } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { GetInput } from "./shared"
import ReadService from "./read.service"

@Controller()
export default class ReadController {
    constructor(
        private readonly readService: ReadService
    ) { }

    @GrpcMethod("ReadService", "get")
    async get(input: GetInput) {
        return this.readService.get(input)
    }
}