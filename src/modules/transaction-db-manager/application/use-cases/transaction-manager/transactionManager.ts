import { TransactionManagerRepository } from "../../../domain/repositories/transaction-manager/TransactionManagerRepository";

export class TransactionManager {
    constructor(private repository: TransactionManagerRepository){}

    async run<T>(work: () => Promise<T>) : Promise<T>{
        return this.repository.runInTransaction(work);
    }
}