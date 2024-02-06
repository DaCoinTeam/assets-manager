import { servicesConfig } from "@config"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { createClient } from "@supabase/supabase-js"
import StorageFileApi from "@supabase/storage-js/dist/module/packages/StorageFileApi"
import { SerializableFile, Metadata, FileAndSubdirectory } from "@common"
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

    async uploadMetadata(metadata: Metadata) {
        const { assetId } = metadata
        await this.bucket.upload(
            join(assetId, "metadata.json"),
            JSON.stringify(metadata),
            {
                upsert: true,
            },
        )
        return "Update metadata successfully"
    }

    async upload(
        file: SerializableFile,
    ): Promise<Metadata> {
        const assetId = uuid4()
        const { fileName, fileBody } = file

        await this.bucket.upload(join(assetId, fileName), fileBody, {
            upsert: true,
        })

        const metadata: Metadata = {
            assetId,
            fileName,
            extname: extname(fileName),
        }

        await this.uploadMetadata(metadata)
        return metadata
    }

    async update(
        assetId: string,
        fileAndSubdirectories: FileAndSubdirectory[] = []
    ) {
        for (const { file, subdir } of fileAndSubdirectories) {
            const dir = subdir ? join(assetId, subdir) : assetId
            await this.bucket.upload(join(dir, file.fileName), file.fileBody, {
                upsert: true,
            })
        }
        return `Update ${fileAndSubdirectories.length} files successfully.`
    }
}
   