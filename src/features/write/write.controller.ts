import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { UploadInput, UpdateInput, UploadMetadataInput } from "./shared"
import WriteService from "./write.service"

@Controller()
export default class WriteController {
    constructor(
        private readonly writeService: WriteService
    ) { }

    @MessagePattern("upload")
    async upload(input: UploadInput) {
        return this.writeService.upload(input)
    }

    @MessagePattern("update")
    async update(input: UpdateInput) {
        console.log(input)
        return this.writeService.update(input)
    }

    @MessagePattern("upload-metadata")
    async uploadMetadata(input: UploadMetadataInput) {
        return this.writeService.uploadMetadata(input)
    }
}