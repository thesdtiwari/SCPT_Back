const viewController = require("../../controllers/test/").view;

module.exports = async (req, res) => {
  const testDoc = await viewController.view();
  if (testDoc === null) {
    res.status(400).send("There was an error while searching for data.");
  }
  if (!testDoc) {
    console.log("Empty Data");
    res.status(200).send([]);
  } else {
    res.status(200).send(testDoc);
  }
};
