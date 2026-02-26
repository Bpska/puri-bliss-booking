const express = require('express');
const router = express.Router();
const { Offer } = require('../db');
const { authMiddleware } = require('./auth');

// GET /api/offers — all offers (public)
router.get('/', async (req, res) => {
    try {
        const offers = await Offer.findAll({ order: [['createdAt', 'ASC']] });
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/offers/active — only active offers (public, for banner)
router.get('/active', async (req, res) => {
    try {
        const offers = await Offer.findAll({ where: { active: true }, order: [['createdAt', 'ASC']] });
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/offers — add new offer (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) return res.status(400).json({ error: 'Offer text is required' });
        const offer = await Offer.create({ text: text.trim(), active: true });
        res.status(201).json(offer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/offers/:id — toggle or update offer (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const offer = await Offer.findByPk(req.params.id);
        if (!offer) return res.status(404).json({ error: 'Offer not found' });
        await offer.update(req.body);
        res.json(offer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/offers/:id — delete offer (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const offer = await Offer.findByPk(req.params.id);
        if (!offer) return res.status(404).json({ error: 'Offer not found' });
        await offer.destroy();
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
