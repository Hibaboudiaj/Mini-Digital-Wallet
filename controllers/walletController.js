// controllers/walletController.js

const { users, wallets } = require("../data");

// Create Wallet
function createWallet(req, res, body) {
  const { user_id, name } = body;

  const user = users.find(u => u.id === user_id);

  if (!user) {
    return sendResponse(res, 400, { message: "User does not exist" });
  }

  const newWallet = {
    id: wallets.length + 1,
    user_id,
    name,
    balance: 0,
  };

  wallets.push(newWallet);

  sendResponse(res, 201, newWallet);
}

// Deposit
function deposit(req, res, body) {
  const { wallet_id, amount } = body;

  const wallet = wallets.find(w => w.id === wallet_id);

  if (!wallet) {
    return sendResponse(res, 400, { message: "Wallet not found" });
  }

  if (amount <= 0) {
    return sendResponse(res, 400, { message: "Amount must be positive" });
  }

  wallet.balance += amount;

  sendResponse(res, 200, wallet);
}

// Withdraw
function withdraw(req, res, body) {
  const { wallet_id, amount } = body;

  const wallet = wallets.find(w => w.id === wallet_id);

  if (!wallet) {
    return sendResponse(res, 400, { message: "Wallet not found" });
  }

  if (amount <= 0) {
    return sendResponse(res, 400, { message: "Amount must be positive" });
  }

  if (wallet.balance < amount) {
    return sendResponse(res, 400, { message: "Insufficient balance" });
  }

  wallet.balance -= amount;

  sendResponse(res, 200, wallet);
}

// Helper
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

module.exports = {
  createWallet,
  deposit,
  withdraw,
};
