import axios from "axios";
import { IReport } from "../models/Report";
import { getAuthHeader } from "./auth.service";

const API_URL = `${process.env.REACT_APP_API_URL}report/`;

// Insert a report
export const insertReport = async (reportData: IReport) => {
  console.log(reportData);
  const res = await axios.post(API_URL + "insert", reportData, {
    headers: getAuthHeader(),
  });
  return res.status;
};
