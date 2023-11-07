const CruiseBooking = require('../models/cruiseBooking');
const asyncHandler = require('express-async-handler');

//Add Items to the cart
const addCruiseBooking = asyncHandler(async (req, res) => {
    const { mealPreference, cabinSelection, dateBooked, paymentStatus } = req.body;

    //Validations
    if(!mealPreference || !cabinSelection || !dateBooked || !paymentStatus) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //create cart item
    const newCruiseBooking = new CruiseBooking({
        mealPreference,
        cabinSelection,
        dateBooked,
        paymentStatus
    });

    //save item into the cart
    await newCruiseBooking.save();

    if (newCruiseBooking) {
        res.status(201).json({
            success: true,
            data: newCruiseBooking
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Cruise Booking not added'
        });
        throw new Error('Cruise Booking not added');
    }
});

//Retrieve all the items in the cart
const getCruiseBooking = asyncHandler(async (req, res) => {
    const cruiseBooking = await CruiseBooking.find();

    if (cruiseBooking) {
        res.status(200).json({
            success: true,
            data: cruiseBooking
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No cruise bookings found'
        });
        throw new Error('No cruise bookings found');
    }
});

//Update items in the cart
const editCruiseBooking = asyncHandler(async (req, res) => {
    const cruiseBooking = await CruiseBooking.findById(req.params.id);

    if (!cruiseBooking) {
        return res.status(400).json({
            success: false,
            message: 'No cruise bookingss found'
        });
    } else {
        const { mealPreference, cabinSelection, dateBooked, paymentStatus } = req.body;

        cruiseBooking.mealPreference = mealPreference;
        cruiseBooking.cabinSelection = cabinSelection;
        cruiseBooking.dateBooked = dateBooked;
        cruiseBooking.paymentStatus = paymentStatus;

        await cruiseBooking.save();

        res.status(200).json({
            success: true,
            data: cruiseBooking
        });
    }
});

//Delete items in the cart
const deleteCruiseBooking = asyncHandler(async (req, res)  => {
    const cruiseBooking = await CruiseBooking.findById(req.params.id);

    if (!cruiseBooking) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await cruiseBooking.remove();
        
        res.status(200).json({
            success: true,
            message: 'Cruise booking deleted successfully'
        });
    }
});

//Remove all the items in the cart
const deleteAll = asyncHandler(async (req, res) => {
    const cruiseBooking = await CruiseBooking.remove();

    if (!cruiseBooking) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Cruise bookings deleted successfully'
        });
    }
});

module.exports = {
    addCruiseBooking,
    getCruiseBooking,
    editCruiseBooking,
    deleteCruiseBooking,
    deleteAll
};