import type { Express } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import connectToDB from "./config/mongoose.config";

configDotenv();
connectToDB();

const app: Express = express();
const port: number = Number(process.env.PORT) ?? 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: true })
);

require("./routes/user.routes")(app);

app.listen(port, (err): void =>
  console.log(err ? err : `Server live on port: ${port}`)
);
