import { Controller } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { UploadInput, UpdateInput, UploadMetadataInput } from "./shared"
import WriteService from "./write.service"

@Controller()
export default class WriteController {
    constructor(
        private readonly writeService: WriteService
    ) { }

    @GrpcMethod("WriteService", "upload")
    async upload(input: UploadInput) {
        return await this.writeService.upload(input)
    }

    @GrpcMethod("WriteService", "update")
    async update(input: UpdateInput) {
        console.log(input)
        return await this.writeService.update(input)
    }
    
    @GrpcMethod("WriteService", "uploadMetadata")
    async uploadMetadata(input: UploadMetadataInput) {
        return await this.writeService.uploadMetadata(input)
    }
}