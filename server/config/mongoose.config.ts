import { connect } from "mongoose";
const { NODE_ENV, DB_URI } = process.env;

const db: string = "cryptonia_db";
let db_uri: string =
  NODE_ENV === "production" && DB_URI ? DB_URI : "mongodb://127.0.0.1:27017/";

console.log(db_uri);

const connectToDB = async (): Promise<void> => {
  await connect(`${db_uri}${db}`)
    .then(() => console.log(`Established a connection to ${db}`))
    .catch((err) =>
      console.log(`Something went wrong when connecting to ${db}`, err)
    );
};

export default connectToDB;
