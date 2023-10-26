import { studentNotificationModel } from "../../models/studentnotification.js";
import { applicationsModel } from "../../models/applications.js";
async function notify(aid, status) {
    try {

        const application = await applicationsModel.findById(aid);
        const notification = await studentNotificationModel.findOne({ aid: aid });
        if (application) {
            if (!notification) {
                const sid = application.sid;
                const newNotification = new studentNotificationModel({
                    aid: aid,
                    sid: sid,
                    status: status
                })
                await newNotification.save();
            }
            else if (notification.status !== status) {
                const sid = application.sid;
                notification.status = status;
                await notification.save();
            }
        }

    } catch (err) {
        console.log(err)
    }
}

export { notify };