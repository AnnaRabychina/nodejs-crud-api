import request from "supertest";
import { server } from "../src/index";
import { IUser } from "../src/interfaces/usersInterface";
import { v4 as uuidv4 } from "uuid";

describe("Scenario 1", () => {
  let usersArray: IUser[] = [];

  it("Get all records", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Create new record", async () => {
    const response = await request(server)
      .post("/api/users")
      .send({
        username: "test-user",
        age: 25,
        hobbies: ["reading", "swimming"],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toEqual("test-user");
    expect(response.body.age).toEqual(25);
    expect(response.body.hobbies).toEqual(["reading", "swimming"]);
    usersArray.push(response.body);
  });

  it("Get the created record by id", async () => {
    const response = await request(server).get(
      `/api/users/${usersArray[0].id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toEqual(usersArray[0].username);
    expect(response.body.age).toEqual(usersArray[0].age);
    expect(response.body.hobbies).toEqual(usersArray[0].hobbies);
  });

  it("Update the created record", async () => {
    const response = await request(server)
      .put(`/api/users/${usersArray[0].id}`)
      .send({
        username: "upd-test-user",
        age: 20,
        hobbies: ["swimming"],
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toEqual("upd-test-user");
    expect(response.body.age).toEqual(20);
    expect(response.body.hobbies).toEqual(["swimming"]);
  });

  it("Delete the created record by id", async () => {
    const response = await request(server).delete(
      `/api/users/${usersArray[0].id}`
    );
    expect(response.statusCode).toBe(204);
  });

  it("Get a deleted record by id", async () => {
    const response = await request(server).get(
      `/api/users/${usersArray[0].id}`
    );
    expect(response.statusCode).toBe(404);
  });
});

describe("Scenario 2", () => {
  let usersArray: IUser[] = [];

  it("Check the number of records", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("Create new record", async () => {
    const response = await request(server)
      .post("/api/users")
      .send({
        username: "first-user",
        age: 25,
        hobbies: ["reading", "swimming"],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toEqual("first-user");
    expect(response.body.age).toEqual(25);
    expect(response.body.hobbies).toEqual(["reading", "swimming"]);
    usersArray.push(response.body);
  });

  it("Check the number of records again", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("Get all records", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(usersArray);
  });

  it("Delete the created record by id", async () => {
    const response = await request(server).delete(
      `/api/users/${usersArray[0].id}`
    );
    expect(response.statusCode).toBe(204);
  });

  it("Check the number of records again", async () => {
    const response = await request(server).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});

describe("Scenario 3", () => {
  let usersArray: IUser[] = [];

  it("Create new record", async () => {
    const response = await request(server)
      .post("/api/users")
      .send({
        username: "test-user",
        age: 25,
        hobbies: ["reading", "swimming"],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toEqual("test-user");
    expect(response.body.age).toEqual(25);
    expect(response.body.hobbies).toEqual(["reading", "swimming"]);
    usersArray.push(response.body);
  });

  it("Get nonexistent user by id", async () => {
    const response = await request(server).get(`/api/users/${uuidv4()}`);
    expect(response.statusCode).toBe(404);
  });

  it("Update nonexistent user", async () => {
    const response = await request(server)
      .put(`/api/users/${uuidv4()}`)
      .send({
        username: "upd-test-user",
        age: 30,
        hobbies: ["fishing", "football"],
      });
    expect(response.statusCode).toBe(404);
  });

  it("Delete nonexistent user", async () => {
    const response = await request(server).delete(`/api/users/${uuidv4()}`);
    expect(response.statusCode).toBe(404);
  });

  it("Get user by invalid id", async () => {
    const response = await request(server).get("/api/users/1");
    expect(response.statusCode).toBe(400);
  });

  it("Update user by invalid id", async () => {
    const response = await request(server)
      .put("/api/users/1")
      .send({
        username: "upd-test-user",
        age: 30,
        hobbies: ["fishing", "football"],
      });
    expect(response.statusCode).toBe(400);
  });

  it("Delete user by invalid id", async () => {
    const response = await request(server).delete("/api/users/1");
    expect(response.statusCode).toBe(400);
  });
});

