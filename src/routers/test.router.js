const router = require("express").Router();
const testRoutesMw = require("../middlewares/test");

router.get("/", (req, res) => {
  res.send("nothing to send here too.");
});
router.get("/view", testRoutesMw.viewMw);
router.post("/create", testRoutesMw.createMw);

// TODO task for now
// router.delete("/delete", testRoutesMw.deleteMw);

module.exports = router;
