const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: true })
);

require("./config/mongoose.config");
require("./routes/user.routes")(app);

app.listen(port, () => console.log(`Server live on port: ${port}`));
