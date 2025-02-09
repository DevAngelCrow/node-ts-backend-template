import { TransactionManagerRepository } from "../../../domain/repositories/transaction-manager/TransactionManagerRepository";
import { prismaClient } from "../../../../../shared/infraestructure/db/PrismaWrapper";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class ImplTransactionManagerRepository implements TransactionManagerRepository{
    private prisma = prismaClient;
    runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        try{
            return this.prisma.$transaction(work);
        }catch(error){
            throw CustomError.internalServer("Internal server error in the transaction");
        }
        
    }

}