const Router = require("express").Router;
const { protect } = require("../Auth/auth.js");
const {
   signUpUser_POST,
   logInUser_POST,
   getUser_POST,
   getUrls_GET,
} = require("../Controllers/user.controller.js");

const router = Router();

router.post("/signup", signUpUser_POST);
router.post("/login", logInUser_POST);
router.post("/get", getUser_POST);
router.get("/urls", protect, getUrls_GET);

module.exports = router;
