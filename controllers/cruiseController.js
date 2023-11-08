const Cruise = require('../models/cruise');
const asyncHandler = require('express-async-handler');

//Add cruise
const addCruise = asyncHandler(async (req, res) => {
    const { name, departureDestination, arrivalDestination, departureDate, arrivalDate, deck, cabin, price, duration, provider } = req.body;

    //Validations
    if(!name || !departureDestination || !arrivalDestination || !departureDate || !arrivalDate || !deck || !cabin || !price || !duration || !provider) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if cruise already exists
    const cruise = await Cruise.findOne({ name });

    //if cruise exists
    if (cruise) {
        return res.status(400).json({
            success: false,
            message: 'This crise already exists'
        });
    }

    //create cruise
    const newCruise = new Cruise({
        name,
        departureDestination,
        arrivalDestination,
        departureDate,
        arrivalDate,
        deck,
        cabin,
        price,
        duration,
        provider
    });

    //save cruise
    await newCruise.save();

    if (newCruise) {
        res.status(201).json({
            success: true,
            data: newCruise
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Cruise not added'
        });
        throw new Error('Cruise not added');
    }
});

//Retrieve all the cruises
const getCruise = asyncHandler(async (req, res) => {
    const cruise = await Cruise.find();

    if (cruise) {
        res.status(200).json({
            success: true,
            data: cruise
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No items found'
        });
        throw new Error('No items found');
    }
});

//Update cruise
const editCruise = asyncHandler(async (req, res) => {
    const cruise = await Cruise.findById(req.params.id);

    if (!cruise) {
        return res.status(400).json({
            success: false,
            message: 'No items found'
        });
    } else {
        const { name, departureDestination, arrivalDestination, departureDate, arrivalDate, deck, cabin, price, duration, provider } = req.body;

        cruise.name = name;
        cruise.departureDestination = departureDestination;
        cruise.arrivalDestination = arrivalDestination;
        cruise.departureDate = departureDate;
        cruise.arrivalDate = arrivalDate;
        cruise.deck = deck;
        cruise.cabin = cabin;
        cruise.price = price;
        cruise.duration = duration;
        cruise.provider = provider;

        await cruise.save();

        res.status(200).json({
            success: true,
            data: cruise
        });
    }
});

//Delete cruise by Id
const deleteCruise = asyncHandler(async (req, res)  => {
    const cruise = await Cruise.findById(req.params.id);

    if (!cruise) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await cruise.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Cruise deleted successfully'
        });
    }
});

//Remove all the cruises
const deleteAll = asyncHandler(async (req, res) => {
    const cruise = await Cruise.deleteMany();

    if (!cruise) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Cruises deleted successfully'
        });
    }
});


module.exports = {
    addCruise,
    getCruise,
    editCruise,
    deleteCruise,
    deleteAll
};