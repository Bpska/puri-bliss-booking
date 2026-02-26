const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { syncDB, Room } = require('./db');
const { router: authRouter } = require('./routes/auth');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');
const offersRouter = require('./routes/offers');
const settingsRouter = require('./routes/settings');
const { seedDefaultRooms } = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ─── Middleware ───────────────────────────────────────────
app.use(cors({
    origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:8080'],
    credentials: true,
}));
app.use(express.json({ limit: '20mb' })); // Allow large base64 images

// ─── Routes ───────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/offers', offersRouter);
app.use('/api/settings', settingsRouter);

// ─── Health Check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Hotel Amruta Bhojana API Running', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ─── Error Handler ────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────────────
async function start() {
    try {
        await syncDB();
        await seedDefaultRooms();
        app.listen(PORT, () => {
            console.log(`🏨 Hotel Amruta Bhojana Backend running on http://localhost:${PORT}`);
            console.log(`📊 Admin Panel API ready`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    }
}

start();
