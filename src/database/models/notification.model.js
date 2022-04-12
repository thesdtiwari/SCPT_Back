const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    timestamp: {
        type: Date,
        required: true,
        default: new Date()
    },
    message: {
        type: String
    }
});

const notificationModel = mongoose.model('Notification', NotificationSchema);
module.exports = notificationModel;