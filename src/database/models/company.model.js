const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	//Company
	companyName: {
		type: String,
		required: true,
	},
	companyWebsite: {
		type: String,
	},
	industrySector: {
		type: String,
	},
	aboutCompany: {
		type: String,
	},
	linkedIn:{
		type: String,
	},

	//TODO: Use array instead of String for one to many relations
	//TODO: at a later stage of development
	jobOpenings: [{
		type: Schema.Types.ObjectId,
		ref: "JobOffer"
	}]
});

// create company model
const companyModel = mongoose.model("Companie", CompanySchema);
// git commit -m "Change collection name from 'Company' to 'Companie'" -m "mongoose capitalises the schema name.
// Hence 'Companie' will become 'Companies' while creating the collection"

module.exports = companyModel;