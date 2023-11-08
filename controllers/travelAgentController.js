const TravelAgent = require('../models/travelAgent');
const asyncHandler = require('express-async-handler');

//Add travel agent
const addTravelAgent = asyncHandler(async (req, res) => {
    const { name, contactInfo, location } = req.body;

    //Validations
    if(!name || !contactInfo || !location) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if travel agent already exists
    const travelAgent = await TravelAgent.findOne({ name });

    //if travel agent exists
    if (travelAgent) {
        return res.status(400).json({
            success: false,
            message: 'This agent already exists'
        });
    }

    //create travel agent
    const newTravelAgent = new TravelAgent({
        name,
        contactInfo,
        location
    });

    //save travel agent
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

//Get travel agent by Id
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

//Retrieve all the travel agents
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

//Update travel agent
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

//Delete travel agent by Id
const deleteTravelAgent = asyncHandler(async (req, res)  => {
    const travelAgent = await TravelAgent.findById(req.params.id);

    if (!travelAgent) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await travelAgent.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Agent deleted successfully'
        });
    }
});

//Remove all the travel agents
const deleteAll = asyncHandler(async (req, res) => {
    const travelAgent = await TravelAgent.deleteMany();

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