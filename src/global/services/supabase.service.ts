import { servicesConfig } from "@config"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { createClient } from "@supabase/supabase-js"
import StorageFileApi from "@supabase/storage-js/dist/module/packages/StorageFileApi"
import { SerializableFile, Metadata } from "@common"
import { v4 as uuid4 } from "uuid"
import { extname, join } from "path"

@Injectable()
export default class SupabaseService implements OnModuleInit {
    constructor() {}

    private bucket: StorageFileApi
    onModuleInit() {
        const supabase = createClient(
            servicesConfig().supabase.url,
            servicesConfig().supabase.key,
        )
        this.bucket = supabase.storage.from("cistudy")
    }

    async upload(
        file: SerializableFile,
        customMetadata?: Metadata,
        callback?: (assetId: string, fileName: string) => Promise<void>,
    ): Promise<Metadata> {
        const assetId = uuid4()
        const { fileName, fileBody } = file

        await this.bucket.upload(join(assetId, fileName), fileBody, {
            upsert: true,
        })

        if (callback) await callback(assetId, fileName)

        const metadata = customMetadata ?? {
            assetId,
            fileName,
            extname: extname(fileName),
        }

        await this.bucket.upload(
            join(assetId, "metadata.json"),
            JSON.stringify(metadata),
            {
                upsert: true,
            },
        )

        return metadata
    }
}
