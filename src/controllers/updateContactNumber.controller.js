const StudentModel=require("../database/models/student.model")

module.exports = async (req, res) => {
    const temp = await StudentModel.findById(req.user._id);
    
    temp.contactNo=req.body.contactNo;
    //console.log(temp);
    await StudentModel.findByIdAndUpdate(req.user._id,temp).then(
        console.log("Contact Number updated succesfully"),
    );
    res.status(200).send("Contact Number updated succesfully!!")
}