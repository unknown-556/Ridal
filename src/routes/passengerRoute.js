
const express = require('express');
const router = express.Router();
const { requestPickup, getRequests } = require('../controllers/passengerController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/request', auth, role(['passenger']), requestPickup);
router.get('/requests', auth, role(['passenger']), getRequests);

module.exports = router;

