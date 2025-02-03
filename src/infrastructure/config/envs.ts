import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    POSTGRES_URL: get('POSTGRES_URL').required().asString(),
    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),
    POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').asString(),
    MAILER_SERVICE: get('MAILER_SERVICE').asString(),
    GOOGLE_CLIENT_ID: get('GOOGLE_CLIENT_ID').required().asString(),
    GOOGLE_CLIENT_SECRET: get('GOOGLE_CLIENT_SECRET').required().asString(),
    GOOGLE_REFRESH_TOKEN: get('GOOGLE_REFRESH_TOKEN').required().asString(),
    GOOGLE_REDIRECT_URI: get('GOOGLE_REDIRECT_URI').required().asString(),
    FOLDER_ID: get('FOLDER_ID').required().asString(),
}