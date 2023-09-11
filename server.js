const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json(), express.urlencoded({ extended: true }), cors());

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

require("./config/mongoose.config");
require("./routes/user.routes")(app);

app.listen(port, () => console.log(`Server live on port: ${port}`));
