const express = require('express');
const router = express.Router();
const { Booking } = require('../db');
const { Op } = require('sequelize');
const { authMiddleware } = require('./auth');

// GET /api/bookings — get all bookings (admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { status } = req.query;
        const where = status && status !== 'all' ? { status } : {};
        const bookings = await Booking.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/bookings — create a booking (public)
router.post('/', async (req, res) => {
    try {
        const { roomId, roomName, userName, userEmail, userPhone, checkIn, checkOut, guests, notes } = req.body;
        if (!roomId || !roomName || !userName || !userEmail || !userPhone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const booking = await Booking.create({
            roomId, roomName, userName, userEmail, userPhone,
            checkIn: checkIn || null,
            checkOut: checkOut || null,
            guests: guests || 1,
            notes: notes || '',
            status: 'pending',
        });
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/bookings/:id — update a booking (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        await booking.update(req.body);
        res.json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/bookings/:id/confirm — confirm a booking (admin only)
router.put('/:id/confirm', authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        await booking.update({ status: 'confirmed' });
        res.json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/bookings/:id/cancel — cancel a booking (admin only)
router.put('/:id/cancel', authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        await booking.update({ status: 'cancelled' });
        res.json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/bookings/:id — delete a booking (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        await booking.destroy();
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
