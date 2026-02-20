// routes.js

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
