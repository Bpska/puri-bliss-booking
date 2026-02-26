const { Room } = require('./db');

// Default rooms from the frontend constants (without image imports, storing paths as strings)
const DEFAULT_ROOMS = [
    {
        roomId: 1, name: 'Deluxe AC Room', type: 'Deluxe', tag: null,
        price: 3660, rating: 4.7, reviews: 318,
        features: ['Double Bed', 'Air Conditioning', 'City View', '130 sq.ft', 'Attached Bath', 'Geyser'],
        desc: 'A comfortable Deluxe Double Bed AC Room with city views, offering a peaceful stay just 100 meters from the Jagannath Temple. 130 sq.ft of well-appointed space with modern amenities.',
        gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
        images: [],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 2, name: 'Standard AC Room', type: 'Standard', tag: null,
        price: 2500, rating: 4.6, reviews: 210,
        features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi', 'Geyser'],
        desc: 'Ideal for solo travelers and couples. Clean, affordable and well-located near Jagannath Temple. Equipped with AC, attached bath with geyser, and free WiFi.',
        gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
        images: [],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 3, name: 'Economy Non-AC Room', type: 'Economy', tag: null,
        price: 1200, rating: 4.5, reviews: 165,
        features: ['Single Bed', 'Ceiling Fan', 'Attached Bath', 'Budget Friendly', 'Geyser'],
        desc: 'Perfect for budget pilgrims. Clean, safe and simple stay at the most affordable price in Puri. Located just 100 meters from Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
        images: [],
        includes: ['Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 4, name: 'Family Suite', type: 'Suite', tag: 'Most Popular',
        price: 5500, rating: 4.8, reviews: 95,
        features: ['2 Double Beds', 'Air Conditioning', 'Private Bathroom', 'WiFi TV', 'Free WiFi', 'Seating Area', 'Geyser'],
        desc: 'Spacious suite perfect for families visiting for Jagannath Darshan. Two beds, private bath with geyser and seating area. 24-hour room service available.',
        gradient: 'linear-gradient(135deg,#1A0A20,#5A1A60,#A030B0)',
        images: [],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service', 'Extra Bed on Request'],
        isCustom: false,
    },
];

async function seedDefaultRooms() {
    try {
        for (const room of DEFAULT_ROOMS) {
            const exists = await Room.findOne({ where: { roomId: room.roomId } });
            if (!exists) {
                await Room.create(room);
                console.log(`✅ Seeded room: ${room.name}`);
            }
        }
        console.log('🌱 Room seeding complete');
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
    }
}

module.exports = { seedDefaultRooms };
