const CompanyModel = require("../database/models/company.model");
const StudentModel = require("../database/models/student.model");
const JobModel = require("../database/models/job.model");
const NotificationModel= require("../database/models/notification.model");
const announcementModel = require("../database/models/announcement.model");

const uploadJsonData = async (req, res, next) => {
  try {
    // console.log(req.body.type);
    // console.log(req.body.data);

    let Model;
    let queryOn;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    if (req.body.type === "company") {
      Model = CompanyModel;
      queryOn = "companyName";
    } else if (req.body.type === "student") {
      Model = StudentModel;
      queryOn = "email";
    } else if (req.body.type === "job") {
      Model = JobModel;
      queryOn = "jobId";
    } else if (req.body.type === "notification") {
      Model = NotificationModel;
      queryOn = "message";
    } else if (req.body.type === "announcement") {
      Model = announcementModel;
      queryOn = "message";
    }

    await req.body.data.map(async (entry) => {
      let newEntry = new Model(entry);
      // console.log(newEntry);

      const query = { [queryOn]: newEntry[queryOn] };
      // console.log("query", query);
      // const temp = await Model.findOne(query);
      // console.log("temp", temp);

      const update = entry;

      const result = await Model.findOneAndUpdate(query, update, options);
      // console.log("result", result);
    });
    res.status(200).send("OK");
  } catch (err) {
    next(err);
  }
};

module.exports = uploadJsonData;
