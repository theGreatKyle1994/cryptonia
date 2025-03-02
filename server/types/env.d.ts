declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    SECRET_KEY: string;
    PORT?: string | undefined;
    DB_URI: string;
  }
}
