import express from "express";
import { UserDB } from "../database/UsersDB";
import IUser from "../models/UserModel";
import { comparePassword, getJWT, hashPassword } from "../utils";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { firstName, lastName, alias, phone, email, password } = req.body;

  const existingUser = await UserDB.getExistingUser(alias, email);
  if (existingUser) {
    res.sendStatus(400);
  } else {
    const hashedPassword = hashPassword(password);
    const user: IUser = {
      firstName,
      lastName,
      alias,
      phone,
      email,
      hashedPassword,
    };
    const userID = await UserDB.insertUser(user);

    res.status(200).send({ userID });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserDB.getExistingUser("", email);

  if (user) {
    const validatePass = comparePassword(password, user.hashedPassword);
    if (validatePass) {
      const token = getJWT(email, user._id);
      res.status(200).send(token);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

// Get user data (username)
router.get("/user", async (req, res) => {
  res.status(200).send(res.locals.user.username);
});

module.exports = router;
