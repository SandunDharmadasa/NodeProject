const Holiday = require('../models/holiday');
const asyncHandler = require('express-async-handler');

//Add holiday package
const addHoliday = asyncHandler(async (req, res) => {
    const { name, destination, duration, specialty , price, packageRating } = req.body;

    //Validations
    if(!name || !destination || !duration || !specialty || !price || !packageRating) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if holiday package already exists
    const holiday = await Holiday.findOne({ name });

    //if item exists in the cart
    if (holiday) {
        return res.status(400).json({
            success: false,
            message: 'This holiday package already exists'
        });
    }

    //create holiday package
    const newHoliday = new Holiday({
        name,
        destination,
        duration,
        specialty,
        price,
        packageRating
    });

    //save holiday package
    await newHoliday.save();

    if (newHoliday) {
        res.status(201).json({
            success: true,
            data: newHoliday
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Holiday package not added'
        });
        throw new Error('Holiday package not added');
    }
});

//Retrieve all the holiday packages
const getHoliday = asyncHandler(async (req, res) => {
    const holiday = await Holiday.find();

    if (holiday) {
        res.status(200).json({
            success: true,
            data: holiday
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No holiday packages found'
        });
        throw new Error('No holiday packages found');
    }
});

//Update holiday package
const editHoliday = asyncHandler(async (req, res) => {
    const holiday = await Holiday.findById(req.params.id);

    if (!holiday) {
        return res.status(400).json({
            success: false,
            message: 'No holiday packages found'
        });
    } else {
        const { name, destination, duration, specialty, price, packageRating } = req.body;

        holiday.name = name;
        holiday.destination = destination;
        holiday.duration = duration;
        holiday.specialty = specialty;
        holiday.price = price;
        holiday.packageRating = packageRating;

        await holiday.save();

        res.status(200).json({
            success: true,
            data: holiday
        });
    }
});

//Delete holiday package by Id
const deleteHoliday = asyncHandler(async (req, res)  => {
    const holiday = await Holiday.findById(req.params.id);

    if (!holiday) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await holiday.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Holiday package deleted successfully'
        });
    }
});

//Remove all the holiday packages
const deleteAll = asyncHandler(async (req, res) => {
    const holiday = await Holiday.deleteMany();

    if (!holiday) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Holiday packages deleted successfully'
        });
    }
});


module.exports = {
    addHoliday,
    getHoliday,
    editHoliday,
    deleteHoliday,
    deleteAll
};