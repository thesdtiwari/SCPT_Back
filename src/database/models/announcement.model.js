const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
  date_announced: Date,
  message: String,
});

// create test model
const announcementModel = mongoose.model("announcement", AnnouncementSchema);

module.exports = announcementModel;
