const router = require("express").Router();
const students = require("../controllers/students/");

router.get("/all", students.all);
router.get("/:id", students.id);
router.put("/:id/restrict", students.restrict);
router.put("/:id/approve", students.approve);

module.exports = router;
