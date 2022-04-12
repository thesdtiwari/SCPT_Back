const JobModel = require("../../database/models/job.model");
const JobFilter = require("../../utils/jobsAllFilter");

module.exports = async (req, res) => {
  // console.log(req);
  const job = await JobModel.find({}).populate("company");
  // let data = JobFilter(job);
  //console.log(data);
  res.send(job);
};
