const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
   url: {
      type: String,
      required: true,
   },
   shortenedUrl: {
      type: String,
      required: true,
   },
   createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
   },
   expireAt: {
      type: Date,
   },
   count: {
      type: {
         count: { type: Number },
         asia: { type: Number },
         europe: { type: Number },
         samerica: { type: Number },
         namerica: { type: Number },
         africa: { type: Number },
      },
      default: {
         count: 0,
         asia: 0,
         europe: 0,
         samerica: 0,
         namerica: 0,
         africa: 0,
      },
   },
});

urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("url", urlSchema);
