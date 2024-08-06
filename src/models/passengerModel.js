const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentLocation: {
        type: { type: String },
        coordinates: [Number]
    },
    destination: {
        type: { type: String },
        coordinates: [Number]
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed'],
        default: 'pending'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

PassengerSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Passenger', PassengerSchema);
