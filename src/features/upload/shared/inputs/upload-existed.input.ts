import { SerializableFile } from "@common"

export default interface UploadExistedInput {
    file: SerializableFile,
    dir: string,
    overrideMetadata?: boolean
}

