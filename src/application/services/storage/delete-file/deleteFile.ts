import { StorageRepository } from "../../../../domain";

export class DeleteFile {
    constructor(private repository: StorageRepository){}

    async run(id: string) : Promise<void> {
        return this.repository.delete(id);
    }
}