const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
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