const JobModel = require("../../database/models/job.model");
const CompanyModel = require("../../database/models/company.model");
const AnnouncementModel = require("../../database/models/announcement.model");
const { DateTime } = require("luxon");

const addNewJob = async (req, res, next) => {
  try {
    const companyId = req.params.id;

    const company = await CompanyModel.findById(companyId);
    const companyName = company.companyName;

    let jobsNum = company.jobOpenings.length;
    jobsNum = (jobsNum+1).toString();
    const jobCode = companyName + '-' + jobsNum;

    req.body.company = companyId;
    req.body.jobId = jobCode;

    const newJob = new JobModel(req.body);
    await newJob.save();

    company.jobOpenings.push(newJob._id);

    await CompanyModel.findByIdAndUpdate(companyId, company);

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
