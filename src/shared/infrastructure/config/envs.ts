import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    POSTGRES_URL: get('POSTGRES_URL').required().asString(),
    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),
    POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
    POSTGRES_DB_PORT: get('POSTGRES_DB_PORT').required().asPortNumber(),
    POSTGRES_DB_HOST: get('POSTGRES_DB_HOST').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    // GOOGLE_CLIENT_ID: get('GOOGLE_CLIENT_ID').required().asString(),
    // GOOGLE_CLIENT_SECRET: get('GOOGLE_CLIENT_SECRET').required().asString(),
    // GOOGLE_REFRESH_TOKEN: get('GOOGLE_REFRESH_TOKEN').required().asString(),
    // GOOGLE_REDIRECT_URI: get('GOOGLE_REDIRECT_URI').required().asString(),
    FOLDER_ID: get('FOLDER_ID').asString(),
    STORAGE_WEB_SERVICE: get('STORAGE_WEB_SERVICE').asString(),
    HTTP_CLIENT_ADAPTER: get('HTTP_CLIENT_ADAPTER').required().asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    JWT_EXPIRATION: get('JWT_EXPIRATION').required().asPortNumber(),
    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
}