import express from "express";
import { BlacklistDB } from "../database/BlacklistDB";
import { authUser } from "../middlewares";
import IBlacklist from "../models/BlacklistModel";
const router = express.Router();

router.post("/insert", authUser, async (req, res) => {
  const { phone, email } = req.body;
  try {
    const blacklist: IBlacklist = {
      phone,
      email,
    };
    const blackListID = await BlacklistDB.insertBlacklist(blacklist);

    res.status(200).send({ blackListID });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
