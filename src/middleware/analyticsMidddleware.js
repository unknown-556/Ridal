
const Log = require('../models/logModel');

const analyticsMiddleware = async (req, res, next) => {
    const log = new Log({
        method: req.method,
        url: req.url,
        status: res.statusCode,
        user: req.user ? req.user.id : null
    });
    await log.save();
    next();
};

module.exports = analyticsMiddleware;
