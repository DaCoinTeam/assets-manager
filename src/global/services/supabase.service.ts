import { servicesConfig } from "@config"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { createClient } from "@supabase/supabase-js"
import StorageFileApi from "@supabase/storage-js/dist/module/packages/StorageFileApi"
import { SerializableFile, Metadata } from "@common"
import { v4 as uuid4, validate as validateUuid4 } from "uuid"
import { extname, join, basename } from "path"

@Injectable()
export default class SupabaseService implements OnModuleInit {
    constructor() { }

    private bucket: StorageFileApi
    onModuleInit() {
        const supabase = createClient(
            servicesConfig().supabase.url,
            servicesConfig().supabase.key,
        )
        this.bucket = supabase.storage.from("cistudy")
    }

    async get(
        assetIdOrPath: string
    ): Promise<SerializableFile> {
        if (validateUuid4(assetIdOrPath))
            return this.getFromAssetId(assetIdOrPath)
        return this.getFromAssetPath(assetIdOrPath)
    }

    private async getFromAssetId(
        assetId: string
    ): Promise<SerializableFile> {
        const { data } = await this.bucket.download(join(assetId, "metadata.json"))
        const text = await data.text()
        const { fileName } = JSON.parse(text) as Metadata
        const { data: fileData } = await this.bucket.download(join(assetId, fileName))
        const arrayBuffer = await fileData.arrayBuffer()
        return {
            fileName,
            fileBody: Buffer.from(arrayBuffer)
        }
    }

    private async getFromAssetPath(
        assetPath: string
    ): Promise<SerializableFile> {
        const fileName = basename(assetPath)

        const { data } = await this.bucket.download(assetPath)
        const arrayBuffer = await data.arrayBuffer()

        return {
            fileName,
            fileBody: Buffer.from(arrayBuffer)
        }
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
