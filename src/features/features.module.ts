import { Module } from "@nestjs/common"
import { UploadModule } from "./upload"
import { GetModule } from "./get"

@Module({
    imports: [UploadModule, GetModule],
})
export default class FeaturesModule {}
