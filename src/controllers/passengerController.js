const Passenger = require('../models/passengerModel');
const { broadcast } = require('../../websocket');

exports.requestPickup = async (req, res) => {
    const { currentLocation, destination } = req.body;
    try {
        const newRequest = new Passenger({
            user: req.user.id,
            currentLocation,
            destination
        });
        await newRequest.save();
        res.json(newRequest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    broadcast({
        type: 'new_pickup_request',
        data: {
            passengerId: req.user.id,
            currentLocation,
            destination
        }
    });

    res.status(200).json({ msg: 'Pickup request sent' });
};

exports.getRequests = async (req, res) => {
    try {
        const requests = await Passenger.find({ user: req.user.id }).populate('driver', 'name');
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
