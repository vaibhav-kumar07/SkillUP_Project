const express = require("express");
require("dotenv").config();
const dbUtils = require("./dbutils/dbutil");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
dbUtils.initDB();

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
