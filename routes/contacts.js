const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");
const { validate, contactValidationRules } = require("../middleware/validation");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", contactController.getAll);

router.get(
  "/:id",
  contactValidationRules.getById,
  validate,
  contactController.getSingle
);

router.post(
  "/",
  isAuthenticated,
  contactValidationRules.create,
  validate,
  contactController.createContact
);

router.put(
  "/:id",
  isAuthenticated,
  contactValidationRules.update,
  validate,
  contactController.updateContact
);

router.delete(
  "/:id",
  isAuthenticated,
  contactValidationRules.delete,
  validate,
  contactController.deleteContact
);

module.exports = router;
