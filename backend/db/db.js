const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { string } = require("zod");

// Load environment variables from the .env file
dotenv.config();

// Get the MongoDB URI from the environment variable
const mongoURI = process.env.MONGO_DB_URL;

// mongoose.connect(mongoURI);
// Exportable database connection function
const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account, connectDatabase };
