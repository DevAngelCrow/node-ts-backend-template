import { CustomError, TransactionManagerRepository } from "../../../domain";
import { prismaClient } from "../../db/PrismaWrapper";

export class ImplTransactionManagerRepository implements TransactionManagerRepository{
    private prisma = prismaClient
    runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        try{
            return this.prisma.$transaction(work);
        }catch(error){
            console.log(error, 'error de transacción')
            throw CustomError.internalServer("Internal server error in the transaction");
        }
        
    }

}