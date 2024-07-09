const express = require('express')
const router = express.Router();
const { getVote , makeNewVote} = require('../controllers/votingControllers')
const validateToken = require('../middlewares/validateTokenHandler')

router.use(validateToken)
router.post('/vote', makeNewVote);
router.get('/myvote', getVote)

module.exports = router