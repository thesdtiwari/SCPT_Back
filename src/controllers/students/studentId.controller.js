const StudentModel = require("../../database/models/student.model");

module.exports = async (req, res) => {
  // console.log(req);
  const studId = req.params.id;
  const students = await StudentModel.findById(studId)
  .populate("jobApplied");
  res.send(students);
};
