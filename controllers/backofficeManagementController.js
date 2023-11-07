const BackofficeManagement = require('../models/backofficeManagement');
const asyncHandler = require('express-async-handler');

//Add Items to the cart
const addBackofficeManagement = asyncHandler(async (req, res) => {
    const { backofficeName, lastUpdated, updateType, productType , dataFile } = req.body;

    //Validations
    if(!backofficeName || !lastUpdated || !updateType || !productType || !dataFile) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if item already exists in the cart
    const backofficeManagement = await BackofficeManagement.findOne({ backofficeName });

    //if item exists in the cart
    if (backofficeManagement) {
        return res.status(400).json({
            success: false,
            message: 'This Backoffice Management already exists'
        });
    }

    //create cart item
    const newBackofficeManagement = new BackofficeManagement({
        backofficeName,
        lastUpdated,
        updateType,
        productType,
        dataFile
    });

    //save item into the cart
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

//Retrieve all the items in the cart
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

//Update items in the cart
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

//Delete items in the cart
const deleteBackofficeManagement = asyncHandler(async (req, res)  => {
    const backofficeManagement = await BackofficeManagement.findById(req.params.id);

    if (!backofficeManagement) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await backofficeManagement.remove();
        
        res.status(200).json({
            success: true,
            message: 'Backoffice Management deleted successfully'
        });
    }
});

//Remove all the items in the cart
const deleteAll = asyncHandler(async (req, res) => {
    const backofficeManagement = await BackofficeManagement.remove();

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