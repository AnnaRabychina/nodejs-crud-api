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

