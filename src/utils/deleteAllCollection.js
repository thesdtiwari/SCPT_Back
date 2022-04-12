const StudentModel = require("../database/models/student.model");
const CompanyModel = require("../database/models/company.model");
const AnnouncementModel = require("../database/models/announcement.model");

module.exports = async (req, res, next) => {
  try {
    let Model;
    if (req.body.type === "student") {
      Model = StudentModel;
    } else if (req.body.type === "company") {
      Model = CompanyModel;
    } else if (req.body.type === "announcement") {
      Model = AnnouncementModel;
    }
    await Model.deleteMany({});
    res.send("Deleted");
  } catch (err) {
    next(err);
  }
};
