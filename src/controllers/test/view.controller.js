const TestModel = require("../../database/models/logintest.model");

module.exports = {
  view: async () => {
    try {
      const testDoc = await TestModel.find({});
      // console.log("Data Retrieved Successfully.");
      return testDoc;
    } catch (err) {
      console.log("Error in retrieval of data from Database.");
      console.error(err);
      return null;
    }
  },
};
