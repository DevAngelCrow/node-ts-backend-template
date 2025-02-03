import { MultimediaFile, PeopleImgPath, StorageRepository } from "../../../../domain";

export class UploadFile {
    constructor(private repository: StorageRepository){}

    async run(multimedia: MultimediaFile) : Promise<PeopleImgPath>{
        return this.repository.updload(multimedia);
    }
}