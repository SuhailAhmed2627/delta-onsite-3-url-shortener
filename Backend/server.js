const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { json, urlencoded } = require("body-parser");
const path = require("path");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/url-shortener", {
   useNewUrlParser: true,
});

const urlRouter = require("./Routers/url.router.js");
const userRouter = require("./Routers/user.router.js");
const { protect } = require("./Auth/auth.js");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/url", urlRouter);
app.use("/user", userRouter);
app.post("/getuser", protect, (req, res) => {
   return res.status(200).send(req.body.user);
});

app.use(express.static(path.join(__dirname, "Public")));

const port = 3000;

app.listen(port, () => console.log(`http://localhost:${port}`));
