import { TransactionManagerRepository } from "../../../domain/repositories/transaction-manager/TransactionManagerRepository";
import { prismaClient } from "../../../../../shared/infrastructure/db/PrismaWrapper";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { DataSource } from "typeorm";

export class ImplTransactionManagerRepository implements TransactionManagerRepository{
    // private prisma = prismaClient;
    constructor(private readonly dataSource: DataSource){}
    async runInTransaction<T>(operation: () => Promise<T>): Promise<T> {
        try{
            return  this.dataSource.transaction(async () =>{
               return await operation();
            })
        }catch(error){
            throw CustomError.internalServer("Internal server error in the transaction");
        }
        
    }

}