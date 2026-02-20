// routes.js

const {
  createUser,
  getUsers,
} = require("./controllers/userController");

const {
  createWallet,
  deposit,// routes.js
// This file reads the URL and calls the right function
const {
  createUser,
  getUsers,
} = require("./controllers/userController");

const {
  createWallet,
  deposit,
  withdraw,
} = require("./controllers/walletController");

function handleRoutes(req, res, body) {
  // USER routes
  if (req.method === "POST" && req.url === "/users") {
    return createUser(res, body);
  }
  if (req.method === "GET" && req.url === "/users") {
    return getUsers(res);
  }

  // WALLET routes
  if (req.method === "POST" && req.url === "/wallets") {
    return createWallet(res, body);
  }

  if (req.method === "POST" && req.url === "/deposit") {
    return deposit(res, body);
  }

  if (req.method === "POST" && req.url === "/withdraw") {
    return withdraw(res, body);
  }
  
  // No route matched
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = handleRoutes;

  withdraw,
} = require("./controllers/walletController");

function handleRoutes(req, res, body) {

  if (req.method === "POST" && req.url === "/users") {
    return createUser(req, res, body);
  }

  if (req.method === "GET" && req.url === "/users") {
    return getUsers(req, res);
  }

  if (req.method === "POST" && req.url === "/wallets") {
    return createWallet(req, res, body);
  }

  if (req.method === "POST" && req.url === "/deposit") {
    return deposit(req, res, body);
  }

  if (req.method === "POST" && req.url === "/withdraw") {
    return withdraw(req, res, body);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = handleRoutes;
