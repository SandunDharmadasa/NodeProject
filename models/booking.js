const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    agentId: {
        type:String,
        required:true
    },

    activityId: {
        type:String,
        required:false
    },

    packageId: {
        type:String,
        required:false
    },

    participantsCount: {
        type:String,
        required:true
    },

    dateBooked: {
        type:String,
        required:true
    },

    paymentStatus: {
        type:String,
        required:true
    }

});

const Booking = mongoose.model('Booking',BookingSchema);

module.exports = Booking;