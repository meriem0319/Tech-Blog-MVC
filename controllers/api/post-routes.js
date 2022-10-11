const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Post.findAll()
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//new post
router.post("/", withAuth, (req, res) => {
  const body = req.body;
  console.log(req.session.userId);
  Post.create({ ...body, userId: req.session.userId })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//update post
router.put("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id);
  Post.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (postData > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//delete post
router.delete("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (postData > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
