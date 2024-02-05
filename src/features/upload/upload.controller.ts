import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { UploadExistedInput, UploadInput } from "./shared/inputs"
import UploadService from "./upload.service"

@Controller()
export default class UploadController {
    constructor(
        private readonly uploadService : UploadService
    ) {

    }
    @MessagePattern("upload")
    async upload(input: UploadInput) {
        return this.uploadService.upload(input)
    }

    @MessagePattern("upload-existed")
    async uploadExisted(input: UploadExistedInput) {
        return this.uploadService.uploadExisted(input)
    }
}