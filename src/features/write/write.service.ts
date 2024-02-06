import { SupabaseService } from "@global"
import { Injectable } from "@nestjs/common"
import { UpdateInput, UploadInput, UploadMetadataInput } from "./shared"

@Injectable()
export default class WriteService {
    constructor(
        private readonly supabaseService: SupabaseService
    ) { }

    async upload(input: UploadInput) {
        return this.supabaseService.upload(input)
    }

    async update(input: UpdateInput) {
        const { assetId, fileAndSubdirectories } = input
        return this.supabaseService.update(assetId, fileAndSubdirectories)
    }

    async uploadMetadata(input: UploadMetadataInput) {
        return this.supabaseService.uploadMetadata(input)
    }
} 