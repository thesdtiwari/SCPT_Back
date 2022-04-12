const router = require("express").Router();
const companies = require("../controllers/companies/index");
const job = require("../controllers/jobs/index");

router.post("/add", companies.add);
router.get("/all", companies.all);
router.get("/:id", companies.id);
router.get("/:id/jobs", companies.jobs);
router.get("/:id/jobs/:jid", companies.jobId);
router.post("/:id/jobs/add", job.add);
router.get("/:id/students", companies.students);

module.exports = router;
