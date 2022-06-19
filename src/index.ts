import { getAllUsers, createUser, getUser, updateUser, deleteUser } from "./controllers/usersController.js";
import * as http from "http";
import 'dotenv/config';

export const server = http.createServer(
  async (
    request: http.IncomingMessage,
    response: http.ServerResponse
  ): Promise<void> => {
    if (request.url === "/api/users" && request.method === "GET") {
      getAllUsers(request, response);
    } else if (request.url === "/api/users" && request.method === "POST") {
      createUser(request, response);
    } else if (request.url.match(/\/api\/users\/\w+/) && request.method === "GET") {
      const id = request.url.split('/')[3];
      getUser(request, response, id);
    } else if (request.url.match(/\/api\/users\/\w+/) && request.method === "PUT") {
      const id = request.url.split('/')[3];
      updateUser(request, response, id);
    } else if (request.url.match(/\/api\/users\/\w+/) && request.method === "DELETE") {
      const id = request.url.split('/')[3];
      deleteUser(request, response, id);
    } else {

      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Route not found" }));
    }
  }
);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
