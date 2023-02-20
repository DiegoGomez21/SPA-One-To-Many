module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const comments = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  // Create a new Comment for a Tutorial
  router.post("/:id/comments", comments.create);

  // Retrieve all Comments for a Tutorial
  router.get("/:id/comments", comments.findAll);


  app.use("/api/tutorials", router);
};