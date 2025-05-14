declare namespace NodeJS {
  interface ProcessEnv {
    MDB_CONNECTION_URL: string;
    EMAIL_PASS: string;
    EMAIL_USER: string;
    FRONTEND_ENDPOINT: string;
  }
}
