import dotenv from 'dotenv'

dotenv.config()

export default {
    type: "postgres",
    host: "localhost",
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    database: "entrega5",
    synchronize: true,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
    },
};