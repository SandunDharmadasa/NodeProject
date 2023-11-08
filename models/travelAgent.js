const mongoose = require('mongoose');

const TravelAgentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    userId: {
        type:String,
        required:true
    },

    contactInfo: {
        type:String,
        required:true
    },

    location: {
        type:String,
        required:true
    }
});

const TravelAgent = mongoose.model('TravelAgent',TravelAgentSchema);

module.exports = TravelAgent;