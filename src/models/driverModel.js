const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    }
});

DriverSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Driver', DriverSchema);
