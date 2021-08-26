const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/url-shortener", {
   useNewUrlParser: true,
});

const urlRouter = require("./Routers/url.router.js");

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/url", urlRouter);
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
   return res.status(200).sendFile("./Public/index.html");
});

const port = 3000;

app.listen(port, () => console.log(`http://localhost:${port}`));
