import { MultimediaFile, StorageRepository } from "../../../../domain";

export class GetFile {
    constructor(private repository: StorageRepository){}

    async run(id: string) : Promise<Buffer>{
        return this.repository.get(id);
    }
}