import { IUser, IBasicUser } from "interfaces/usersInterface.js";
import * as Users from "../models/usersModel.js";
import { IncomingMessage, ServerResponse } from "http";
import { getReqData, isUUID } from "../utils/utils.js";

export const getAllUsers = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const users: IUser[] = await Users.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const body: IBasicUser = await getReqData(req);

    if (body.username && body.age && body.hobbies) {
      const newUser: IUser = await Users.create(body);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Does not contain required fields" }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
): Promise<void> => {
  try {
    const user: IUser = await Users.findById(id);

    if (!isUUID(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
): Promise<void> => {
  try {
    const user = await Users.findById(id);
    if (!isUUID(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    } else {
      const body: IBasicUser = await getReqData(req);

      const { username, age, hobbies } = JSON.parse(JSON.stringify(body));

      const userData: IBasicUser = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updateUser: IUser = await Users.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updateUser));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
): Promise<void> => {
  try {
    const user: IUser = await Users.findById(id);

    if (!isUUID(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    } else {
      await Users.remove(id);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message:"User deleted" }));
    }
  } catch (error) {
    console.log(error);
  }
};
