import { getAllUsers, createUser  } from "./controllers/usersController.js";
import * as http from "http";

const server = http.createServer(
  async (
    request: http.IncomingMessage,
    response: http.ServerResponse
  ): Promise<void> => {
    if (request.url === "/api/users" && request.method === "GET") {
      getAllUsers(request, response);
    } else if(request.url  === "/api/users" && request.method === "POST") {
      createUser(request, response)

    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Route not found' }));
    }
  }
);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
