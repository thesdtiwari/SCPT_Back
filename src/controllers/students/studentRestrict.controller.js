const StudentModel = require("../../database/models/student.model");

const restrict = async (req, res, next) => {
  try {
    const studId = req.params.id;
    let student = await StudentModel.findOneAndUpdate({ _id: studId }, { approvedByTPO: false }, { new: true }).then(
      console.log("Student Restricted")
    );
    
    res.send(student);

  } catch (err) {
    next(err);
  }
}

module.exports = restrict;