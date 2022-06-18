import { IUser, IBasicUser } from "interfaces/usersInterface.js";
import * as Users from "../models/usersModel.js";
import { IncomingMessage, ServerResponse } from "http";
import { getReqData } from "../utils/utils.js";

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
