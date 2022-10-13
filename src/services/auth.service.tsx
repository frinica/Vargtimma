import axios from "axios";
import { ILogin, IRegister } from "../models/User";

const API_URL = `${process.env.REACT_APP_API_URL}user/`;

// Register a new user
export const register = async (regData: IRegister) => {
  console.log(API_URL);
  const res = await axios.post(API_URL + "register", regData);
  return res.status === 200;
};

// Login user and set JWT
export const login = async (loginData: ILogin) => {
  const res = await axios.post(API_URL + "login", loginData);
  const success = res.status === 200;

  if (success) {
    localStorage.setItem("token", res.data);
  }

  return success;
};

// Get user data
export const userData = async () => {
  const res = await axios.get(API_URL + "user");
  const success = res.status === 200;

  if (success) {
    return res.data;
  }
};
