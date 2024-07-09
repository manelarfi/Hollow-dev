const mongoose = require('mongoose');

// accType => 0 admin,
//            1 normal user
//            2 candidate

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please add the username"]
    },
    email: {
        type: String,
        require: [true, "Please add the user email adresse"],
        unique: [true, "Email adresse already exist"]
    },
    password: {
        type: String,
        require: [true, "please add the user password"]
    },
    accType: {
        type: Number,
        require: [true]
    }
},
    {
        timestaps: true,
    });

module.exports = mongoose.model("User", userSchema)