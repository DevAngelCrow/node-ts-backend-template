export interface TransactionManagerRepository {
    runInTransaction<T>(work: () => Promise<T>) : Promise<T>;
}