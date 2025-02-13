const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config();
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
