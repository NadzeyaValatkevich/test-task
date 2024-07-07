import { IUserBase } from "./root.types";

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser extends IUserBase {
  email: string;
  password: string;
  roles: Array<number>;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface IUserRole extends IUserBase {
  pages: Array<string>;
}

export interface IMeResponse {
  user: IUser;
  roles: Array<IUserRole>;
}

export type RoleUser = "Админ" | "Пользователь";
