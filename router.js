const express = require("express");

const BlogPosts = require("./data/db");

const router = express.Router();

// POST to list of posts
router.post("/", (req, res) => {
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    BlogPosts.insert(postInfo);
    const confirmPost = BlogPosts.find((post) => post.title === postInfo.title);
    if (confirmPost) {
      res.status(201).json({ message: "Post created successfully!", postInfo });
    } else {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    }
  }
});

// GET list of posts
router.get("/", (req, res) => {
  BlogPosts.find(req.query)
    .then((posts) => {
      res.status(200).json({ queryString: req.query, posts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved.",
      });
    });
});

// GET specific post
router.get("/:id", (req, res) => {
  BlogPosts.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

// PUT specific post
router.put("/:id", (req, res) => {
  const changes = req.body;
  console.log("Changes", changes);
  if (!changes.title || !changes.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post.",
      });
  } else {
    const findPost = BlogPosts.find((post) => post.title === changes.title);
    if (findPost) {
      res.status(200).json({ message: "Success! ", changes });
    } else {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    }
  }
  // BlogPosts.update(req.params.id, changes).then((count) => {
  //   if (count) {
  //     BlogPosts.findById(req.params.id);
  //       .then((changes) => {
  //       res.status(200).json(changes);
  //       })
  //       .catch((error) => {
  //         res.status(500).json({error:"The post information could not be modified."})
  //       })
  //   } else {
  //     res.status(404).json({ message: "The post with the specified ID does not exist."})
  //   }
  // });
});

// GET comments from specific post
router.get("/:id/comments", (req, res) => {});

module.exports = router;
