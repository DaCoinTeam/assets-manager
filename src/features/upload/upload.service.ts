import { SupabaseService } from "@global"
import { Injectable } from "@nestjs/common"
import { UploadExistedInput, UploadInput } from "./shared/inputs"

@Injectable()
export default class UploadService {
    constructor(
        private readonly supabaseService : SupabaseService
    ) {}

    async upload(input: UploadInput) {
        return this.supabaseService.upload(input)
    }

    async uploadExisted(input: UploadExistedInput) {
        console.log(input)
        const { file, dir, overrideMetadata } = input
        return this.supabaseService.uploadExisted(file, dir, overrideMetadata)
    }
} 