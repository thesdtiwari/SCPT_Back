const StudentModel = require("../../database/models/student.model");

module.exports = async (req, res) => {
  // console.log(req);
  const students = await StudentModel.find({})
  .populate("jobApplied");
  res.send(students);
};
