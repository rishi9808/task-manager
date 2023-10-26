import express from 'express';
import mongoose from 'mongoose';
import { studentNotificationModel } from '../../models/studentnotification.js';
//use http://localhost:3002/getnoti

const router=express.Router();

router.get("/",async function(req,res){
    const {sid}=req.query;
    //console.log(sid);
    const notifications= await studentNotificationModel.find({sid:new mongoose.Types.ObjectId(sid)}).populate({path:'aid',populate:{path:'pjid'}})
    if(notifications){
        //console.log("Here is the notifications from mongo",notifications);
        res.json(notifications);
    }
    else{
        notifications=[];
        res.json(notifications);
    }
}

);

export {router as getNotificationRouter};
