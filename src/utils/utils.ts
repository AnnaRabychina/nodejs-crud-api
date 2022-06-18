import { IncomingMessage } from "http";
import { IBasicUser } from "../interfaces/usersInterface.js";

export const getReqData = (req: IncomingMessage): Promise<IBasicUser> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(JSON.parse(body));
      });

    } catch (error) {
      reject(error);
    }
  });
};

export const isUUID = (id: string): boolean => {
  return id.match("^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$") === null ? false : true;
}

