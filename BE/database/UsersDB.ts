import { ObjectId } from "mongodb";
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

  // Fetch all users
  async getUsers() {
    const collection = await getCollection();
    const users = collection.find().toArray();

    return users;
  },

  // Get matching users from search
  async searchUsers(alias?: string, phone?: string) {
    /* const aToLowerCase = alias?.toLowerCase(); */
    const collection = await getCollection();
    const users = await collection
      .find({
        $or: [{ alias: alias }, { phone: phone }],
      })
      .toArray();
    return users;
  },

  // Update a user
  async updateUser(user: IUser) {
    const collection = await getCollection();
    const res = await collection.findOneAndUpdate(
      { email: user.email },
      { $set: { role: user.role } }
    );
    return res;
  },
};
