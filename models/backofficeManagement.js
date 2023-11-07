const mongoose = require('mongoose');

const BackofficeManagementSchema = new mongoose.Schema({
    backofficeName: {
        type:String,
        required:true
    },

    lastUpdated: {
        type:String,
        required:true
    },

    updateType: {
        type:String,
        required:true
    },

    productType: {
        type:String,
        required:true
    },
    
    dataFile: {
        type:String,
        required:true
    }

});

const BackofficeManagement = mongoose.model('BackofficeManagement',BackofficeManagementSchema);

module.exports = BackofficeManagement;