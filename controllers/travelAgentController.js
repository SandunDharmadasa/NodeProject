const TravelAgent = require('../models/travelAgent');
const asyncHandler = require('express-async-handler');

//Add Items to the cart
const addTravelAgent = asyncHandler(async (req, res) => {
    const { name, contactInfo, location } = req.body;

    //Validations
    if(!name || !contactInfo || !location) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if item already exists in the cart
    const travelAgent = await TravelAgent.findOne({ name });

    //if item exists in the cart
    if (travelAgent) {
        return res.status(400).json({
            success: false,
            message: 'This agent already exists'
        });
    }

    //create cart item
    const newTravelAgent = new TravelAgent({
        name,
        contactInfo,
        location
    });

    //save item into the cart
    await newTravelAgent.save();

    if (newTravelAgent) {
        res.status(201).json({
            success: true,
            data: newTravelAgent
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Agent not added'
        });
        throw new Error('Agent not added');
    }
});

//Get User by Id
const getTravelAgentById = asyncHandler(async (req, res) => {
    const travelAgent = await TravelAgent.findById(req.params.id);

    if (travelAgent) {
        res.status(200).json({
            success: true,
            data: travelAgent
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Travel agent not found'
        });
    }
});

//Retrieve all the items in the cart
const getTravelAgent = asyncHandler(async (req, res) => {
    const travelAgent = await TravelAgent.find();

    if (travelAgent) {
        res.status(200).json({
            success: true,
            data: travelAgent
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No agents found'
        });
        throw new Error('No agents found');
    }
});

//Update items in the cart
const editTravelAgent = asyncHandler(async (req, res) => {
    const travelAgent = await TravelAgent.findById(req.params.id);

    if (!travelAgent) {
        return res.status(400).json({
            success: false,
            message: 'No agents found'
        });
    } else {
        const { name, contactInfo, location } = req.body;

        travelAgent.name = name;
        travelAgent.contactInfo = contactInfo;
        travelAgent.location = location;

        await travelAgent.save();

        res.status(200).json({
            success: true,
            data: travelAgent
        });
    }
});

//Delete items in the cart
const deleteTravelAgent = asyncHandler(async (req, res)  => {
    const travelAgent = await TravelAgent.findById(req.params.id);

    if (!travelAgent) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await travelAgent.remove();
        
        res.status(200).json({
            success: true,
            message: 'Agent deleted successfully'
        });
    }
});

//Remove all the items in the cart
const deleteAll = asyncHandler(async (req, res) => {
    const travelAgent = await TravelAgent.remove();

    if (!travelAgent) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Travel Agents deleted successfully'
        });
    }
});

module.exports = {
    addTravelAgent,
    getTravelAgentById,
    getTravelAgent,
    editTravelAgent,
    deleteTravelAgent,
    deleteAll
};