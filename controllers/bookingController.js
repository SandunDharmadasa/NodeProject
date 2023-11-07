const Booking = require('../models/booking');
const asyncHandler = require('express-async-handler');

//Add Items to the cart
const addBooking = asyncHandler(async (req, res) => {
    const { participantsCount, dateBooked, paymentStatus } = req.body;

    //Validations
    if(!participantsCount || !dateBooked || !paymentStatus) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //create cart item
    const newBooking = new Booking({
        participantsCount,
        dateBooked,
        paymentStatus
    });

    //save item into the cart
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

//Retrieve all the items in the cart
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

//Update items in the cart
const editBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.status(400).json({
            success: false,
            message: 'No booking found'
        });
    } else {
        const { participantsCount, dateBooked, paymentStatus } = req.body;

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

//Delete items in the cart
const deleteBooking = asyncHandler(async (req, res)  => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await booking.remove();
        
        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });
    }
});

//Remove all the items in the cart
const deleteAll = asyncHandler(async (req, res) => {
    const booking = await Booking.remove();

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