const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    
    destination: {
        type:String,
        required:true
    },

    date: {
        type:String,
        required:true
    },

    type: {
        type:String,
        required:true
    },

    starRating: {
        type:String,
        required:true
    },

    price: {
        type:String,
        required:true
    },

    ageRestriction: {
        type:String,
        required:true
    }

});

const Activity = mongoose.model('Activity',ActivitySchema);

module.exports = Activity;