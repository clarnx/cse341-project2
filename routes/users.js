const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validate, userValidationRules } = require("../middleware/validation");
const isAuthenticated = require("../middleware/authenticate");

router.get("/", userController.getAll);

router.get(
  "/:id",
  userValidationRules.getById,
  validate,
  userController.getSingle
);

router.post(
  "/",
  isAuthenticated,
  userValidationRules.create,
  validate,
  userController.createUser
);

router.put(
  "/:id",
  isAuthenticated,
  userValidationRules.update,
  validate,
  userController.updateUser
);

router.delete(
  "/:id",
  isAuthenticated,
  userValidationRules.delete,
  validate,
  userController.deleteUser
);

module.exports = router;
