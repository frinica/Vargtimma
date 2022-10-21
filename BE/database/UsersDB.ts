import IUser from "../models/UserModel";
import { getDB } from "./MongoDB";

const COLLECTION_NAME = "users";

export const getCollection = async () => {
  const db = await getDB();
  const collection = db.collection<IUser>(COLLECTION_NAME);

  return collection;
};

export const UserDB = {
  // Register a new user
  async insertUser(user: IUser) {
    const collection = await getCollection();
    const res = await collection.insertOne(user);

    return res.insertedId;
  },

  // Get one user
  async getExistingUser(alias?: string, email?: string) {
    const aToLowerCase = alias?.toLowerCase();
    const eToLowerCase = email?.toLowerCase();
    const collection = await getCollection();

    const user = await collection.findOne({
      $or: [{ alias: aToLowerCase }, { email: eToLowerCase }],
    });

    return user;
  },

  // Get matching users from search
  async searchUsers(alias?: string, phone?: string) {
    const aToLowerCase = alias?.toLowerCase();
    const collection = await getCollection();

    const users = collection
      .find({
        $or: [{ alias: aToLowerCase }, { phone: phone }],
      })
      .toArray();

    return users;
  },
};
