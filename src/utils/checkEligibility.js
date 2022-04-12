module.exports = (job, student) => {
  let elig = student.approvedByTPO;
  let reason;
  if (student.gender === "Male" && job.onlyForFemales) {
    elig = false;
    reason = "Gender Criteria";
  } else if (student.backlogs > job.maxBacklogsAllowed) {
    elig = false;
    reason = "Backlogs Criteria";
  } else if (student.cgpa < job.minCgpa) {
    elig = false;
    reason = "CGPA Criteria";
  } else if (job.isApplied) {
    elig = false;
    reason = "Already Applied";
  }

  return {
    isElig: elig,
    reason,
  };
};
