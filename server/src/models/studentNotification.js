import mongoose from "mongoose";

const studentNotificationSchema = new mongoose.Schema({
    aid:{type: mongoose.Schema.Types.ObjectId, ref: 'applications',required:true},
    sid:{type: mongoose.Schema.Types.ObjectId, ref: 'students',required:true},
    status:{type:String, required:true },
    invLink:{type:String},
    isRead:{type:Boolean,required:true, default:false}


},
{collection:"studentNotifications"})

export const studentNotificationModel = mongoose.model("studentNotifications",studentNotificationSchema);