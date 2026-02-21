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

import hero1 from '../images/IMG-20260220-WA0006.jpg';
import hero2 from '../images/IMG-20260220-WA0007.jpg';
import hero3 from '../images/IMG-20260220-WA0008.jpg';
import hero4 from '../images/IMG-20260220-WA0009.jpg';

export const HERO_IMAGES = [hero1, hero2, hero3, hero4];

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
        features: ['King Bed', 'Air Conditioning', 'Cable TV', 'Free WiFi', 'Attached Bath'],
        desc: 'A comfortable Deluxe AC Room offering a peaceful stay steps from the Jagannath Temple. Clean, hygienic and value for money.',
        gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
        images: [deluxeAc1, deluxeAc2, deluxeAc3, deluxeAc4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'Paid Breakfast', 'Free Cancellation'],
    },
    {
        id: 2, name: 'Standard AC Room', type: 'Standard', tag: null,
        price: 2500, rating: 4.6, reviews: 210,
        features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi'],
        desc: 'Ideal for solo travelers and couples. Clean, affordable and well-located near Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
        images: [standardAc1, standardAc2, standardAc3, standardAc4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'Free Cancellation'],
    },
    {
        id: 3, name: 'Economy Non-AC Room', type: 'Economy', tag: null,
        price: 1200, rating: 4.5, reviews: 165,
        features: ['Single Bed', 'Ceiling Fan', 'Common Bathroom', 'Budget Friendly'],
        desc: 'Perfect for budget pilgrims. Clean, safe and simple stay at the most affordable price in Puri.',
        gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
        images: [economyNonAc1, economyNonAc2, economyNonAc3],
        includes: ['Common Bathroom', 'Daily Housekeeping', 'Free Cancellation'],
    },
    {
        id: 4, name: 'Family Suite', type: 'Suite', tag: 'Most Popular',
        price: 5500, rating: 4.8, reviews: 95,
        features: ['2 Double Beds', 'Air Conditioning', 'Private Bathroom', 'Cable TV', 'Free WiFi', 'Seating Area'],
        desc: 'Spacious suite perfect for families visiting for Jagannath Darshan. Two beds, private bath and seating area.',
        gradient: 'linear-gradient(135deg,#1A0A20,#5A1A60,#A030B0)',
        images: [familySuite1, familySuite2, familySuite3, familySuite4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'Paid Breakfast', 'Free Cancellation', 'Extra Bed on Request'],
    },
];

export const AMENITIES: Amenity[] = [
    { icon: '📶', name: 'Free WiFi', desc: 'High-speed internet in all rooms', color: '#2563EB', bg: '#EFF6FF' },
    { icon: '❄️', name: 'AC Rooms', desc: 'Central air conditioning available', color: '#0891B2', bg: '#ECFEFF' },
    { icon: '🍽️', name: 'Restaurant', desc: 'Authentic Odia & Indian cuisine', color: '#D97706', bg: '#FFFBEB' },
    { icon: '☕', name: 'Breakfast', desc: 'Complimentary morning meal', color: '#92400E', bg: '#FEF3C7' },
    { icon: '🅿️', name: 'Parking', desc: 'Free on-site parking available', color: '#4B5563', bg: '#F3F4F6' },
    { icon: '📺', name: 'Cable TV', desc: 'Satellite TV in every room', color: '#7C3AED', bg: '#F5F3FF' },
    { icon: '♿', name: 'Accessible', desc: 'Wheelchair-friendly facilities', color: '#059669', bg: '#ECFDF5' },
    { icon: '🏊', name: 'Pool', desc: 'Seasonal outdoor swimming pool', color: '#0284C7', bg: '#E0F2FE' },
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
    whatsapp: '+919437388224',
    email: 'info@hotelamrutabhojana.com',
    website: 'https://hotelamrutabhojana.com',
    maps: 'https://maps.app.goo.gl/H5oPZFBCsP61fxqNA',
    agoda: 'https://www.agoda.com',
    address: 'Shree Danda, near Jagannath Temple, Puri, Odisha 752001',
    rating: 4.7,
    reviewCount: 318,
    checkin: '9:00 AM',
    checkout: '8:00 AM',
};
