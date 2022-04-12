const StudentModel = require("../database/models/student.model");

module.exports = async (req, res) => {
  // console.log(req);
  const student = await StudentModel.findById(req.user._id).populate(
    "jobApplied"
  );
  // console.log("student", student);
  res.send(student);
};