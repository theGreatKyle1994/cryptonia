import type { Express } from "express";
import express from "express";
import { configDotenv } from "dotenv";
import connectToDB from "./config/mongoose.config";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/user.routes";

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

routes(app);

app.listen(port, (err): void =>
  console.log(err ? err : `Server live on port: ${port}`)
);
