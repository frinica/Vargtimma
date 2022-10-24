import axios from "axios";
import { IUpdate } from "../models/User";
import { getAuthHeader } from "./auth.service";

const API_URL = `${process.env.REACT_APP_API_URL}user/`;

// Fetch all users
export const fetchUsers = async () => {
  const res = await axios.get(API_URL + "fetch", {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Get search results
export const searchUser = async (search: { search: string }) => {
  const res = await axios.post(API_URL + "search", search, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Update a user
export const update = async (userData: IUpdate) => {
  console.log(userData);
  const res = await axios.put(API_URL + "update", userData, {
    headers: getAuthHeader(),
  });

  if (res.status === 200) {
    return res.status;
  } else {
    return "Error";
  }
};
