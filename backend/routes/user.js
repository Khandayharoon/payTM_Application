const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const middleware = require("../middleware/middleware");

const signupBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  // Validate the request body using Zod
  console.log(req.body);
  const { success } = signupBody.safeParse(req.body);
  console.log(success);
  if (!success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Check if a user already exists with the given username (email)
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(409).json({ message: "Email already taken" });
  }

  // Create a new user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;
  /// ----- Create new account ------
  const accounDetails = await Account.create({
    userId,
    balance: 1 + Math.random() * 1000000,
  });

  //token
  const token = jwt.sign({ userId }, JWT_SECRET);

  // Send token as a cookie and in the response
  res.cookie("token", token);
  res.status(201).json({
    message: "User created successfully",
    token: token,
    Accoun_Details: accounDetails,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  // Validate the request body using Zod
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: " incorrect inputs" });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({ token: `Bearer ${token}` });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", middleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }
  await User.updateOne({ _id: req.userId }, req.body);
  res.status(200).json({ message: "Updated successfully" });
});

router.get("/bulk", middleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });
    console.log(users);
    res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
