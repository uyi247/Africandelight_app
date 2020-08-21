var express = require("express");
const data = require("../data");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (!req.session.user) res.redirect("/login");
  data
    .getAllRecipee()
    .then(function (recipes) {
      res.render("recipee", {
        title: "Recipe - African Delight ",
        data: recipes,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", function (req, res, next) {
  if (!req.session.user) res.redirect("/login");
  res.render("createRecipe", { title: "Create Recipe - African Delight " });
});

router.post("/create", function (req, res, next) {
  if (!req.session.user) return res.redirect("/login");

  const reci = req.body;
  reci.user = req.session.user._id;

  data
    .createRecipee(reci)
    .then((recipe) => {
      res.redirect("/recipes");
    })
    .catch((err) => {
      console.log(err);
      res.render("createRecipe", {
        title: "Create Recipe - African Delight ",
        err: err,
      });
    });
});

router.get("/edit/:id", function (req, res, next) {
  if (!req.session.user) res.redirect("/login");

  const id = req.params.id;
  data
    .getRecipee(id)
    .then((result) => {
      res.render("editRecipe", {
        title: "Recipe - African Delight ",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("editRecipe", {
        title: "Recipe - African Delight ",
        data: {},
        err: "recipe not found - " + err,
      });
    });
  //
});

router.post("/edit", function (req, res, next) {
  if (!req.session.user) res.redirect("/login");
  const reci = req.body;
  // reci._id = req.params.id
  data
    .editRecipee(reci)
    .then((res) => {
      res.redirect("/recipes");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/recipes");
    });
});

router.get("/delete/:id", function (req, res, next) {
  if (!req.session.user) res.redirect("/login");
  const id = req.params.id;

  //res.redirect("/recipes");
  data
    .deleteRecipee(id)
    .then(function () {
      res.redirect("/recipes");
      // res.render("recipee", {
      //   title: "Recipe - African Delight ",
      //   msg: "Recipe deleted!",
      // });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/recipes");
    });
});

module.exports = router;
