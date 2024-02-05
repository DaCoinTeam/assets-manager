import { Global, Module } from "@nestjs/common"
import { SupabaseService } from "./services"

@Global()
@Module({
    imports: [],
    exports: [SupabaseService],
    providers: [SupabaseService],
}) 
export default class GlobalModule {}
 