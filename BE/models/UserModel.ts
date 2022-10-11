export default interface IUser {
  firstName: string;
  lastName: string;
  alias: string;
  phone?: string;
  email: string;
  hashedPassword: string;
}
