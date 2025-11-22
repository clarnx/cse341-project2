const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validate, userValidationRules } = require("../middleware/validation");

router.get("/", userController.getAll);

router.get("/:id", userValidationRules.getById, validate, userController.getSingle);

router.post("/", userValidationRules.create, validate, userController.createUser);

router.put("/:id", userValidationRules.update, validate, userController.updateUser);

router.delete("/:id", userValidationRules.delete, validate, userController.deleteUser);

module.exports = router;
