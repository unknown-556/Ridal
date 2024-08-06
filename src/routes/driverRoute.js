
const express = require('express');
const router = express.Router();
const { updateLocation, getNearbyRequests, acceptRequest } = require('../controllers/driverController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/location', auth, role(['driver']), updateLocation);
router.get('/requests', auth, role(['driver']), getNearbyRequests);
router.post('/accept', auth, role(['driver']), acceptRequest);

module.exports = router;
