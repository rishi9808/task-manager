import express from 'express';
import { studentModel } from '../../models/students.js';

//use http://localhost:3002/getstudentinfo

const router=express.Router();

router.get("/",async function(req,res){
    const {sid}=req.query;
    
    //console.log(sid);
    const stud_info= await studentModel.findById(sid)
    console.log("info is")
    if(stud_info){
        //console.log("Here is the student info from mongo",stud_info);
        res.json(stud_info);
    }
    else{
        // stud_info="No student found";
        res.json(stud_info);
    }
}

);

export {router as getstudentinfoRouter};
