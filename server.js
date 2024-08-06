const express = require('express');
const connectDB = require('./src/config/db');
const routes = require('./src/routes/index');
const errorHandler = require('./src/middleware/errorHandler');
const rateLimiter = require('./src/middleware/rateLimiter');
const { initWebSocket } = require('./websocket');
const analyticsMiddleware = require('./src/middleware/analyticsMidddleware');
require('dotenv').config();

const app = express();
connectDB();

app.use(rateLimiter);
app.use(analyticsMiddleware);

app.use(express.json({ extended: false }));
app.use('/api', routes);

app.use(errorHandler);

const wss = initWebSocket(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




app.get("/", (req,res) => {
   res.send('RIDAL IS RUNNING')
})