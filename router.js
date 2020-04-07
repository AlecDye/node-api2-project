const express = require("express");

const BlogPosts = require("./data/db");

const router = express.Router();

router.get("/", (req, res) => {
  BlogPosts.find(req.query)
    .then((posts) => {
      res.status(200).json({ queryString: req.query, posts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retriving blog posts",
      });
    });
});

module.exports = router;
