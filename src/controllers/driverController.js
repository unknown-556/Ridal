const Driver = require('../models/driverModel');
const Passenger = require('../models/passengerModel');

exports.updateLocation = async (req, res) => {
    const { location } = req.body;
    try {
        const driver = await Driver.findOneAndUpdate(
            { user: req.user.id },
            { location },
            { new: true }
        );
        res.json(driver);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getNearbyRequests = async (req, res) => {
    try {
        const driver = await Driver.findOne({ user: req.user.id });
        if (!driver) {
            return res.status(404).json({ msg: 'Driver not found' });
        }
        const requests = await Passenger.find({
            currentLocation: {
                $near: {
                    $geometry: driver.location,
                    $maxDistance: 5000 
                }
            },
            status: 'pending'
        }).populate('user', 'name');
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.acceptRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const request = await Passenger.findByIdAndUpdate(
            requestId,
            { status: 'accepted', driver: req.user.id },
            { new: true }
        );
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
