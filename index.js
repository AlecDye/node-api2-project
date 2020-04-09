const express = require("express");

const server = express();

const postsRouter = require("./router");

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Post and commenting thing</h2>`);
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`\n ~ Server is running on http://localhost:${port} ~ \n`);
});
