const JobModel = require("../../database/models/job.model");
const StudentModel = require("../../database/models/student.model");
const JobFilter = require("../../utils/jobsEachFilter");
const CheckElig = require("../../utils/checkEligibility");

module.exports = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    job = (await JobModel.findById(jobId).populate("company")).toObject();
    //   convert the data returned by mongoose to plain object to modify it further
    const student = await StudentModel.findById(req.user._id);
    // console.log(student);
    const isApplied = student.jobApplied.includes(jobId);
    job.isApplied = isApplied;
    let check = CheckElig(job, student);
    // console.log(check);
    job.isStudentEligible = check.isElig;
    job.inEligibilityReason = check.reason;
    // console.log(job);
    // let data = JobFilter(job);
    // console.log(job.isElig);
    res.send(job);
  } catch (err) {
    next(err);
  }
};
