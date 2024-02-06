import { Module } from "@nestjs/common"
import { WriteModule } from "./write"
import { ReadModule } from "./read"

@Module({
    imports: [WriteModule, ReadModule],
})
export default class FeaturesModule {}
