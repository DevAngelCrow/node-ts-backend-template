export interface TransactionManagerRepository {
    runInTransaction<T>(operation: (manager: any) => Promise<T>) : Promise<T>;
}