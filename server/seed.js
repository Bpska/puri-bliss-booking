const { Room } = require('./db');

// Default rooms from the frontend constants (without image imports, storing paths as strings)
const DEFAULT_ROOMS = [
    {
        roomId: 1, name: 'Deluxe AC With BreakFast', type: 'Deluxe', tag: 'Best Value',
        price: 4941, rating: 4.8, reviews: 318,
        features: ['Double Bed', 'Air Conditioning', 'City View', '130 sq.ft', 'Attached Bath', 'Geyser', 'Complimentary Breakfast'],
        desc: 'A comfortable Deluxe Double Bed AC Room with city views and complimentary breakfast. 130 sq.ft of well-appointed space with modern amenities near Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
        images: [],
        includes: ['Breakfast', 'Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 2, name: 'Deluxe AC', type: 'Deluxe', tag: null,
        price: 4160, rating: 4.7, reviews: 290,
        features: ['Double Bed', 'Air Conditioning', 'City View', '130 sq.ft', 'Attached Bath', 'Geyser'],
        desc: 'A comfortable Deluxe Double Bed AC Room with city views. 130 sq.ft of well-appointed space with modern amenities near Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
        images: [],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 3, name: 'AC Room with BreakFast', type: 'AC Room', tag: null,
        price: 3381, rating: 4.6, reviews: 210,
        features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi', 'Geyser', 'Complimentary Breakfast'],
        desc: 'Ideal for solo travelers and couples. Clean, affordable AC room near Jagannath Temple with complimentary breakfast, attached bath with geyser, and free WiFi.',
        gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
        images: [],
        includes: ['Breakfast', 'Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 4, name: 'AC Room', type: 'AC Room', tag: null,
        price: 2600, rating: 4.5, reviews: 180,
        features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi', 'Geyser'],
        desc: 'Ideal for solo travelers and couples. Clean, affordable and well-located near Jagannath Temple. Equipped with AC, attached bath with geyser, and free WiFi.',
        gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
        images: [],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 5, name: 'Non-AC with BreakFast', type: 'Non-AC', tag: null,
        price: 1821, rating: 4.5, reviews: 165,
        features: ['Double Bed', 'Ceiling Fan', 'Attached Bath', 'Budget Friendly', 'Geyser', 'Complimentary Breakfast'],
        desc: 'Perfect for budget pilgrims. Clean, safe and simple stay with complimentary breakfast. Located just 100 meters from Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
        images: [],
        includes: ['Breakfast', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
        isCustom: false,
    },
    {
        roomId: 6, name: 'Non-AC', type: 'Non-AC', tag: 'Most Affordable',
        price: 1300, rating: 4.4, reviews: 140,
        features: ['Double Bed', 'Ceiling Fan', 'Attached Bath', 'Budget Friendly', 'Geyser'],
        desc: 'Perfect for budget pilgrims. Clean, safe and simple stay at the most affordable price in Puri. Located just 100 meters from Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
        images: [],
        includes: ['Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
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
