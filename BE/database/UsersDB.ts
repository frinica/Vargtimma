import IUser from "../models/UserModel";
import { getDB } from "./MongoDB";

const COLLECTION_NAME = "users";

const getCollection = async () => {
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
  async getUserByAlias(alias: string) {
    const collection = await getCollection();

    const user = collection.findOne({ alias });

    return user;
  },
};
