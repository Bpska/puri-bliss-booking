const express = require('express');
const router = express.Router();
const { Setting } = require('../db');
const { authMiddleware } = require('./auth');

// GET /api/settings — get all settings (public, for frontend)
router.get('/', async (req, res) => {
    try {
        const rows = await Setting.findAll();
        const settings = {};
        rows.forEach(row => { settings[row.key] = row.value; });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/settings — update one or more settings (admin only)
router.put('/', authMiddleware, async (req, res) => {
    try {
        const entries = Object.entries(req.body);
        await Promise.all(entries.map(([key, value]) =>
            Setting.upsert({ key, value })
        ));
        const rows = await Setting.findAll();
        const settings = {};
        rows.forEach(row => { settings[row.key] = row.value; });
        res.json(settings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /api/settings/visit — increment visitor count (public)
router.post('/visit', async (req, res) => {
    try {
        const [setting, created] = await Setting.findOrCreate({
            where: { key: 'visitor_count' },
            defaults: { value: 0 }
        });
        const currentCount = parseInt(setting.value) || 0;
        setting.value = currentCount + 1;
        await setting.save();
        res.json({ visitor_count: setting.value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
