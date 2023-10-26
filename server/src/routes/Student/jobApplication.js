import express  from "express";
import { applicationsModel } from "../../models/applications.js";
import { studentNotificationModel } from "../../models/studentnotification.js";
//use http://localhost:3002/applyjob

const router = express.Router();

router.post("/",async function(req,res){
    //console.log("The req recieved to job Applications",req.body);
    const {pjid,sid,action}=req.body; //action can be register or cancel
    
    if(action === 'register'){
        const application= await applicationsModel.findOne({pjid:pjid,sid:sid});
        try{
            if(application){
                return res.json({message:"You have already registerd"});
            }
            else{
                const newApplication = new applicationsModel({pjid:pjid,sid:sid});
                await newApplication.save();
                return res.json({message:"Applied successfully"});
            }
        }catch(err){
            console.log(err);
        }
    }
    else if(action ==='cancel'){  //we get sid and pjid of applications model but we have to delete notifications coresponding to that application
        const application= await applicationsModel.findOne({pjid:pjid,sid:sid});
        if(application){
            const aid=application._id;
            await studentNotificationModel.deleteOne({aid});
        }
       await applicationsModel.deleteOne({pjid:pjid,sid:sid});

        //console.log("The application that has been canceld is",application)
        return res.json({message:"Registration has been canceled"});
    }
    
    


})
 





export {router as jobApplicationRouter};