export interface IUser {
  firstName: string;
  lastName: string;
  alias: string;
  phone: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    firstName: string;
    lastName: string;
    alias: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}
