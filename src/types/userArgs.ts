export type UserCreate = {
  name: string;
  email: string;
  password: string;
  gender: number;
  role: number;
};
export type UserRegister = {
  email: string;
  password: string;
};
export type UserFilter = {
  name: string;
  verified: boolean;
  email: string;
  role: number;
  gender: number;
};
