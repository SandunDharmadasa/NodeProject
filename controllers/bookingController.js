const Booking = require('../models/booking');
const asyncHandler = require('express-async-handler');

//Add booking
const addBooking = asyncHandler(async (req, res) => {
    const { agentId, activityId, packageId, participantsCount, dateBooked, paymentStatus } = req.body;

    //Validations
    if(!agentId || !activityId || !packageId || !participantsCount || !dateBooked || !paymentStatus) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //create booking
    const newBooking = new Booking({
        agentId,
        activityId, 
        packageId,
        participantsCount,
        dateBooked,
        paymentStatus
    });

    //save booking
    await newBooking.save();

    if (newBooking) {
        res.status(201).json({
            success: true,
            data: newBooking
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Booking not added'
        });
        throw new Error('Booking not added');
    }
});

//Retrieve all the bookings
const getBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.find();

    if (booking) {
        res.status(200).json({
            success: true,
            data: booking
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No bookings found'
        });
        throw new Error('No bookings found');
    }
});

//Update booking
const editBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.status(400).json({
            success: false,
            message: 'No booking found'
        });
    } else {
        const { agentId, activityId, packageId, participantsCount, dateBooked, paymentStatus } = req.body;

        booking.agentId = agentId;
        booking.activityId = activityId;
        booking.packageId = packageId;
        booking.participantsCount = participantsCount;
        booking.dateBooked = dateBooked;
        booking.paymentStatus = paymentStatus;

        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    }
});

//Delete booking by Id
const deleteBooking = asyncHandler(async (req, res)  => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await booking.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });
    }
});

//Remove all the bookings
const deleteAll = asyncHandler(async (req, res) => {
    const booking = await Booking.deleteMany();

    if (!booking) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Bookings deleted successfully'
        });
    }
});

module.exports = {
    addBooking,
    getBooking,
    editBooking,
    deleteBooking,
    deleteAll
};