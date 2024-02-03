import { SupabaseService } from "@global"
import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { UploadInput } from "./shared/inputs"

@Controller()
export default class UploadController {
    constructor(
        private readonly supabaseService : SupabaseService
    ) {

    }
    @MessagePattern("upload")
    async upload(input: UploadInput) {
        return this.supabaseService.upload(input)
    }
}