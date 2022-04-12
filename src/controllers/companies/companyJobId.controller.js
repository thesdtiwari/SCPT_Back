const JobModel = require("../../database/models/job.model");

module.exports = async (req, res) => {
    const jobId = req.params.jid;
    const job = await JobModel.findById(jobId).populate("studentsApplied");
    res.send(job);

};
