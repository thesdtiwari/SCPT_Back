const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanyModel = require("./company.model");

const jobPostingSchema = new Schema({
	timestamp: {
		type: Date,
		required: true,
		default: Date.now
	},

	// Details of the comapany the job is posted by
	company: {
		type: Schema.Types.ObjectId,
		ref: "Companie"
	},

	expectedSkills:{
		type: String
	},

	yourRole: {
		type: String
	},

	// Description of the job
	jobDescription: {
		type: String
	},
	// Intern/Full
	recruitmentType: {
		type: String
	},
	duration: {
		type: String
	},

	//location of job
	postingLocation: {
		type: String
	},
	active: {
		type: String,
		default: true
	},

	//Student Eligibility
	eligibility: [{
		type: Number
	}],
	onlyForFemales: {
		type: Boolean
	},
	minCgpa: {
		type: String   //TODO: convert float
	},
	maxBacklogsAllowed: {
		type: String
	},

	//Package
	package: {
		type: String
	},

	// registration deadline
	deadlineDate: {
		type: Date,
		required: true
	},
	jobId: {
		type: String,
		required: true,
		unique: true
	},
	// Array of Students applied
	//! Populate with details of students
	//? Lookup how to post references
	studentsApplied: [{
		type: Schema.Types.ObjectId,
		ref: "Student"
	}]
});

jobPostingSchema.pre("findOneAndUpdate", async function () {
	//code for auto increment of counter in jobId

	/*
	  console.log("pre hook", user);
	const hash = await bcrypt.hash(user._update.password, 10);
	//   console.log(hash);
	user._update.password = hash;
	//   console.log("pre hook done", user);
	*/
});


const jobModel = mongoose.model("JobOffer", jobPostingSchema);
// Collection named JobOffer[s]

module.exports = jobModel;

//TODO: Connect this model with the announcement model to create a model
//TODO: everytime a job is posted.
