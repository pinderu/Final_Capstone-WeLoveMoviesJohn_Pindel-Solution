const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Routes for /reviews endpoint
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// Routes for /reviews/:reviewId endpoint
router
  .route("/:reviewId")
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
