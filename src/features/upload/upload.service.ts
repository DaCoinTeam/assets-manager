import { SupabaseService } from "@global"
import { Injectable } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { UploadInput } from "./shared/inputs"

@Injectable()
export default class UploadService {
    constructor(
        private readonly supabaseService : SupabaseService
    ) {

    }
    @MessagePattern("upload")
    async upload(input: UploadInput) {
        return this.supabaseService.upload(input)
    }
}