import axios from "axios";
import { IRegister } from "../models/User";

const API_URL = `${process.env.REACT_APP_API_URL}user/`;

export const register = async (regData: IRegister) => {
  console.log(API_URL);
  const res = await axios.post(API_URL + "register", regData);
  return res.status === 200;
};
