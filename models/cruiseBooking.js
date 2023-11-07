const mongoose = require('mongoose');

const CruiseBookingSchema = new mongoose.Schema({
    mealPreference: {
        type:String,
        required:true
    },

    cabinSelection: {
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

const CruiseBooking = mongoose.model('CruiseBooking',CruiseBookingSchema);

module.exports = CruiseBooking;