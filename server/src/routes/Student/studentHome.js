import express from "express";
import { postedJobsModel } from "../../models/postedJobs.js";
import { applicationsModel } from "../../models/applications.js";
import { jobManagerModel } from "../../models/jobManagers.js";
//use http://localhost:3002/studenthome

const router = express.Router();
async function getAppliedStudentsNumber(_id) {
    const no_stud_applied = await applicationsModel.countDocuments({ pjid: _id, status: "Accepted" });
    return no_stud_applied;
}
router.get("/", async function (req, res) {
    const { sid } = req.query;
    try {
        const appliedJobsId = await applicationsModel.find({ sid }).distinct('pjid');
        // const response= await postedJobsModel.find({
        //     _id: { $nin: appliedJobsId },isExpired:false
        //   });
        const response = await postedJobsModel.find({ _id: { $nin: appliedJobsId }, isExpired: false })
            .populate({
                path: 'jmid',
                select: 'orgName',
                model: jobManagerModel
            })
            .exec();


        for (let i = 0; i < response.length; i++) { //adding no of students applied and approved to the response
            const obj = response[i].toObject(); // Convert to plain JavaScript object
            obj.no_stud_applied = await getAppliedStudentsNumber(obj._id);
            //console.log("the student applied are " + obj.no_stud_applied);
            response[i] = obj;
        }
        //console.log(response);
        res.json(response);
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Server not connceted"
        });
    }
})










export { router as studentHomeRouter };