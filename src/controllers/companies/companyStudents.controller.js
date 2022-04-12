const CompanyModel = require("../../database/models/company.model");

module.exports = async (req, res) => {
    const companyId = req.params.id;
    const company = await CompanyModel.findById(companyId).populate({
        path: "jobOpenings",
        populate: {
          path: "studentsApplied",
        },
      });
    const students = company.jobOpenings.map(x => {
        return {
            job: x.jobId,
            student: x.studentsApplied
        }
    });
    // res.send(company.jobOpenings);
    res.send(students);
};
