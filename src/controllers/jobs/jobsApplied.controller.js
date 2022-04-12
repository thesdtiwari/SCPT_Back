const StudentModel = require("../../database/models/student.model");
const JobFilter = require("../../utils/jobsAllFilter");

module.exports = async (req, res) => {
  // console.log(req);
  const student = await StudentModel.findById(req.user._id).populate({
    path: "jobApplied",
    populate: {
      path: "company",
    },
  });
  // let data = JobFilter(student.jobApplied);
  //console.log(student.jobApplied);
//   console.log(data);
  res.send(student.jobApplied);
};
