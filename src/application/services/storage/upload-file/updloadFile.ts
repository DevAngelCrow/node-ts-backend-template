import { MultimediaFile, StorageRepository } from "../../../../domain";

export class UploadFile {
    constructor(private repository: StorageRepository){}

    async run(multimedia: MultimediaFile) : Promise<string>{
        return this.repository.updload(multimedia);
    }
}