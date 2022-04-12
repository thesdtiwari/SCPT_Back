const StudentModel=require("../database/models/student.model")

module.exports = async (req, res) => {
    const temp = await StudentModel.findById(req.user._id);
    
    temp.resumeUrl=req.body.resumeUrl;
    //console.log(temp);
    await StudentModel.findByIdAndUpdate(req.user._id,temp).then(
        console.log("Resume link updated succesfully"),
    );
    res.status(200).send("Resume link updated succesfully!!")
}