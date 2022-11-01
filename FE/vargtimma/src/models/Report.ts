export interface IReport {
  userEmail: string;
  reporterEmail: string;
  reason: string;
}

export interface IBlacklist {
  userID: string;
  email: string;
  phone: string;
  reportID: string;
}
