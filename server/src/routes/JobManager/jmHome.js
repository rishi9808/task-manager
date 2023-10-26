import express from "express";
import { jobManagerModel } from "../../models/jobManagers.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postedJobsModel } from "../../models/postedJobs.js";
import mongoose from "mongoose";
import { applicationsModel } from "../../models/applications.js";
//use http://localhost:3002/jmhome

const router = express.Router();
async function getAppliedStudentsNumber(_id){
    const no_stud_applied= await applicationsModel.countDocuments({pjid:_id,status:"Accepted"});
    return no_stud_applied;
}
router.get("/", async function (req, res) {
    try {
        const{userId}=req.query;
        const response = await postedJobsModel.find({ isExpired: false,jmid:new mongoose.Types.ObjectId(userId) });
        for (let i = 0; i < response.length; i++) { //adding no of students applied and approved to the response
            const obj = response[i].toObject(); // Convert to plain JavaScript object
            obj.no_stud_applied = await getAppliedStudentsNumber(obj._id);
            //console.log("the student applied are ",obj.no_stud_applied);
            response[i] = obj;
          }
        res.json(response);
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Server not connceted"
        });
    }
})










export { router as jmHomeRouter };