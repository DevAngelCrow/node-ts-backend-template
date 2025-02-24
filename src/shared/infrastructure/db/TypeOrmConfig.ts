import { DataSource } from "typeorm";
import { envs } from "../config/envs";
import entities from "./entities";
export * from "./entities";
class AppDataSource {
    constructor(readonly dataSource: DataSource = new DataSource({
        type: "postgres",
        host: envs.POSTGRES_DB_HOST,
        port: envs.POSTGRES_DB_PORT,
        username: envs.POSTGRES_USER,
        password: envs.POSTGRES_PASSWORD,
        database: envs.POSTGRES_DB,
        synchronize: false,
        entities: Object.values(entities),
        migrations: ["src/infrastructure/db/migrations/*.ts"]
    })){

    }
}

export default new AppDataSource();