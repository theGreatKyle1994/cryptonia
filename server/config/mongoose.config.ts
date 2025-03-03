import type { Environment } from "../types/env";
import { connect, Error } from "mongoose";

const { NODE_ENV, DB_URI } = process.env as Environment;

const db: string = "cryptonia_db";
let db_uri: string =
  NODE_ENV === "production" && DB_URI ? DB_URI : "mongodb://127.0.0.1:27017/";

(async (): Promise<void> => {
  await connect(`${db_uri}${db}`)
    .then(() => console.log(`Established a connection to ${db}`))
    .catch((err: Error) =>
      console.log(`Something went wrong when connecting to ${db}`, err)
    );
})();
