const Router = require("express").Router;
const {
   addUrl_POST,
   reRoute_GET,
   getUrls_GET,
} = require("../Controllers/url.controller.js");
const { protect } = require("../Auth/auth.js");
const router = Router();

router.post("/create", addUrl_POST);
router.get("/:info", reRoute_GET);
router.post("/usercreate", protect, addUrl_POST);

module.exports = router;
