const Url = require("../Models/url.model.js");
const User = require("../Models/user.model.js");
const path = require("path");
var fetch = require("node-fetch");

const randomString = (numOfLetters) => {
   let randomString = "";
   const CHARACTERS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   for (let i = 0; i < numOfLetters; i++) {
      randomString += CHARACTERS.charAt(
         Math.floor(Math.random() * CHARACTERS.length)
      );
   }
   return randomString;
};

exports.addUrl_POST = async (req, res) => {
   if (!req.body.url) {
      return res.status(400).send({ message: "Need URL" });
   }

   if (!req.body.shortenedUrl) {
      let shortenedUrl = randomString(Math.floor(Math.random() * 6) + 1);
      while (true) {
         const result = await Url.findOne({
            shortenedUrl: shortenedUrl,
         })
            .select("_id")
            .lean();
         if (result || shortenedUrl == "geturls") {
            shortenedUrl = randomString(5);
         } else {
            req.body.shortenedUrl = "http://localhost:3000/url/" + shortenedUrl;
            break;
         }
      }
   } else {
      const result = await Url.findOne({
         shortenedUrl: "http://localhost:3000/url/" + req.body.shortenedUrl,
      })
         .select("_id")
         .lean();
      if (result) {
         return res
            .status(400)
            .send({ message: "Shortened URL already Exist" });
      }
      req.body.shortenedUrl =
         "http://localhost:3000/url/" + req.body.shortenedUrl;
   }

   try {
      const date = new Date();
      const url = await Url.create({
         url: req.body.url,
         shortenedUrl: req.body.shortenedUrl,
         expireAt: date.setMonth(date.getMonth() + 6),
         createdBy: req.body.user && req.body.user._id,
      });
      if (req.body.user) {
         await User.findOneAndUpdate(
            { _id: req.body.user._id },
            { $push: { urlIDs: url._id } }
         );
      }
      return res.status(200).send(url.shortenedUrl);
   } catch (e) {
      console.log(e);
      return res.status(500).end();
   }
};

const handleContinent = async (res, continent, info) => {
   const shortenedUrl = "http://localhost:3000/url/" + info;
   try {
      const date = new Date();
      if (continent == "North America") {
         var { url } = await Url.findOneAndUpdate(
            { shortenedUrl: shortenedUrl },
            {
               $inc: { "count.count": 1, "count.namerica": 1 },
               expireAt: date.setMonth(date.getMonth() + 6),
            }
         )
            .select("url")
            .lean();
      } else if (continent == "South America") {
         var { url } = await Url.findOneAndUpdate(
            { shortenedUrl: shortenedUrl },
            {
               $inc: { "count.count": 1, "count.samerica": 1 },
               expireAt: date.setMonth(date.getMonth() + 6),
            }
         )
            .select("url")
            .lean();
      } else if (continent == "Europe") {
         var { url } = await Url.findOneAndUpdate(
            { shortenedUrl: shortenedUrl },
            {
               $inc: { "count.count": 1, "count.europe": 1 },
               expireAt: date.setMonth(date.getMonth() + 6),
            }
         )
            .select("url")
            .lean();
      } else if (continent == "Asia") {
         var { url } = await Url.findOneAndUpdate(
            { shortenedUrl: shortenedUrl },
            {
               $inc: { "count.count": 1, "count.asia": 1 },
               expireAt: date.setMonth(date.getMonth() + 6),
            }
         )
            .select("url")
            .lean();
      } else {
         var { url } = await Url.findOneAndUpdate(
            { shortenedUrl: shortenedUrl },
            {
               $inc: { "count.count": 1, "count.africa": 1 },
               expireAt: date.setMonth(date.getMonth() + 6),
            }
         )
            .select("url")
            .lean();
      }
      return res.status(200).redirect(url);
   } catch (e) {
      console.log(e);
      return res.status(500).send("URL not found");
   }
};

exports.reRoute_GET = async (req, res) => {
   let continent = "africa";
   const fetchUrl = `http://ip-api.com/json/${req.ip}?fields=status,continent`; //Manually replace req.ip with you own IP when running in localhost
   fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
         continent = data.continent;
         return handleContinent(res, continent, req.params.info);
      });
};
