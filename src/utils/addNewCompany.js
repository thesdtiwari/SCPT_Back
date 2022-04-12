const CompanyModel = require("../database/models/company.model");

const addNewCompany = async (req, res, next) => {
  try {
    const newCompany = new CompanyModel(req.body);
    await newCompany.save();

    res.send({
      isCompanyAdded: `${newCompany.companyName} Company Added successfully.`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addNewCompany;
