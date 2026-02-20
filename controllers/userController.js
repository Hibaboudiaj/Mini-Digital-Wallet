// This file handles everything related to users

const { users } = require("../data");

// Helper : sends a JSON response back to the client
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Create User//
// POST /users
// Body example: { "name": "Youssef" }
function createUser(res, body) {
const { name } = body;
// name is required
  if (!name) {
    return sendResponse(res, 400, { message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name:name,
  };
// save the user
  users.push(newUser);

  sendResponse(res, 201, newUser);
}

// Get All Users//
// GET /users
function getUsers(res) {
  sendResponse(res, 200, users);
}

module.exports = {
  createUser,
  getUsers,
};
