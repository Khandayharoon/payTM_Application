const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const { connectDatabase } = require("./db/db");
const rootRouter = require("./routes/rootRouter ");
app.use(cookieParser());
dotenv.config();
connectDatabase();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(
    `Server is Running on http://localhost:${PORT}/api/v1/user/signup`
  );
});
