const User = require("../Models/user.model.js");
const jwt = require("jsonwebtoken");
const { newToken } = require("../Auth/auth.js");

exports.signUpUser_POST = async (req, res) => {
   if (!req.body.userID || !req.body.password) {
      return res.status(400).send({ message: "Need UserID and password" });
   }
   let userPresent;
   User.findOne({ userID: req.body.userID }, (err, user) => {
      if (err) {
         userPresent = false;
      }
      if (user) {
         userPresent = true;
         return res.status(400).send({ message: "UserID taken" });
      }
   });
   if (!userPresent) {
      try {
         const user = await User.create(req.body);
         const token = newToken(user);
         return res.status(201).send({ token }); // success
      } catch (err) {
         return res.status(500).end();
      }
   }
};

exports.logInUser_POST = async (req, res) => {
   if (!req.body.userID || !req.body.password) {
      return res.status(400).send({ message: "Need UserID and password" });
   }
   try {
      let user = await User.findOne({ userID: req.body.userID });
      if (!user) {
         return res.status(400).send({ message: "User ID not signed up" });
      }
      const token = newToken(user);
      return res.status(201).send({ token }); // success
   } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "User ID not signed up" });
   }
};

exports.getUser_POST = async (req, res) => {
   res.status(200).send(req.body.user);
};
