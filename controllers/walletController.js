// controllers/walletController.js
// This file handles everything related to wallets
const { users, wallets } = require("../data");


// Helper : sends a JSON response back to the client
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}


// Create Wallet
// POST /wallets
// Body example: { "user_id": 1, "name": "My Wallet" }
function createWallet(res, body) {
  const { user_id, name } = body;

  // check the user exists
  const user = users.find((u) => u.id === user_id);
  if (!user) {
    return sendResponse(res, 400, { message: "User not found" });
  }

  const newWallet = {
    id: wallets.length + 1,
    user_id:user_id,
    name:name,
    balance: 0, // always starts at 0
  };

  wallets.push(newWallet); // save the wallet

  sendResponse(res, 201, newWallet);
}

// Deposit
// POST /deposit
// Body example: { "wallet_id": 1, "amount": 100 }
function deposit(res, body) {
const { wallet_id, amount } = body;

  // find the wallet
  const wallet = wallets.find((w) => w.id === wallet_id);

  if (!wallet) {
    return sendResponse(res, 400, { message: "Wallet not found" });
  }

  if (amount <= 0) {
    return sendResponse(res, 400, { message: "Amount must be positive" });
  }

  wallet.balance += amount; // add money

  sendResponse(res, 200, wallet);
}

// Withdraw
// POST /withdraw
// Body example: { "wallet_id": 1, "amount": 50 }
function withdraw(res, body) {
  const { wallet_id, amount } = body;

  // find the wallet
  const wallet = wallets.find((w) => w.id === wallet_id);

  if (!wallet) {
    return sendResponse(res, 400, { message: "Wallet not found" });
  }

  if (amount <= 0) {
    return sendResponse(res, 400, { message: "Amount must be positive" });
  }
  
  // check enough balance
  if (wallet.balance < amount) {
    return sendResponse(res, 400, { message: "Not enough balance" });
  }

  wallet.balance -= amount; // remove money

  sendResponse(res, 200, wallet);
}



module.exports = {
  createWallet,
  deposit,
  withdraw,
};
