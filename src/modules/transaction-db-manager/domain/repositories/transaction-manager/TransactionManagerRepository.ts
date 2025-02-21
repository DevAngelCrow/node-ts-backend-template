export interface TransactionManagerRepository {
    runInTransaction<T>(operation: () => Promise<T>) : Promise<T>;
}