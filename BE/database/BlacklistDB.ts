import { ObjectId } from "mongodb";
import IBlacklist from "../models/BlacklistModel";
import { getDB } from "./MongoDB";
import { ReportedUserDB } from "./ReportedUserDB";

const COLLECTION_NAME = "blacklist";

export const getCollection = async () => {
  const db = await getDB();
  const collection = db.collection<IBlacklist>(COLLECTION_NAME);

  return collection;
};

export const BlacklistDB = {
  // Insert to DB and remove report & user
  async insertBlacklist(blockData: any) {
    const credentials = {
      phone: blockData.phone,
      email: blockData.email,
    };
    const report = blockData.reportID;
    const collection = await getCollection();
    const res = await collection.insertOne(credentials);
    await ReportedUserDB.deleteReport(report);

    return res.insertedId;
  },

  // Cross reference when registering new user
  async getBlacklistedCredentials(credentials: IBlacklist) {
    const phone = credentials.phone;
    const email = credentials.email;

    const collection = await getCollection();
    const result = await collection.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    return result;
  },
};
