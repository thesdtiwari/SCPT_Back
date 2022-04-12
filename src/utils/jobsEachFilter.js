module.exports = (job) => {
    return {
        _id: job._id,
        active: job.active,
        jobDescription: job.jobDescription,
        recruitmentType: job.recruitmentType,
        eligibility: job.eligibility,
        companyName: job.company.companyName,
        industrySector: job.company.industrySector,
        package: job.package,
        isElig: job.isElig
    }
};