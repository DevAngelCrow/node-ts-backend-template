import { TransactionManagerRepository } from "../../../domain";

export class TransactionManager {
    constructor(private repository: TransactionManagerRepository){}

    async run<T>(work: () => Promise<T>) : Promise<T>{
        return this.repository.runInTransaction(work);
    }
}