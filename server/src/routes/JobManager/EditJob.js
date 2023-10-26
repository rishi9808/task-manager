import express from "express";
import { postedJobsModel } from "../../models/postedJobs.js";
import moment from "moment/moment.js";
//use http://localhost:3002/Editjob

const router = express.Router();

router.get("/", async function (req, res) {
    const { pj_id } = req.query;
    const jobinfo = await postedJobsModel.findById(pj_id)
    if (jobinfo) {
        res.json(jobinfo);
    }
    else {
        jobinfo = {};
        res.json(jobinfo);
    }
})


router.post("/", async function (req, res) { //
    const { pjid, title, date, no_stud, invLink,city,district, wage, jobCat } = req.body;
    const refinedDate = moment.utc(date, 'YYYY-MM-DD').utcOffset(0).toDate(); // Date come from client is in YYYY-MM-DD and MM starts in 01. this converts it into mm starts from 00 and recognized by mongo
    const updateData = {
        title,
        date: refinedDate,
        no_stud,
        invLink,
        city,
        district,
        wage,
        jobCat
    }

    try {
        const updatedJob = await postedJobsModel.findByIdAndUpdate(pjid, { $set: updateData }, { new: true });
        if (updatedJob) {
            console.log('Job updated successfully:', updatedJob);
            res.json({ message: "Job editted successfully" });
        } else {
            console.log('Job not found');
            res.json({ message: "Something gone wrong" });
        }
    } catch (error) {
        console.log('Error updating job:', error);
        res.json({ message: "Something gone wrong" });
    }
})







export { router as EditJob };