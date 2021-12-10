declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DB_URL: string;
    DB_USER: string;
    DB_PASS: string;
    DB_AUTH_SRC: string;
    // REDIS_URL: string;
    // SESSION_SECRET: string;
    // CORS_ORIGIN: string;
  }
}
