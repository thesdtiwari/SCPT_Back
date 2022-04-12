const StudentModel=require("../database/models/student.model")

module.exports = async (req, res) => {
    const temp = await StudentModel.findById(req.user._id);
    
    temp.linkedlnURL=req.body.linkedlnURL;
    //console.log(temp);
    await StudentModel.findByIdAndUpdate(req.user._id,temp).then(
        console.log("LinkedIn link updated succesfully"),
    );
    res.status(200).send("LinkedIn link updated succesfully!!")
}