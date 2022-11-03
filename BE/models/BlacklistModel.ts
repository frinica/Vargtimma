import { ObjectId } from "mongodb";

export default interface IBlacklist {
  email: string;
  phone: string;
  reportID?: ObjectId;
}
