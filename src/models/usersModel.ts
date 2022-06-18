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

export const findById = async (id: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const user = data.find((item) => item.id === id);
    resolve(user);
  });
};

export const update = async (id: string, user: IBasicUser): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const index = data.findIndex((item) => item.id === id);
    data[index] = {id, ...user}
    resolve(data[index]);
  });
};

export const remove = async (id: string) : Promise<void>=> {
  return new Promise((resolve, reject) => {
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    resolve();
  });
};

