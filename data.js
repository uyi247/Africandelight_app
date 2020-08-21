const mongoose = require("mongoose");

const User = require("./models/user");
const Recipee = require("./models/recipee");

//TODO: need password and user to mongodb to continue here
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

const data = {
  createUser: function (user) {
    return new Promise(function (resolve, reject) {
      if (user.password !== user.confirmPass) {
        return reject("password not match");
      }
      if (user.name === undefined || user.name.length === 0) {
        return reject("name can not be empty");
      }
      if (user.email === undefined || user.email.length === 0) {
        return reject("email can not be empty");
      }
      if (user.password === undefined || user.password.length === 0) {
        return reject("password can not be empty");
      }

      const userCol = new User(user);
      userCol.save((err, user) => {
        if (err) {
          if (err.includes("duplicate key error"))
            return reject("email already taken");
          return reject("database error while creating user");
        }
        return resolve(user);
      });
    });
  },

  login: function (cred) {
    return new Promise(function (resolve, reject) {
      User.findOne({ email: cred.email }, (err, user) => {
        console.log(user);
        console.log(err);
        if (err || user === null || user === undefined)
          return reject("invalid username/password");
        if (user.password !== cred.password) {
          return reject("invalid username/password");
        } else return resolve(user);
      });
    });
  },

  getAllRecipee: function () {
    return new Promise(function (resolve, reject) {
      Recipee.find({}, function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  },

  getRecipee: function (id) {
    return new Promise(function (resolve, reject) {
      Recipee.findOne({ _id: id }, function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  },

  createRecipee: function (recipeData) {
    return new Promise(function (resolve, reject) {
      const recipe = new Recipee(recipeData);
      recipe.save(function (res) {
        resolve(res);
      });
    });
  },

  deleteRecipee: function (id) {
    return new Promise(function (resolve, reject) {
      Recipee.deleteOne({ _id: id }, function (err) {
        if (err) {
          return reject("error deleting recipe");
        } else resolve();
      });
    });
  },

  editRecipee: function (recipeData) {
    return new Promise(function (resolve, reject) {
      const recipe = new Recipee(recipeData);
      // Recipee.save(recipeData, function (res) {
      //   resolve(res);
      // });
      const id = recipeData._id;
      delete recipeData._id;

      Recipee.update({ _id: id }, recipeData, function (res) {
        resolve(res);
      });
    });
  },
};
module.exports = data;
