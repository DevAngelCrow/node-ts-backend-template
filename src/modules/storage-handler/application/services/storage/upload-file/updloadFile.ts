import { StorageRepository } from "../../../../../storage-handler/domain/repositories/storage/StorageRepository";
import { MultimediaFile } from "../../../../../../shared/domain/types";
export class UploadFile {
    constructor(private repository: StorageRepository){}

    async run(multimedia: MultimediaFile) : Promise<string>{
        return this.repository.updload(multimedia);
    }
}