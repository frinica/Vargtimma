import { ObjectId } from "mongodb";
import IBlacklist from "../models/BlacklistModel";
import IReportedUser from "../models/ReportModel";
import { getDB } from "./MongoDB";

const COLLECTION_NAME = "reported_user";

export const getCollection = async () => {
  const db = await getDB();
  const collection = db.collection<IReportedUser>(COLLECTION_NAME);

  return collection;
};

export const ReportedUserDB = {
  // Insert reported user
  async insertReportedUser(report: IReportedUser) {
    const collection = await getCollection();
    const res = await collection.insertOne(report);

    return res.insertedId;
  },

  // Fetch all reports
  async getReports() {
    const collection = await getCollection();
    const reports = collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userEmail",
            foreignField: "email",
            as: "userData",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "reporterEmail",
            foreignField: "email",
            as: "reporterData",
          },
        },
      ])
      .toArray();
    return reports;
  },

  // Delete report
  async deleteReport(id: ObjectId) {
    const collection = await getCollection();
    try {
      const res = await collection.deleteOne({ _id: id });
      return res;
    } catch (error) {
      return error;
    }
  },
};
