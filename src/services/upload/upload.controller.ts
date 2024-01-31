import { SerializableFile } from "@common"
import { SupabaseService } from "@global"
import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"

@Controller()
export default class UploadController {
    constructor(
        private readonly supabaseService : SupabaseService
    ) {

    }
    @MessagePattern("upload")
    async uploadFile(data: SerializableFile) {
        return this.supabaseService.upload(data)
    }
}