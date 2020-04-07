const express = require("express");

const server = express();

const postsRouter = require("./router");

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Post and commenting thing</h2>`);
});

server.listen(4000, () => {
  console.log("\n ~ Server is running on http://localhost:4000 ~ \n");
});
