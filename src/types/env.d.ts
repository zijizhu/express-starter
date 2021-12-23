declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    REDIS_URL: string;
    DATABASE_URL: string;
    SESSION_SECRET: string;
  }
}
