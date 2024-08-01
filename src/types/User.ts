export type User = {
  accessToken?: string;
  id: number;
  userName: string;
  email: string;
  role: string;
  storecode: string;
  changePwdAtLogon?: boolean;
};
