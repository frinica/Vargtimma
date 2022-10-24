export interface IUser {
  firstName: string;
  lastName: string;
  alias: string;
  phone?: string;
  email: string;
  password: string;
  role: number;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  alias: string;
  phone: string;
  email: string;
  password: string;
  confirmPass: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISearch {
  alias: string;
  phone: string;
}
