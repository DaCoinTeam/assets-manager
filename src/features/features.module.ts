import { Module } from "@nestjs/common"
import { UploadModule } from "./upload"

@Module({
    imports: [UploadModule],
})
export default class FeaturesModule {}
