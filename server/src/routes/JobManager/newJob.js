import express from "express";
import { postedJobsModel } from "../../models/postedJobs.js";
import moment from "moment/moment.js";
//use http://localhost:3002/newjob

const router = express.Router();

router.get("/", async function (req, res) {
   
})


router.post("/", async function (req, res) { //
    const { jmid,title,date,no_stud,invLink,district,city,wage,jobCat } = req.body;
    const refinedDate=moment.utc(date, 'YYYY-MM-DD').utcOffset(0).toDate(); // Date come from client is in YYYY-MM-DD and MM starts in 01. this converts it into mm starts from 00 and recognized by mongo
    const newPostedJob = new postedJobsModel({
        jmid: jmid,
        jid: "6458d3011f79e72a67eabd3e",
        title: title,
        date:refinedDate,
        no_stud,
        invLink,
        district,
        city,
        wage,
        jobCat
    });
    await newPostedJob.save();
    //console.log("saved new job and job is",newPostedJob);
    res.json({ message: "saved new job successfully", job: newPostedJob });
})







export { router as newJob };