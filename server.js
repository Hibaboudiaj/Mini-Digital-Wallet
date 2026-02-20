const http = require("http");
const handleRoutes = require("./routes");
const { log } = require("console");

const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    if (body) {
      body = JSON.parse(body);
    } else {
      body = {};
    }
    handleRoutes(req, res, body);
  });
});
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
