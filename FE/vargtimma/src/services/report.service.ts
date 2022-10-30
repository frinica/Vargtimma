import axios from "axios";
import { IBlacklist, IReport } from "../models/Report";
import { getAuthHeader } from "./auth.service";

const API_URL_REPORT = `${process.env.REACT_APP_API_URL}report/`;
const API_URL_BLOCK = `${process.env.REACT_APP_API_URL}blacklist/`;

// Insert a report
export const insertReport = async (reportData: any) => {
  const res = await axios.post(API_URL_REPORT + "insert", reportData, {
    headers: getAuthHeader(),
  });
  return res.status;
};

// Fetch reports
export const fetchReports = async () => {
  const res = await axios.get(API_URL_REPORT + "fetch", {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Block user
export const blockUser = async (blockData: IBlacklist) => {
  const res = await axios.post(API_URL_BLOCK + "insert", blockData, {
    headers: getAuthHeader(),
  });
  return res.status;
};
