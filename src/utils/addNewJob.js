const JobModel = require("../database/models/job.model");
const CompanyModel = require("../database/models/company.model");
const AnnouncementModel = require("../database/models/announcement.model");
const { DateTime } = require("luxon");

const addNewJob = async (req, res, next) => {
  try {
    const companyName = req.body.companyName;
    const company = await CompanyModel.findOne({ companyName });
    req.body.company = company._id;

    const newJob = new JobModel(req.body);
    await newJob.save();

    company.jobOpenings.push(newJob._id);

    await CompanyModel.findByIdAndUpdate(company._id, company);

    const announcement = {
      date_announced: Date.now(),
      message: `New Job Offer from ${companyName}. Last date to Apply: ${newJob.deadlineDate}.`,
    };

    const newAnnouncement = new AnnouncementModel(announcement);
    await newAnnouncement.save();

    res.send({
      isJobAdded: `New job at ${companyName} registered successfully.`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addNewJob;
