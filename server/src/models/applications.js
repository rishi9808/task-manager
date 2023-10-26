import mongoose from "mongoose";

const applicationsSchema = new mongoose.Schema({
    pjid:{type: mongoose.Schema.Types.ObjectId, ref: 'postedJobs',required:true},
    sid:{type: mongoose.Schema.Types.ObjectId, ref: 'students',required:true , default: null},
    status:{type:String, required:true,default:"Pending"}
},
{collection:"applications"})

export const applicationsModel = mongoose.model("applications",applicationsSchema);