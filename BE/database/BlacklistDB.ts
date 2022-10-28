import IBlacklist from "../models/BlacklistModel";
import { getDB } from "./MongoDB";

const COLLECTION_NAME = "blacklist";

export const getCollection = async () => {
  const db = await getDB();
  const collection = db.collection<IBlacklist>(COLLECTION_NAME);

  return collection;
};

export const BlacklistDB = {
  // Insert to DB
  async insertBlacklist(credentials: IBlacklist) {
    const collection = await getCollection();
    const res = await collection.insertOne(credentials);

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
