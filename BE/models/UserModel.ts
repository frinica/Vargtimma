export default interface IUser {
  firstName: string;
  lastName: string;
  alias: string;
  phone: string;
  email: string;
  hashedPassword: string;
  role: number; // 0 = user 1 = moderator 2 = admin
}
