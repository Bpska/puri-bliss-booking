// Hotel logo
export { default as hotelLogo } from '../images/hotel-logo-1.jpg';
export { default as hotelLogoBW } from '../images/hotel-logo-2.jpg';

// Hotel highlight / feature images
export { default as highlightRooftop } from '../images/hotel-highlight-rooftop-garden.jpg';
export { default as highlightExterior1 } from '../images/hotel-highlight-exterior-1.jpg';
export { default as highlightExterior2 } from '../images/hotel-highlight-exterior-2.jpg';
export { default as highlightLobby } from '../images/hotel-highlight-lobby.jpg';

// Hero Slider Images
export { default as hero1 } from '../images/IMG-20260220-WA0006.jpg';
export { default as hero2 } from '../images/IMG-20260220-WA0007.jpg';
export { default as hero3 } from '../images/IMG-20260220-WA0008.jpg';
export { default as hero4 } from '../images/IMG-20260220-WA0009.jpg';
export { default as hero5 } from '../images/hero-night-exterior.jpg';
export { default as hero6 } from '../images/hero-night-sign.png';
export { default as hero7 } from '../images/hero-day-exterior.jpg';

import hero1 from '../images/IMG-20260220-WA0006.jpg';
import hero2 from '../images/IMG-20260220-WA0007.jpg';
import hero3 from '../images/IMG-20260220-WA0008.jpg';
import hero4 from '../images/IMG-20260220-WA0009.jpg';
import hero5 from '../images/hero-night-exterior.jpg';
import hero6 from '../images/hero-night-sign.png';
import hero7 from '../images/hero-day-exterior.jpg';

export const HERO_IMAGES = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];

// Room image imports
import deluxeAc1 from '../images/room-deluxe-ac-1.jpg';
import deluxeAc2 from '../images/room-deluxe-ac-2.jpg';
import deluxeAc3 from '../images/room-deluxe-ac-3.jpg';
import deluxeAc4 from '../images/room-deluxe-ac-4.jpg';
import standardAc1 from '../images/room-standard-ac-1.jpg';
import standardAc2 from '../images/room-standard-ac-2.jpg';
import standardAc3 from '../images/room-standard-ac-3.jpg';
import standardAc4 from '../images/room-standard-ac-4.jpg';
import economyNonAc1 from '../images/room-economy-non-ac-1.jpg';
import economyNonAc2 from '../images/room-economy-non-ac-2.jpg';
import economyNonAc3 from '../images/room-economy-non-ac-3.jpg';
import familySuite1 from '../images/room-family-suite-1.jpg';
import familySuite2 from '../images/room-family-suite-2.jpg';
import familySuite3 from '../images/room-family-suite-3.jpg';
import familySuite4 from '../images/room-family-suite-4.jpg';
import highlightRooftopImg from '../images/hotel-highlight-rooftop-garden.jpg';
import highlightEx1Img from '../images/hotel-highlight-exterior-1.jpg';
import highlightEx2Img from '../images/hotel-highlight-exterior-2.jpg';
import highlightLobbyImg from '../images/hotel-highlight-lobby.jpg';

export interface Room {
    id: number;
    name: string;
    type: string;
    tag: string | null;
    price: number;
    rating: number;
    reviews: number;
    features: string[];
    desc: string;
    gradient: string;
    images: string[];
    includes: string[];
}

export interface Amenity {
    icon: string;
    name: string;
    desc: string;
    color: string;
    bg: string;
}

