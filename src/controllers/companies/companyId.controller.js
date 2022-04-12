const CompanyModel = require("../../database/models/company.model");

module.exports = async (req, res) => {
    const companyId = req.params.id;
    const company = (await CompanyModel.findById(companyId).populate("jobOpenings"));
    res.send(company);
};
