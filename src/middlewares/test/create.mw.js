const createController = require("../../controllers/test/").create;

module.exports = async (req, res) => {
//   console.log(req);
  const testDoc = await createController.create(req);
  if (testDoc === null) {
    res.status(400).send("There was an error while saving data.");
  } else {
    res.status(200).send(testDoc);
  }
};
