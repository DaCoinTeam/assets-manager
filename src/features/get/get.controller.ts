import { SupabaseService } from "@global"
import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { GetInput } from "./shared"

@Controller()
export default class GetController {
    constructor(
        private readonly supabaseService: SupabaseService
    ) {

    }
    @MessagePattern("get")
    async get(input: GetInput) {
        return this.supabaseService.get(input.assetPath)
    }
}