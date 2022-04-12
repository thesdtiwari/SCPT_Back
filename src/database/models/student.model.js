const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	
	//Enrollment number
	enrollmentNumber: {
		type: String,
		required: true,
	},
	
	//year of passout
	passoutBatch: {
		type: String,
		required: true,
	},
	// Gender
	gender: {
		type: String,
		required: true,
	},
	//branch
	program: {
		type: String,
		required: true,
	},
	contactNo: {
		type: String,
		required: true,
	},
	// email to contact(generally personal Email)
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	cgpa: {
		type: Number,
		required: true,
	},
	sgpa: [
		{
			type: Number,
			default: -1,
		},
	],

	// for number of backlogs of the student
	backlogs: {
		type: Number,
		default: 0
	},
	
	// address: {
	//     type: String,
	// },
	city: {
		type: String,
	},
	postCode: {
		type: String,
	},
	state: {
		type: String,
	},
	country: {
		type: String,
	},
	linkedlnURL: {
		type: String,
		required: true,
	},
	resumeUrl: {
		type: String,
	},
	
	approvedByTPO: {
		type: Boolean,
		default: true,
		required: true
	},

	jobApplied: [
		{
			type: Schema.Types.ObjectId,
			ref: "JobOffer",
		},
	],
	
	offersReceived: [
		{
			type: Schema.Types.ObjectId,
			ref: "JobsReceived",
		},
	],
	notification: [
		{
			iat: {
				type: Date,
				required: true,
				default: Date.now
			},
			exp: {
				type: Date,
				required: true,
				default: () => Date.now() + 7*24*60*60*1000
			},
			message: {
				type: String
			}
		}
	],
	readNotifications : [
		{
			iat: {
				type: Date,
				required: true,
				default: Date.now
			},
			message: {
				type: String
			}
		}
	]
});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it
// StudentSchema.pre("findOneAndUpdate", async function () {
// 	const user = this;
// 	//   console.log("pre hook", user);
// 	const hash = await bcrypt.hash(user._update.password, 10);
// 	//   console.log(hash);
// 	user._update.password = hash;
// 	//   console.log("pre hook done", user);
// });

// bcrypt hashes the password sent by the user for login
// and checks if the hashed password stored in the database matches the one sent.
// It will return true if there is a match.
// Otherwise, it will return false if there is not a match.
StudentSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
};

// create student model
const studentModel = mongoose.model("Student", StudentSchema);
module.exports = studentModel;
