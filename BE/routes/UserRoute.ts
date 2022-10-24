import express from "express";
import { UserDB } from "../database/UsersDB";
import { authUser } from "../middlewares";
import IUser from "../models/UserModel";
import { comparePassword, getJWT, hashPassword } from "../utils";

const router = express.Router();

interface searchResult {
  alias: string;
  phone: string;
}

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
      role: 0,
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
      const token = getJWT(user._id, user.alias, user.phone, email, user.role);
      res.status(200).send(token);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

router.get("/", authUser, (req, res) => {
  res.status(200).send(res.locals.user);
});

// Fetch users
router.get("/fetch", authUser, async (req, res) => {
  try {
    const users = await UserDB.getUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Search for users
router.post("/search", authUser, async (req, res) => {
  const alias = req.body.search;
  const phone = req.body.search;
  const users = await UserDB.searchUsers(alias, phone);

  if (!users) {
    res.sendStatus(404);
  } else {
    let userArray: searchResult[] = [];
    users.forEach((u) => {
      const user = {
        alias: u.alias!,
        phone: u.phone!,
      };
      userArray.push(user);
    });
    console.log(userArray);
    res.status(200).send(userArray);
  }
});

// Update user
router.put("/update", authUser, async (req, res) => {
  console.log(req.body);
  const user = req.body;

  try {
    await UserDB.updateUser(user);
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

module.exports = router;
