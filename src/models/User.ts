export interface IUser {
  firstName: string;
  lastName: string;
  alias: string;
  phone?: string;
  email: string;
  password: string;
  /* confirmPassword: string;
  errors: {
    firstName: string;
    lastName: string;
    alias: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }; */
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
