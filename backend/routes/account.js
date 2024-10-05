const express = require("express");
const router = express.Router();
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const middleware = require("../middleware/middleware");

router.get("/balance", middleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    res.status(200).json({
      balance: account.balance,
    });
  } catch (e) {
    res.status(500).json({
      message: "Invaild User ID",
    });
  }
});

//my second Approch with Google
router.post("/transfer", middleware, async (req, res) => {
  try {
    const transferDetails = req.body;

    // Find the sender's account
    const fromAccount = await Account.findOne({ userId: req.userId });
    if (!fromAccount) {
      return res.status(400).json({ message: "Sender account not found" });
    }

    // Check if the sender has enough balance
    if (fromAccount.balance < transferDetails.amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Find the recipient's account
    const toAccount = await Account.findOne({ userId: transferDetails.to });
    if (!toAccount) {
      return res.status(400).json({ message: "Recipient account not found" });
    }

    // Update balances
    fromAccount.balance -= transferDetails.amount;
    toAccount.balance += transferDetails.amount;

    // Save both accounts
    await fromAccount.save();
    await toAccount.save();

    res.status(200).json({
      fromAccount,
      toAccount,
      message: "Transfer successful",
    });
  } catch (e) {
    res.status(500).json({
      message: "An error occurred during the transfer",
    });
  }
});

//My Approch without DOC and google
// router.post("/transfer", middleware, async (req, res) => {
//   try {
//     const transferDetails = req.body;
//     const From_account = await Account.findOneAndUpdate(
//       {
//         userId: req.userId,
//       },
//       {
//         balance: balance - transferDetails.amount,
//       }
//     );
//     const to_account = await Account.findOneAndUpdate(
//       {
//         userId: transferDetails.to,
//       },
//       {
//         balance: balance + transferDetails.amount,
//       }
//     );
//     res.status(200).json({
//       From_account,
//       to_account,
//     });
//   } catch (e) {
//     res.status(500).json({
//       message: "Invaild User ID",
//     });
//   }
// });

module.exports = router;
