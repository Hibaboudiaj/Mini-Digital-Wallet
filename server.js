//server.js
//This is the entry point - it starts the server and receives requests
const http = require("http");

const handleRoutes = require("./routes");
// const { log } = require("console");

const server = http.createServer((req, res) => {
  let body = "";

  // Collect the request body piece by piece
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // When all data is received, send it to routes.js
  req.on("end", () => {
  const parsedBody = body ? JSON.parse(body) : {};
  handleRoutes(req, res, parsedBody);
  });
});
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
