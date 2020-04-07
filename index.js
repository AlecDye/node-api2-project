const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Post and commenting thing</h2>`);
});

server.listen(4000, () => {
  console.log("\n ~ Server is running on http://localhost:4000 ~ \n");
});
