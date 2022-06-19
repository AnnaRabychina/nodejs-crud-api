import { IncomingMessage, ServerResponse } from "http";
import { IBasicUser } from "../interfaces/usersInterface.js";

export const getReqData = (req: IncomingMessage): Promise<IBasicUser> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        }
        catch (error) {
          resolve(error);
        }
      });

    } catch (error) {
      reject(error);
    }
  });
};

export const isUUID = (id: string): boolean => {
  return id.match("^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$") === null ? false : true;
}

export const handlerError = (res: ServerResponse, error: Error): void => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Server Error' }));  
}
