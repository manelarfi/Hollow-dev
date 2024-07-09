const express = require('express')
const router = express.Router();
const {makeUserCandidate, deleteCandidate} = require('../controllers/CandidateControlleur');
const validateToken = require('../middlewares/validateTokenHandler');

router.use(validateToken)
router.put('/addCandidate', makeUserCandidate)
router.put('/deleteCandidate', deleteCandidate)

module.exports = router