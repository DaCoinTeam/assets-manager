import { SupabaseService } from "@global"
import { Injectable } from "@nestjs/common"
import { GetInput } from "./shared"

@Injectable()
export default class GetService {
    constructor(
        private readonly supabaseService: SupabaseService
    ) {}
    async get(input: GetInput) {
        return this.supabaseService.get(input.assetIdOrPath)
    }
}