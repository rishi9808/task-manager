import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    jobName:{type:String, required:true , unique:true},
})

export const jobsModel = mongoose.model("jobs",jobsSchema);