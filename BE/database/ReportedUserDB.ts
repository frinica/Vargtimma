import { ObjectId } from "mongodb";
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
    const reports = collection.find().toArray();

    return reports;
  },

  // Delete report
  async deleteReport(id: ObjectId) {
    const collection = await getCollection();
    const res = await collection.deleteOne({ _id: id });

    return res;
  },
};
