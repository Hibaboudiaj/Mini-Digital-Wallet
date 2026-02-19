/*=========controllers.js=========*/
// require : fonction intégrée de Node.js permet de charger/importer un module (fichier...)
const { users, wallets } = require("./data");

/*========= Users ========*/

//--------------------create user--------------------//
function createUser(req, res, body) {
  //Kat-akhod name men body//
  const { name } = body;
  //Kat-check ila kayn//
  if (!name) {
    return sendResponse(res, 400, { message: "Name is required" });
  }
  //Kat-create object user//
  const newUser = {
    id: users.length + 1,
    name,
  };
  //Kat-zido l array//
  users.push(newUser);
  //Kat-rja3 response 201//
  sendResponse(res, 201, newUser);
}
//--------------------Get All Users--------------------//
function getUsers(req, res) {
  sendResponse(res, 200, users);
}

/*========= wallets ========*/

//--------------------create wallet--------------------//

function createWallet(req, res, body) {
  //Kat-akhod user_id w name men client//
  const { user_id, name } = body;

  //Kat-check ila user kayn//
  const user = users.find((u) => u.id === user_id);
  if (!user) {
    return sendResponse(res, 400, { message: "User does not exist" });
  }
  // Kat-create wallet object//
  const newWallet = {
    id: wallets.length + 1,
    user_id,
    name,
    balance: 0,
  };
  // Kat-zidou f wallets array//
  wallets.push(newWallet);
  //Kat-rja3 response 201 l client//
  sendResponse(res, 201, newWallet);
}

/*========= Deposit ========*/

function deposit(req, res, body) {
  const { wallet_id, amount } = body;

  const wallet = wallets.find((w) => w.id === wallet_id);

  if (!wallet) {
    return sendResponse(res, 400, { message: "Wallet not found" });
  }
  if (amount <= 0) {
    return sendResponse(res, 400, { message: "Amount must be positive" });
  }

  wallet.balance += amount;

  sendResponse(res, 200, wallet);
}

/*========= Withdraw ========*/
function Withdraw(req, res, body) {
  const { wallet_id, amount } = body;
  const wallet = wallets.find((w) => w.id === wallet_id);

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
/*========= Helper function ========*/
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
module.exports = {
  createUser,
  getUsers,
  createWallet,
  deposit,
  withdraw,
};