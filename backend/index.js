const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express(); // Initialize the express application
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

const { connectDatabase } = require("./db/db");
const rootRouter = require("./routes/rootRouter");

connectDatabase(); // Connect to the database

const PORT = process.env.PORT || 8080;

app.use("/api/v1", rootRouter); // Set up the router

app.listen(PORT, () => {
  console.log(
    `Server is Running on http://localhost:${PORT}/api/v1/user/signup`
  );
});

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// app.use(cors());
// app.use(express.json());
// const app = express();
// const { connectDatabase } = require("./db/db");
// const rootRouter = require("./routes/rootRouter ");
// app.use(cookieParser());
// dotenv.config();
// connectDatabase();

// const PORT = process.env.PORT || 8080;

// app.use("/api/v1", rootRouter);

// app.listen(PORT, () => {
//   console.log(
//     `Server is Running on http://localhost:${PORT}/api/v1/user/signup`
//   );
// });
