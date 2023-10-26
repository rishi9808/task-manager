import express from "express";
import { applicationsModel } from "../../models/applications.js";
import { studentModel } from "../../models/students.js";
import {postedJobsModel} from "../../models/postedJobs.js"
//use http://localhost:3002/approve.js
import { notify } from "./notify.js";

import dotenv from 'dotenv'

dotenv.config()
const router = express.Router();

async function sentMail(s_emailid,job_title,job_invLink,status){
    if(status!="Pending"){

        try {
            console.log("Entered in sentmail")
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                  user: process.env.SMTP_EMAIL,
                  pass: process.env.SMTP_PASS
                }
              });
              var message="hi"
              if(status==="Accepted"){
                message=`<h3>We are glad to inform you that you job application for `+job_title+`  has been accepted </h3><br><p>Here is the invitation link for further communication `+job_invLink+`</p>`
              }
              else if(status==="Rejected"){
                message=`<h3>We are sorry to inform you that you job application for `+job_title+`  has been Rejected!!! `
              }
              const mailOption ={
                from: process.env.SMTP_EMAIL, 
                to: s_emailid, // list of receivers
                subject: "About Your Job Application", // Subject line
                // text: "Hello world?", // plain text body
                html: message, // html body
              }
              const info = await transporter.sendMail(mailOption);
            
    
              console.log("Mail sent successfully")
        } catch (error) {
            console.log("Mail sent failed")
            console.log(error)
        }

    }
}
router.post("/", async function (req, res) {
    console.log(req.body);
    const { aid, status } = req.body;
    try {
        const application = await applicationsModel.findById(aid);
        
        if (!application) {
            return res.json({ message: "There is no such application" });
        }
        else {
            const sid=application.sid;
            const pjid=application.pjid;
            const student=await studentModel.findById(sid);
            const job = await postedJobsModel.findById(pjid);
            const job_title=job.title;
            const job_invLink=job.invLink;
            const s_emailid=student.userName;
            application.status = status;
            await application.save();
            
            await notify(aid, status);
            return res.json({ message: "status saved  successfully" });

        }
    } catch (err) {
        console.log(err);
    }



})






export { router as approveRouter };