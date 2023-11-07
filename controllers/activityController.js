const Activity = require('../models/activity');
const asyncHandler = require('express-async-handler');

//Add Items to the cart
const addActivity = asyncHandler(async (req, res) => {
    const { name, destination, date, type, starRating, price, ageRestriction } = req.body;

    //Validations
    if(!name || !destination || !date || !type || !starRating || !price || !ageRestriction) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if item already exists in the cart
    const activity = await Activity.findOne({ name });

    //if item exists in the cart
    if (activity) {
        return res.status(400).json({
            success: false,
            message: 'This activity already exists'
        });
    }

    //create cart item
    const newActivity = new Activity({
        name,
        destination,
        date,
        type,
        starRating,
        price,
        ageRestriction
    });

    //save item into the cart
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

//Retrieve all the items in the cart
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

//Update items in the cart
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

//Delete items in the cart
const deleteActivity = asyncHandler(async (req, res)  => {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await activity.remove();
        
        res.status(200).json({
            success: true,
            message: 'Activity deleted successfully'
        });
    }
});

//Remove all the items in the cart
const deleteAll = asyncHandler(async (req, res) => {
    const activity = await Activity.remove();

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