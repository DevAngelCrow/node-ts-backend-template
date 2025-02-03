import { TransactionManagerRepository } from "../../../domain";
import { prismaClient } from "../../db/PrismaWrapper";

export class ImplTransactionManagerRepository implements TransactionManagerRepository{
    private prisma = prismaClient
    runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        return this.prisma.$transaction(work);
    }

}