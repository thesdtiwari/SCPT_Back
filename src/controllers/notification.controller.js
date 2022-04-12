const StudentModel = require("../database/models/student.model");

const markAsRead = async (req, res, next) => {
  try {
    // get the requester student
    const student = (await StudentModel.findById(req.user._id)).toObject();

    // console.log(req.body);
    // console.log("notifications", student.notification);
    // console.log("readNotifiactions", student.readNotifications);

    // variable to store index of notification to be deleted
    let deleteInd;

    // convert date to appropriate format for comparing
    const notifDate = new Date(req.body.iat);
    const compareDate = notifDate.getTime();

    // find the requested notification
    const selectedNotification = student.notification.find((notif, ind) => {
      const newDate = new Date(notif.iat);
      // console.log(compareDate.getTime(), newDate.getTime());

      if (newDate.getTime() === compareDate) {
        deleteInd = ind;
        return true;
      }
      return false;
    });

    // console.log("selected", selectedNotification, deleteInd);

    student.notification.splice(deleteInd, 1);
    student.readNotifications.unshift(selectedNotification);

    // console.log("notifications", student.notification);
    // console.log("readNotifiactions", student.readNotifications);

    const retStu = await StudentModel.findByIdAndUpdate(student._id, {
      $set: {
        notification: student.notification,
        readNotifications: student.readNotifications,
      },
    });

    // console.log(retStu);

    res.send({ status: "ok" });
  } catch (err) {
    next(err);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    // get the requester student
    const student = (await StudentModel.findById(req.user._id)).toObject();

    // console.log(req.body);
    // console.log("notifications", student.notification);
    // console.log("readNotifiactions", student.readNotifications);

    // variable to store index of notification to be deleted
    let deleteInd;

    // convert date to appropriate format for comparing
    const notifDate = new Date(req.body.iat);
    const compareDate = notifDate.getTime();

    // find the requested notification
    const selectedNotification = student.notification.find((notif, ind) => {
      const newDate = new Date(notif.iat);
      // console.log(compareDate.getTime(), newDate.getTime());

      if (newDate.getTime() === compareDate) {
        deleteInd = ind;
        return true;
      }
      return false;
    });

    // console.log("selected", selectedNotification, deleteInd);

    student.readNotifications.splice(deleteInd, 1);

    // console.log("notifications", student.notification);
    // console.log("readNotifiactions", student.readNotifications);

    const retStu = await StudentModel.findByIdAndUpdate(student._id, {
      $set: {
        readNotifications: student.readNotifications,
      },
    });

    // console.log(retStu);

    res.send({ status: "ok" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  markAsRead,
  deleteNotification,
};
