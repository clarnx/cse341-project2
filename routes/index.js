const router = require("express").Router();
const passport = require("passport");
const users = require("./users");
const contacts = require("./contacts");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['Hello World']
  res.send("Hello world");
});

router.use("/users", users);
router.use("/contacts", contacts);

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

module.exports = router;
