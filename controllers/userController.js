const User = require('../models/user');
const asyncHandler = require('express-async-handler');

//Add user
const addUser = asyncHandler(async (req, res) => {
    const { username, password, role } = req.body;

    //Validations
    if(!username || !password || !role) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if user already exists
    const user = await User.findOne({ username });

    //if user exists
    if (user) {
        return res.status(400).json({
            success: false,
            message: 'This user already exists'
        });
    }

    //create user
    const newUser = new User({
        username,
        password,
        role
    });

    //save user
    await newUser.save();

    if (newUser) {
        res.status(201).json({
            success: true,
            data: newUser
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'User not added'
        });
        throw new Error('User not added');
    }
});

//Get User by Id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.status(200).json({
            success: true,
            data: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
});

//Retrieve all the users
const getUser = asyncHandler(async (req, res) => {
    const user = await User.find();

    if (user) {
        res.status(200).json({
            success: true,
            data: user
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No users found'
        });
        throw new Error('No users found');
    }
});

//Update user
const editUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'No users found'
        });
    } else {
        const { username, password, role } = req.body;

        user.username = username;
        user.password = password;
        user.role= role;

        await user.save();

        res.status(200).json({
            success: true,
            data: user
        });
    }
});

//Delete user by Id
const deleteUser = asyncHandler(async (req, res)  => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await user.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    }
});

//Remove all the users
const deleteAll = asyncHandler(async (req, res) => {
    const user = await User.deleteMany();

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'Users deleted successfully'
        });
    }
});

module.exports = {
    addUser,
    getUserById,
    getUser,
    editUser,
    deleteUser,
    deleteAll
};