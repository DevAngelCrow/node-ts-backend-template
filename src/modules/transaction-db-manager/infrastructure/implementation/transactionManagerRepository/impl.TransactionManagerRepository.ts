import { TransactionManagerRepository } from "../../../domain/repositories/transaction-manager/TransactionManagerRepository";
import { EntityManager } from "typeorm";

export class ImplTransactionManagerRepository implements TransactionManagerRepository<EntityManager>{
    constructor(private readonly manager: EntityManager){}
    async runInTransaction<U>(operation: (client: EntityManager) => Promise<U>): Promise<U> {
        try{
            return await this.manager.transaction(async (transactionalManager) => {
               return operation(transactionalManager);
            })
        }catch(error){
            throw error;
        }
    }

}