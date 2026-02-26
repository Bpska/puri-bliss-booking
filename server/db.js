const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'hotel_amruta',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
    }
);

// ─── Room Model ───────────────────────────────────────────
const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomId: { type: DataTypes.INTEGER, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    tag: { type: DataTypes.STRING, defaultValue: null },
    price: { type: DataTypes.FLOAT, allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 5.0 },
    reviews: { type: DataTypes.INTEGER, defaultValue: 0 },
    features: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
    desc: { type: DataTypes.TEXT, allowNull: false },
    gradient: { type: DataTypes.STRING },
    images: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
    includes: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
    isCustom: { type: DataTypes.BOOLEAN, defaultValue: false },
    priceOverride: { type: DataTypes.FLOAT, defaultValue: null },
}, { tableName: 'rooms' });

// ─── Booking Model ────────────────────────────────────────
const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    roomName: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, allowNull: false },
    userEmail: { type: DataTypes.STRING, allowNull: false },
    userPhone: { type: DataTypes.STRING, allowNull: false },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending',
    },
    checkIn: { type: DataTypes.STRING },
    checkOut: { type: DataTypes.STRING },
    guests: { type: DataTypes.INTEGER, defaultValue: 1 },
    notes: { type: DataTypes.TEXT, defaultValue: '' },
}, { tableName: 'bookings' });

// ─── Offer Model ──────────────────────────────────────────
const Offer = sequelize.define('Offer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'offers' });

// ─── Settings Model ───────────────────────────────────────
const Setting = sequelize.define('Setting', {
    key: { type: DataTypes.STRING, primaryKey: true },
    value: { type: DataTypes.JSONB },
}, { tableName: 'settings', timestamps: false });

// ─── Sync DB ──────────────────────────────────────────────
async function syncDB() {
    await sequelize.sync({ alter: true });
    console.log('✅ PostgreSQL tables synchronized');

    // Seed default settings if not present
    await Setting.findOrCreate({ where: { key: 'rooms_full' }, defaults: { value: false } });
    await Setting.findOrCreate({ where: { key: 'total_rooms' }, defaults: { value: 12 } });
    await Setting.findOrCreate({ where: { key: 'full_rooms' }, defaults: { value: 0 } });
}

module.exports = { sequelize, Room, Booking, Offer, Setting, syncDB };
