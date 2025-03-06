import { TransactionManagerRepository } from "../../../domain/repositories/transaction-manager/TransactionManagerRepository";

export class TransactionManager {
    constructor(private repository: TransactionManagerRepository){}

    async run<T>(operation: () => Promise<T>) : Promise<T>{
        return this.repository.runInTransaction(operation);
    }
}