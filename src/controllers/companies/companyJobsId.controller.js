const JobModel = require("../../database/models/job.model");
// const JobFilter = require("../../utils/jobsAllFilter");

module.exports = async (req, res) => {
  // console.log(req);
  const job = await JobModel.findById(req.params.id)
    .populate("studentsApplied")
    .populate("company");
  // let data = JobFilter(student.jobApplied);
  //console.log(student.jobApplied);
  //   console.log(data);
  res.send(job);
};
