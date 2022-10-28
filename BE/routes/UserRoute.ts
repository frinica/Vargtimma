import express from "express";
import { ObjectId } from "mongodb";
import { BlacklistDB } from "../database/BlacklistDB";
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

  try {
    const existingUser = await UserDB.getExistingUser(alias, email);
    const blacklistUser = await BlacklistDB.getBlacklistedCredentials({
      phone,
      email,
    });
    if (existingUser || blacklistUser) {
      res.status(400).send("User already exist or has been blocked");
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
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserDB.getExistingUser("", email);

  try {
    if (user) {
      const validatePass = comparePassword(password, user.hashedPassword);
      if (validatePass) {
        const token = getJWT(
          user._id,
          user.alias,
          user.phone,
          email,
          user.role
        );
        res.status(200).send(token);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(400).send(error);
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

  try {
    if (!users) {
      res.sendStatus(404);
    } else {
      let userArray: searchResult[] = [];
      users.forEach((u) => {
        const user = {
          id: u._id!,
          alias: u.alias!,
          phone: u.phone!,
          email: u.email!,
        };
        userArray.push(user);
      });
      res.status(200).send(userArray);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Fetch one user
router.get("/:id", authUser, async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const { hashedPassword, ...resUser } = await UserDB.getOneUser(id);
    const user = resUser;

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
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
