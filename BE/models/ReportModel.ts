import { ObjectId } from "mongodb";

export default interface IReportedUser {
  userID: ObjectId;
  reporterID: ObjectId;
  reason: string;
}
