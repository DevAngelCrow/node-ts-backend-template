import { TransactionManagerRepository } from "../../../domain/repositories/transaction-manager/TransactionManagerRepository";

import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { DataSource, EntityManager } from "typeorm";

export class ImplTransactionManagerRepository implements TransactionManagerRepository{
    // private prisma = prismaClient;
    constructor(private readonly dataSource: DataSource){}
    async runInTransaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
        try{
            return await this.dataSource.transaction(async (transactionManager) =>{
               return await operation(transactionManager);
            })
        }catch(error){
            throw CustomError.internalServer("Internal server error in the transaction");
        }
        
    }

}