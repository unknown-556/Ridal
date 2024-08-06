const mongoose = require('mongoose');
const os = require('os');
const User = require('../models/userModel');
const Log = require('../models/logModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.monitorSystem = (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const memoryUsage = process.memoryUsage();
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const cpuLoad = os.loadavg();

    res.json({
        status: 'System is running smoothly',
        database: dbStatus,
        uptime: `${hours}h ${minutes}m ${seconds}s`,
        memoryUsage: {
            rss: memoryUsage.rss,
            heapTotal: memoryUsage.heapTotal,
            heapUsed: memoryUsage.heapUsed,
            external: memoryUsage.external,
            freeMemory,
            totalMemory
        },
        cpuLoad
    });
};
