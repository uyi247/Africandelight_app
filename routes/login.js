const router = require("express").Router();
const data = require("./../data");

router.get("/", function (req, res) {
  res.render("login", { title: "Login - African Delight" });
});

router.post("/", (req, res) => {
  data
    .login(req.body)
    .then((user) => {
      req.session.user = user;
      res.redirect("/recipes");
    })
    .catch((err) => {
      console.log(err);
      res.render("login", { title: "Login - African Delight", err: err });
    });
});

module.exports = router;
