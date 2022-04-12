module.exports = (JobArray) => {
    const job = JobArray.map(x => {
        return {
            _id: x._id,
            active: x.active,
            jobDescription: x.jobDescription,
            recruitmentType: x.recruitmentType,
            eligibility: x.eligibility,
            companyName: x.company.companyName,
            industrySector: x.company.industrySector,
            package: x.package,

        }
    })
    return job;
};

/*
for development purpose
{
        "active": "Yes",
        "eligibility": [
            6,
            2
        ],
        "studentsApplied": [
            "60ab86f5a28c7ce0b792ce7f"
        ],
        "_id": "60abd66c88524f1ae9ab7448",
        "jobId": "Bain and co.-01",
        "__v": 0,
        "company": {
            "jobOpenings": [
                "60abd66c88524f1ae9ab7448"
            ],
            "_id": "60abd137ad0ee8155ee2a55e",
            "companyName": "Bain and co.",
            "__v": 0,
            "aboutCompany": "MBB",
            "companyWebsite": "Bain.xyz",
            "industrySector": "Consulting"
        },
        "deadlineDate": "2021-06-29T18:30:00.000Z",
        "duration": "Full time ",
        "jobDescription": "VWX",
        "maxBacklogsAllowed": "2",
        "minCgpa": "6",
        "onlyForFemales": "no",
        "package": "14",
        "postingLocation": "Gurugram",
        "recruitmentType": "Full time ",
        "timestamp": "2021-05-26T00:00:00.000Z"
    },
*/