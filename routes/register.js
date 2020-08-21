const router = require("express").Router();
const data = require("./../data");

router.get("/", function (req, res) {
  res.render("register", { title: "Signup - African Delight" });
});

router.post("/", (req, res) => {
  const user = req.body;

  data
    .createUser(user)
    .then((result) => {
      delete result.password;
      req.session.user = result;
      res.redirect("/recipes");
    })
    .catch((err) => {
      console.log(err);
      res.render("register", { title: "Signup - African Delight", err: err });
    });
});

module.exports = router;
