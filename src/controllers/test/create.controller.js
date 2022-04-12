const TestModel = require("../../database/models/test.model");

module.exports = {
  create: async (req) => {
    try {
      // show the data being saved in server console
      console.log("Data to be saved", req.body);

      const testDoc = new TestModel(req.body);
      await testDoc.save();
      console.log("Data Saved Successfully.");

      return "Data Saved";
    } catch (err) {
      console.log("Error in saving data.");
      console.error(err);
      return null;
    }
  },
};
