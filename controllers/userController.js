// controllers/userController.js

const { users } = require("../data");

// Create User
function createUser(req, res, body) {
  const { name } = body;

  if (!name) {
    return sendResponse(res, 400, { message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  sendResponse(res, 201, newUser);
}

// Get All Users
function getUsers(req, res) {
  sendResponse(res, 200, users);
}

// Helper
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

module.exports = {
  createUser,
  getUsers,
};
