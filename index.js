const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const dbutil = require("./dbutils/dbutil");
dbutil.initDB();
// const userRoute = require("./routes/user_route");
const questionRouter = require("./routes/question_route");

// app.use("/user", userRoute);
app.use("/question", questionRouter);
app.get("/", (req, res) => {
  res.status(200).send("hello world,I hope all are healthy & wealthy");
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
