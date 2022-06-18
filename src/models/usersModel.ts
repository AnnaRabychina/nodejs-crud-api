import { IUser, IBasicUser } from "../interfaces/usersInterface.js";
import { v4 as uuidv4 } from "uuid";

const data: IUser[] = [];

export const findAll = async (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

export const create = async (user: IBasicUser): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    data.push(newUser);
    resolve(newUser);
  });
};
