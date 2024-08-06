const express = require('express');
const authRoutes = require('./authRoute');
const passengerRoutes = require('./passengerRoute');
const driverRoutes = require('./driverRoute');
const adminRoutes = require('./adminRoute');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/passenger', passengerRoutes);
router.use('/driver', driverRoutes);
router.use('/admin', adminRoutes)

module.exports = router;
