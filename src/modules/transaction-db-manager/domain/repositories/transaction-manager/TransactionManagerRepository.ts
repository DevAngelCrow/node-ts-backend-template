export interface TransactionManagerRepository<T>{
    runInTransaction<U>(operation: (client: T) => Promise<U>) : Promise<U>;
}