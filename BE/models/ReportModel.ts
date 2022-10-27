import { ObjectId } from "mongodb";

export default interface IReportedUser {
  user_id: ObjectId;
  reporter_id: ObjectId;
  reason: string;
}
