import { IUser } from "../interfaces/usersInterface.js";

const data: IUser[] = [];

export const findAll = async (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}
