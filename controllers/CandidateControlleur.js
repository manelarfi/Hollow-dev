const User = require('../models/user');
const asyncHandler = require('express-async-handler');

//@desc Make user a candidate
//@route PUT /api/candidates/addCandidate
//@access Private
const makeUserCandidate = asyncHandler(async (req, res) => {
    const { username: adminUsername } = req.user;

    const admin = await User.findOne({ username: adminUsername });
    if (!admin) {
        return res.status(400).json({ message: "Admin user not found" });
    }

    if (admin.accType !== 0) {
        return res.status(400).json({ message: "Not permissible" });
    }

    const { username } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user.accType = 2;
    await user.save();

    res.status(200).json(user);
});

//@desc Delete a candidate
//@route DELETE /api/candidates/deleteCandidate
//@access Private
const deleteCandidate = asyncHandler(async (req, res) => {
    const { username: adminUsername } = req.user;

    const admin = await User.findOne({ username: adminUsername });
    if (!admin) {
        return res.status(400).json({ message: "Admin user not found" });
    }

    if (admin.accType !== 0) {
        return res.status(400).json({ message: "Not permissible" });
    }

    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.accType = 1;
    await user.save();

    res.status(200).json({ message: `Candidate ${username} removed` });
});

module.exports = { makeUserCandidate, deleteCandidate };
