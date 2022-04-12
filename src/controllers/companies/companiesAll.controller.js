const CompanyModel = require("../../database/models/company.model");

module.exports = async (req, res) => {
  // console.log(req);
  const company = await CompanyModel.find({}).populate("jobOpenings");
  // let data = JobFilter(job);
  //console.log(data);
  res.send(company);
};
