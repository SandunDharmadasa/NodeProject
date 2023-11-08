const BackofficeManagement = require('../models/backofficeManagement');
const asyncHandler = require('express-async-handler');

//Add backoffice management
const addBackofficeManagement = asyncHandler(async (req, res) => {
    const { backofficeName, lastUpdated, updateType, productType , dataFile } = req.body;

    //Validations
    if(!backofficeName || !lastUpdated || !updateType || !productType || !dataFile) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if backoffice management already exists
    const backofficeManagement = await BackofficeManagement.findOne({ backofficeName });

    //if backoffice management exists
    if (backofficeManagement) {
        return res.status(400).json({
            success: false,
            message: 'This Backoffice Management already exists'
        });
    }

    //create backoffice managements
    const newBackofficeManagement = new BackofficeManagement({
        backofficeName,
        lastUpdated,
        updateType,
        productType,
        dataFile
    });

    //save backoffice management
    await newBackofficeManagement.save();

    if (newBackofficeManagement) {
        res.status(201).json({
            success: true,
            data: newBackofficeManagement
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Backoffice Management not added'
        });
        throw new Error('Backoffice Managemente not added');
    }
});

//Retrieve all the backoffice managements
const getBackofficeManagement = asyncHandler(async (req, res) => {
    const backofficeManagement = await BackofficeManagement.find();

    if (backofficeManagement) {
        res.status(200).json({
            success: true,
            data: backofficeManagement
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No Backoffice Managements found'
        });
        throw new Error('No Backoffice Managements found');
    }
});

//Update backoffice management
const editBackofficeManagement = asyncHandler(async (req, res) => {
    const backofficeManagement = await BackofficeManagement.findById(req.params.id);

    if (!backofficeManagement) {
        return res.status(400).json({
            success: false,
            message: 'No Backoffice Managements found'
        });
    } else {
        const { backofficeName, lastUpdated, updateType, productType, dataFile } = req.body;

        backofficeManagement.backofficeName = backofficeName;
        backofficeManagement.lastUpdated = lastUpdated;
        backofficeManagement.updateType = updateType;
        backofficeManagement.productType = productType;
        backofficeManagement.dataFile = dataFile;

        await backofficeManagement.save();

        res.status(200).json({
            success: true,
            data: backofficeManagement
        });
    }
});

//Delete backoffice management by Id
const deleteBackofficeManagement = asyncHandler(async (req, res)  => {
    const backofficeManagement = await BackofficeManagement.findById(req.params.id);

    if (!backofficeManagement) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await backofficeManagement.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Backoffice Management deleted successfully'
        });
    }
});

//Remove all the backoffice managements
const deleteAll = asyncHandler(async (req, res) => {
    const backofficeManagement = await BackofficeManagement.deleteMany();

    if (!backofficeManagement) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Backoffice Managements deleted successfully'
        });
    }
});

module.exports = {
    addBackofficeManagement,
    getBackofficeManagement,
    editBackofficeManagement,
    deleteBackofficeManagement,
    deleteAll
};