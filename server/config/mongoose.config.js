const mongoose = require("mongoose");
const db = "cryptonia_db";
const db_uri =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URI
    : process.env.DB_URI_DEV;

mongoose
  .connect(`${db_uri}${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`Connected to: ${db_uri}`, `Established a connection to ${db}`)
  )
  .catch((err) =>
    console.log(`Something went wrong when connecting to ${db}`, err)
  );
