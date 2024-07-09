const User = require('../models/user');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

//@desc Register user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if all fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }
    
    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(409).json({ message: "User already exists" }); // Changed to 409 for conflict
    }

    const usernameAvailable = await User.findOne({ username });
    if(usernameAvailable) {
        return res.status(404).json({message : "choose another username"})
    }
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            accType: 0,
        });
        
        console.log(`User Created ${user}`);
        
        // Respond with the new user's id and email
        if (user) {
            return res.status(201).json({ _id: user._id, email: user.email });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "User data not valid" }); // Changed to 500 for server error
    }
});

//@desc login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || ! password) {
        return res.status(400).json({ message : "All fields are mendatory"})
    }

    const user = await User.findOne({email})
    if(user) {
        if(await bcrypt.compare(password, user.password)) {
            const accessToken = await jwt.sign(
                { user: { username: user.username, email: user.email, id: user.id } },
                process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "120m" }
            )
            res.status(200).json(accessToken)
        } else {
            res.status(400).json({ message : "email or password is not valid"})
        }
    } else {
        res.status(400).json({ message : "user does not exist"})
    }
});

//@desc current user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})




module.exports = { registerUser, loginUser, currentUser};
