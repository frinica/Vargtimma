import { ObjectId } from "mongodb";

export default interface IReportedUser {
  userEmail: string;
  reporterEmail: string;
  reason: string;
}
