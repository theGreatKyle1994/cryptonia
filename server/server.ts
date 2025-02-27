import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
const app = express();
const port = Number(process.env.PORT) || 8000;

configDotenv();
require("./config/mongoose.config");

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

app.listen(port, () => console.log(`Server live on port: ${port}`));
