import { TransactionManagerRepository } from "../../../../../shared/domain/domain-container/DomainContainer";

export class TransactionManager <U>{
    constructor(private repository: TransactionManagerRepository<U>){}

    async run<T>(operation: () => Promise<T>) : Promise<T>{
        return this.repository.runInTransaction(operation);
    }
}