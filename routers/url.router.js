const Router = require("express").Router;
const {
   addUrl_POST,
   reRoute_GET,
} = require("../Controllers/url.controller.js");

const router = Router();

router.post("/create", addUrl_POST);
router.get("/:info", reRoute_GET);

module.exports = router;
