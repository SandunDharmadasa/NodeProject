const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    
    destination: {
        type:String,
        required:true
    },

    duration: {
        type:String,
        required:true
    },

    specialty : {
        type:String,
        required:true
    },

    price: {
        type:String,
        required:true
    },

    packageRating: {
        type:String,
        required:true
    }
});

const Holiday = mongoose.model('Holiday',HolidaySchema);

module.exports = Holiday;