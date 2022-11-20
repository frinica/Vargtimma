import axios from "axios";
import { IBlacklist } from "../models/Report";
import { getAuthHeader } from "./auth.service";

const API_URL_REPORT = `${process.env.REACT_APP_API_URL}report/`;
const API_URL_BLOCK = `${process.env.REACT_APP_API_URL}blacklist/`;
const API_URL_USER = `${process.env.REACT_APP_API_URL}user/`;

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
  const headers = { headers: getAuthHeader() };
  // Insert credentials in blacklist collection
  const blacklistRes = await axios.post(
    API_URL_BLOCK + "insert",
    blockData,
    headers
  );
  //Remove report from report_user collection
  const reportId = blockData.reportID;
  const reportRes = await axios.delete(API_URL_REPORT + reportId, headers);
  // Remove blocked user from users collection
  const userId = blockData.userID;
  const userRes = await axios.delete(API_URL_USER + userId, headers);

  if (
    blacklistRes.status === 200 &&
    reportRes.status === 200 &&
    userRes.status === 200
  ) {
    return 200;
  } else {
    return 400;
  }
};

// Remove a report
export const deleteReport = async (id: string) => {
  const headers = { headers: getAuthHeader() };
  const res = await axios.delete(API_URL_REPORT + id, headers);

  if (res.status === 200) {
    return 200;
  } else {
    return 400;
  }
};
