
const express = require('express');
const router = express.Router();
const { getUsers, getLogs, monitorSystem } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.use(auth, role(['admin']));

router.get('/users', getUsers);
router.get('/logs', getLogs);
router.get('/monitor', monitorSystem);

module.exports = router;
