const StudentModel = require('../database/models/student.model');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const temp = await StudentModel.findById(req.user._id);
  //   console.log(temp);

  temp.password = await bcrypt.hash(req.body.password, 10);
  //   console.log(temp);
  
  await StudentModel.findByIdAndUpdate(req.user._id, temp).then(
    console.log('Passoword Succesfully changed')
  );
  res.status(200).send('Password Successfully changed!!');
};
