import { StorageRepository } from "../../../../../storage-handler/domain/repositories/storage/StorageRepository";

export class GetFile {
    constructor(private repository: StorageRepository){}

    async run(id: string) : Promise<Buffer>{
        return this.repository.get(id);
    }
}