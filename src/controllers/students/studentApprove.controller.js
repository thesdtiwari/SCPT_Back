const StudentModel = require("../../database/models/student.model");

const restrict = async (req, res, next) => {
  try {
    const studId = req.params.id;
    let student = await StudentModel.findOneAndUpdate({ _id: studId }, { approvedByTPO: true }, { new: true }).then(
      console.log("Student Approved")
    );
    
    res.send(student);

  } catch (err) {
    next(err);
  }
}

module.exports = restrict;