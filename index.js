const express = require("express");
require("dotenv").config();
const dbUtils = require("./dbutils/dbutil");
const app = express();
const question_router = require("./routes/question_route");
const auth_router = require("./routes/auth_route");
const PORT = process.env.PORT || 3000;
app.use(express.json());
dbUtils.initDB();


app.use("/question", question_router);
app.use("/user", auth_router);

app.use("/", () => {
  console.log("hello world");
});

process.on("SIGINT", () => {
  dbUtils.disconnectDB();
  console.log("Closing server");
  process.exit();
});

process.on("exit", () => {
  console.log("Server closed");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
