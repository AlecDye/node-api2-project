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
  const id = req.params.id;
  console.log("Changes", changes);
  BlogPosts.findById(id).then((post) => {
    if (post[0]) {
      if (!changes.title || !changes.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        BlogPosts.update(id, changes)
          .then((changes) => {
            BlogPosts.findById(id);
            res.status(200).json({ message: "Success!" });
          })
          .catch((error) => {
            res.status(500).json({
              error: `${error}The post information could not be modified.`,
            });
          });
      }
    }
  });
});

// DELETE specific post
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  BlogPosts.remove(id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "Post was successfully deleted!" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

//! these need work

// GET comments from specific post
router.get("/:id/comments", (req, res) => {
  BlogPosts.findPostComments(req.params.id)
    .then((comments) => {
      if (comments) {
        res.status(200).json(messages);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// POST comment for a specific post
router.post("/:id/comments", (req, res) => {
  BlogPosts.insertComment(req.body)
    .then((comment) => {
      if (!req.body.text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else {
        res.status(201).json(comment);
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: `${error}There was an error while saving the comment to the database`,
      });
    });
});

module.exports = router;
