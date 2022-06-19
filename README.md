# nodejs-crud-api

## Description

This is app implement simple CRUD API using in-memory database underneath.

## To Install 

1. check node version node -v (should be >= 16.x)
2. git clone https://github.com/AnnaRabychina/nodejs-crud-api.git
3. git checkout develop
4. cd nodejs-crud-api
5. npm install

## To Start

``` npm run start:dev ``` - to start development server

``` npm run start:prod ``` - to start production server

``` npm run test``` - to start 3 test scenarios

## Endpoints

 + **GET**   ```http://localhost:4000/api/users``` - get all users

 + **GET**   ```http://localhost:4000/api/users/${userID}``` - get user by ID

 + **POST**   ```http://localhost:4000/api/users``` - create new user

 + **PUT**   ``` http://localhost:4000/api/users/${userID}``` - update user by ID

 + **DELETE**   ``` http://localhost:4000/api/users/${userID}``` - delete user by ID


## Used technologies ##


  - **For development**: typescript, nodemon, dotenv, ts-node, uuid, node.js 
  - **For Test**: jest, supertest, ts-jest