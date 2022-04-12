const router = require("express").Router();
const jobs = require("../controllers/jobs/index");

router.get("/all", jobs.all);
router.get("/applied", jobs.applied);
router.get("/:id", jobs.id);
router.post("/:id/apply", jobs.apply);
router.get("/:id/students", jobs.students);

module.exports = router;