export const ROOMS: Room[] = [
    {
        id: 1, name: 'Deluxe AC Room', type: 'Deluxe', tag: 'Best Value',
        price: 3660, rating: 4.7, reviews: 318,
        features: ['Double Bed', 'Air Conditioning', 'City View', '130 sq.ft', 'Attached Bath', 'Geyser'],
        desc: 'A comfortable Deluxe Double Bed AC Room with city views, offering a peaceful stay just 100 meters from the Jagannath Temple. 130 sq.ft of well-appointed space with modern amenities.',
        gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
        images: [deluxeAc1, deluxeAc2, deluxeAc3, deluxeAc4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 2, name: 'Standard AC Room', type: 'Standard', tag: null,
        price: 2500, rating: 4.6, reviews: 210,
        features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi', 'Geyser'],
        desc: 'Ideal for solo travelers and couples. Clean, affordable and well-located near Jagannath Temple. Equipped with AC, attached bath with geyser, and free WiFi.',
        gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
        images: [standardAc1, standardAc2, standardAc3, standardAc4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 3, name: 'Economy Non-AC Room', type: 'Economy', tag: null,
        price: 1200, rating: 4.5, reviews: 165,
        features: ['Single Bed', 'Ceiling Fan', 'Attached Bath', 'Budget Friendly', 'Geyser'],
        desc: 'Perfect for budget pilgrims. Clean, safe and simple stay at the most affordable price in Puri. Located just 100 meters from Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
        images: [economyNonAc1, economyNonAc2, economyNonAc3],
        includes: ['Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 4, name: 'Family Suite', type: 'Suite', tag: 'Most Popular',
        price: 5500, rating: 4.8, reviews: 95,
        features: ['2 Double Beds', 'Air Conditioning', 'Private Bathroom', 'WiFi TV', 'Free WiFi', 'Seating Area', 'Geyser'],
        desc: 'Spacious suite perfect for families visiting for Jagannath Darshan. Two beds, private bath with geyser and seating area. 24-hour room service available.',
        gradient: 'linear-gradient(135deg,#1A0A20,#5A1A60,#A030B0)',
        images: [familySuite1, familySuite2, familySuite3, familySuite4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service', 'Extra Bed on Request'],
    },
];

export const AMENITIES: Amenity[] = [
    { icon: '🍽️', name: 'Restaurant', desc: 'Pure Veg · North & South Indian, Chinese', color: '#D97706', bg: '#FFFBEB' },
    { icon: '🛎️', name: '24hr Room Service', desc: 'Round-the-clock in-room dining', color: '#92400E', bg: '#FEF3C7' },
    { icon: '📶', name: 'Free WiFi', desc: 'High-speed internet in all rooms', color: '#2563EB', bg: '#EFF6FF' },
    { icon: '❄️', name: 'AC Rooms', desc: 'Air conditioned rooms available', color: '#0891B2', bg: '#ECFEFF' },
    { icon: '📺', name: 'WiFi TV', desc: 'Smart WiFi TV in every room', color: '#7C3AED', bg: '#F5F3FF' },
    { icon: '🔒', name: 'CCTV Security', desc: '24/7 surveillance for safety', color: '#4B5563', bg: '#F3F4F6' },
    { icon: '🚬', name: 'Smoking Rooms', desc: 'Designated smoking rooms available', color: '#78716C', bg: '#F5F5F4' },
    { icon: '🚿', name: 'Geyser & Bath', desc: 'Hot water geyser in all bathrooms', color: '#059669', bg: '#ECFDF5' },
];

export const GALLERY_IMAGES = [
    { src: highlightRooftopImg, label: 'Rooftop Garden' },
    { src: deluxeAc1, label: 'Deluxe AC Room' },
    { src: highlightEx1Img, label: 'Hotel Exterior' },
    { src: standardAc1, label: 'Standard AC Room' },
    { src: highlightEx2Img, label: 'Hotel Exterior 2' },
    { src: familySuite1, label: 'Family Suite' },
    { src: highlightLobbyImg, label: 'Hotel Lobby' },
    { src: economyNonAc1, label: 'Economy Room' },
    { src: deluxeAc2, label: 'Deluxe Room 2' },
];

export const HOTEL_INFO = {
    name: 'Hotel Amruta Bhojana',
    phone: '+919437388224',
    landline: '+916752459250',
    whatsapp: '+919437388224',
    email: 'amrutabhojana@gmail.com',
    website: 'https://www.hotelamrutabhojana.com',
    maps: 'https://maps.app.goo.gl/H5oPZFBCsP61fxqNA',
    agoda: 'https://www.agoda.com',
    address: 'Shree Danda, Near Jagannath Temple, Puri Town, Puri, Odisha, 752001',
    rating: 5,
    reviewCount: 318,
    starRating: '5-Star Rated',
    checkin: '9:00 AM',
    checkout: '8:00 AM',
    gm: {
        name: 'Prahallad Behera',
        title: 'General Manager',
    },
};

// Hotel Policies
export const POLICIES = [
    { icon: '🕘', title: 'Check-in', detail: '9:00 AM onwards' },
    { icon: '🕗', title: 'Check-out', detail: 'By 8:00 AM' },
    { icon: '🚫', title: 'No Pets', detail: 'Pets are not allowed' },
    { icon: '🍱', title: 'No Outside Food', detail: 'In-house restaurant available' },
];

// Cancellation Policy
export const CANCELLATION_POLICY = [
    'Booking amount is non-refundable.',
    'No cancellation within 24 hours of check-in.',
    'The amount can be used within 60 days, as per availability of rooms and tariff.',
    'Partial cancellation is applicable only if informed before 24 hours.',
    'After deducting one day\'s booking amount, the balance will be refunded to your account.',
    'The non-refundable amount can be reused within 60 days.',
];

// Dining Information
export const DINING = {
    avgCost: '₹500',
    cuisine: 'Pure Veg · North Indian, South Indian, Chinese, Local Odia (Without Onion & Garlic)',
    timings: [
        { meal: 'Breakfast', time: '6:30 AM – 11:00 AM', icon: '🌅' },
        { meal: 'Lunch', time: '11:00 AM – 4:00 PM', icon: '☀️' },
        { meal: 'Dinner', time: '7:00 PM – 11:30 PM', icon: '🌙' },
    ],
    delivery: [
        { name: 'Zomato', color: '#E23744' },
        { name: 'Swiggy', color: '#FC8019' },
    ],
};

// Booking Platforms
export const BOOKING_PLATFORMS = [
    { name: 'Official Website', url: 'https://www.hotelamrutabhojana.com', icon: '🌐', highlight: true },
    { name: 'Agoda', url: 'https://www.agoda.com', icon: '🏨' },
    { name: 'Goibibo', url: 'https://www.goibibo.com', icon: '✈️' },
    { name: 'MakeMyTrip', url: 'https://www.makemytrip.com', icon: '🧳' },
    { name: 'Swift Rooms', url: '#', icon: '⚡' },
];

// Nearby Attractions
export const NEARBY_ATTRACTIONS = [
    { name: 'Shree Jagannath Temple', distance: '100 m', icon: '🛕', highlight: true },
    { name: 'Narendra Puskarini Pond', distance: '1 km', icon: '💧' },
    { name: 'Mausi Maa Temple', distance: '1.5 km', icon: '🛕' },
    { name: 'Puri Sea Beach', distance: '1.5 km', icon: '🏖️' },
    { name: 'Blue Flag Sea Beach', distance: '1.5 km', icon: '🏖️' },
    { name: 'Puri Lighthouse Point', distance: '2 km', icon: '🗼' },
    { name: 'Gundicha Temple', distance: '3 km', icon: '🛕' },
    { name: 'Konark Sun Temple', distance: '32 km', icon: '🏛️' },
    { name: 'Chilka Lake', distance: '45 km', icon: '🦩' },
    { name: 'Nandankanan Zoo', distance: '75 km', icon: '🦁' },
];

// How to Reach
export const HOW_TO_REACH = [
    { name: 'Jagannath Ballabha Parking', distance: '800 m', icon: '🅿️' },
    { name: 'Shree Setu', distance: '1 km', icon: '🌉' },
    { name: 'Puri Railway Station', distance: '2 km', icon: '🚂' },
    { name: 'Puri Bus Terminal', distance: '2 km', icon: '🚌' },
    { name: 'NH 316', distance: '2 km', icon: '🛣️' },
    { name: 'District Hospital', distance: '2 km', icon: '🏥' },
    { name: 'Bhubaneswar Airport', distance: '65 km', icon: '✈️' },
];
