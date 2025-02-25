import { TransactionManagerRepository } from "../../../domain/repositories/transaction-manager/TransactionManagerRepository";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { DataSource, EntityManager } from "typeorm";

export class ImplTransactionManagerRepository implements TransactionManagerRepository<EntityManager>{
    constructor(private readonly manager: EntityManager){}
    async runInTransaction<U>(operation: (client: EntityManager) => Promise<U>): Promise<U> {
        try{
            return await this.manager.transaction(async (transactionalManager) => {
               return operation(transactionalManager);
            })
        }catch(error){
            throw CustomError.internalServer(`Internal server error in the transaction because => ${error}`);
        }
        
    }

}