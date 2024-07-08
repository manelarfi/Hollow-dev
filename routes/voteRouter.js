const express = require('express')
const router = express.Router();

router.post('vote', (req,res) => {
    res.status(200).json("vote done")
});

