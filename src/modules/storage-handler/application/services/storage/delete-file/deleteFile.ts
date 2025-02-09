import { StorageRepository } from "../../../../../storage-handler/domain/repositories/storage/StorageRepository";

export class DeleteFile {
    constructor(private repository: StorageRepository){}

    async run(id: string) : Promise<void> {
        return this.repository.delete(id);
    }
}