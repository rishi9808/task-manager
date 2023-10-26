import express from "express";
import { studentModel } from "../../models/students.js";
import jwt from "jsonwebtoken";
//use http://localhost:3002/savejob

const router = express.Router();

router.post("/add", async function (req, res) {
  console.log(req.body);
  const { sid, pjid } = req.body;
  await studentModel.updateOne(
    { _id: sid },
    { $push: { savedJobs: pjid } }).then(res=>{
        console.log("Job saved successfully", res);
    }).catch(err=>{
        console.log("some error occured in saving a job", err);
    })
  res.json({ message: "Job saved successfully" });
});

router.post("/remove", async function (req, res) {
    console.log(req.body);
  const { sid, pjid } = req.body;
  await studentModel.updateOne(
    { _id: sid },
    { $pull: { savedJobs: pjid } }).then(res=>{
        console.log("Job removed successfully", res);
    }).catch(err=>{
        console.log("some error occured in removing a job", err);
    })
  res.json({ message: "Job removed successfully" });

});

router.get("/get",async function(req,res){
    const { sid } = req.query;
    console.log("The sid recived in savejob",sid)
    const student=await studentModel.findById(sid);
    if(student){
        res.json(student)
    }
    else{
        res.json({message:"No such student"})
    }
})

export { router as saveJobRouter };
