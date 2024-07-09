const Vote = require('../models/vote')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

//@desc check vote 
//@route POST /api/votes/myvote
//@access private
const getVote = asyncHandler(async (req, res) => {
    const vote = await Vote.find({ user_id : req.user.id})
    if(!vote) {
        res.status(404)
    } else {
        res.status(200).json(vote)
    }
})

//@desc check vote 
//@route POST /api/votes/myvote
//@access private
const makeNewVote = async (req, res) => {
    const user_id = req.user._id
    if(user_id) {
        return res.status(404).json({ message : "you already voted"})
    }

    const {username} = req.body
    if(!username) {
        return res.status(404).json({ message : "enter the candidate"})
    }

    const candidate = await User.findOne({ username })
    if(!candidate) {
        return res.status(404).json({message : "candidate does not exist"})
    } else if (candidate.type != 2) {
        return res.status(404).json({message : "candidate does not exist"})
    }

    const newVote = await Vote.create({
        user_id,
        idCandidate : candidate._id
    })

    console.log(`vote : ${candidate}`)
    if(!newVote) {
        return res.status(500).json({ message : "vote failed"})
    }
    res.status(201).json({ message : `vote validated for ${candidate.username}`})
}

module.exports = {getVote, makeNewVote}
   