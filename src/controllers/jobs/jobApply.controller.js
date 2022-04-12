const JobModel = require("../../database/models/job.model");
const StudentModel = require("../../database/models/student.model");
// const JobFilter = require("../../utils/jobsEachFilter");

const { DateTime } = require("luxon");

module.exports = async (req, res, next) => {
  const jobId = req.params.id;
  const studentId = req.user._id;
  // console.log(studentId);
  // console.log(jobId);

  let student = await StudentModel.findById(studentId);
  let job = await JobModel.findById(jobId).populate("company");

  try {
    const found = student.jobApplied.find((x) => x == jobId);
    if (!found) {
      await student.jobApplied.push(jobId);
      const notification = {
        iat: DateTime.now().toLocaleString(),
        exp: DateTime.now().plus({ days: 10 }),
        message: `You applied for Job at ${
          job.company.companyName
        } on ${DateTime.now().toLocaleString()}`,
      };
      await student.notification.unshift(notification);
      await job.studentsApplied.push(studentId);
    }

    await StudentModel.findByIdAndUpdate(studentId, student);
    await JobModel.findByIdAndUpdate(jobId, job);

    res.send({ isApplied: "applied" });
  } catch (err) {
    const notification = {
      iat: DateTime.now().toLocaleString(),
      exp: DateTime.now().plus({ days: 10 }),
      message: `You application process for Job at ${
        job.company.companyName
      } on ${DateTime.now().toLocaleString()} failed.`,
    };
    student.notification.unshift(notification);
    next(err);
  }
};
