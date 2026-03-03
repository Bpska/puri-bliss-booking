const express = require('express');
const router = express.Router();
const { Room } = require('../db');
const { authMiddleware } = require('./auth');

// GET /api/rooms — get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.findAll({ order: [['roomId', 'ASC']] });
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/rooms — add a custom room (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { roomId, name, type, tag, price, features, desc, gradient, images, includes } = req.body;
        const room = await Room.create({
            roomId, name, type, tag: tag || null, price,
            features: features || [],
            desc,
            gradient: gradient || 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
            images: images || [],
            includes: includes || ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
            isCustom: true,
        });
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/rooms/:id — update price override (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const room = await Room.findOne({ where: { roomId: req.params.id } });
        if (!room) return res.status(404).json({ error: 'Room not found' });
        await room.update(req.body);
        res.json(room);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/rooms/:id — delete a room (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const room = await Room.findOne({ where: { roomId: req.params.id } });
        if (!room) return res.status(404).json({ error: 'Room not found' });
        await room.destroy();
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/rooms/prices/bulk — save multiple price overrides (admin only)
router.put('/prices/bulk', authMiddleware, async (req, res) => {
    try {
        // req.body = { overrides: { roomId: newPrice, ... } }
        const { overrides } = req.body;
        const updates = Object.entries(overrides).map(([id, price]) =>
            Room.update({ priceOverride: Number(price) }, { where: { roomId: Number(id) } })
        );
        await Promise.all(updates);
        res.json({ message: 'Prices updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
