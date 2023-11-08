const Activity = require('../models/activity');
const asyncHandler = require('express-async-handler');

//Add activity
const addActivity = asyncHandler(async (req, res) => {
    const { name, destination, date, type, starRating, price, ageRestriction } = req.body;

    //Validations
    if(!name || !destination || !date || !type || !starRating || !price || !ageRestriction) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if activity already exists
    const activity = await Activity.findOne({ name });

    //if activity exists
    if (activity) {
        return res.status(400).json({
            success: false,
            message: 'This activity already exists'
        });
    }

    //create activity
    const newActivity = new Activity({
        name,
        destination,
        date,
        type,
        starRating,
        price,
        ageRestriction
    });

    //save activity
    await newActivity.save();

    if (newActivity) {
        res.status(201).json({
            success: true,
            data: newActivity
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Activity not added'
        });
        throw new Error('Activity not added');
    }
});

//Retrieve all the activities
const getActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.find();

    if (activity) {
        res.status(200).json({
            success: true,
            data: activity
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No activities found'
        });
        throw new Error('No activities found');
    }
});

//Update activity
const editActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
        return res.status(400).json({
            success: false,
            message: 'No activities found'
        });
    } else {
        const { name, destination, date, type, starRating, price, ageRestriction } = req.body;

        activity.name = name;
        activity.destination = destination;
        activity.date = date;
        activity.type = type;
        activity.starRating = starRating;
        activity.price = price;
        activity.ageRestriction = ageRestriction;

        await activity.save();

        res.status(200).json({
            success: true,
            data: activity
        });
    }
});

//Delete activity by Id
const deleteActivity = asyncHandler(async (req, res)  => {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await activity.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Activity deleted successfully'
        });
    }
});

//Remove all the activities
const deleteAll = asyncHandler(async (req, res) => {
    const activity = await Activity.deleteMany();

    if (!activity) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Activities deleted successfully'
        });
    }
});


module.exports = {
    addActivity,
    getActivity,
    editActivity,
    deleteActivity,
    deleteAll
};