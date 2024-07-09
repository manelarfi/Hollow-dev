const mongoose = require('mongoose')


const voteSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true],
        ref: "User"
    },
    idCandidate: {
        type: Number,
        require: [true]
    }
}, {
    timestaps: true,
})

module.exports = mongoose.model("Vote", voteSchema)