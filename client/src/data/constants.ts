// Hotel logo
export { default as hotelLogo } from '../images/hotel-logo-2.jpg';
export { default as hotelLogoBW } from '../images/hotel-logo-1.jpg';

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
import highlightRooftopImg from '../images/hotel-highlight-rooftop-garden.jpg';
import highlightEx1Img from '../images/hotel-highlight-exterior-1.jpg';
import highlightEx2Img from '../images/hotel-highlight-exterior-2.jpg';
import highlightLobbyImg from '../images/hotel-highlight-lobby.jpg';
import temple1 from '../images/download.jpg';
import temple2 from '../images/download (1).jpg';
import temple3 from '../images/images.jpg';

// Attraction Images
import attrJagannath from '../images/attractions/jagannath_temple_1772490392748.png';
import attrNarendra from '../images/attractions/attraction_narendra_pond_1772490449318.png';
import attrMausiMaa from '../images/attractions/attraction_mausi_maa_1772490476155.png';
import attrPuriBeach from '../images/attractions/attraction_puri_beach_1772490500284.png';
import attrBlueFlag from '../images/attractions/attraction_blue_flag_beach_1772490530522.png';
import attrLighthouse from '../images/attractions/attraction_lighthouse_1772490557720.png';
import attrGundicha from '../images/attractions/attraction_gundicha_temple_1772490588172.png';
import attrKonark from '../images/attractions/attraction_konark_temple_1772490610197.png';
import attrRamchandi from '../images/attractions/attraction_ramchandi_temple_1772490632224.png';
import attrChandrabhaga from '../images/attractions/attraction_chandrabhaga_beach_1772490653706.png';
import attrChilka from '../images/attractions/attraction_chilka_lake_1772490678598.png';
import attrLingraj from '../images/attractions/attraction_lingraj_temple_1772490703675.png';
import attrBiraja from '../images/attractions/attraction_lingraj_temple_1772490703675.png'; // Using Lingraj as fallback since generation limit was hit

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
        id: 1, name: 'Deluxe AC With BreakFast', type: 'Deluxe', tag: 'Best Value',
        price: 4941, rating: 4.8, reviews: 318,
        features: ['Double Bed', 'Air Conditioning', 'City View', '130 sq.ft', 'Attached Bath', 'Geyser', 'Complimentary Breakfast'],
        desc: 'A comfortable Deluxe Double Bed AC Room with city views and complimentary breakfast. 130 sq.ft of well-appointed space with modern amenities near Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
        images: [deluxeAc1, deluxeAc2, deluxeAc3, deluxeAc4],
        includes: ['Breakfast', 'Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 2, name: 'Deluxe AC', type: 'Deluxe', tag: null,
        price: 4160, rating: 4.7, reviews: 290,
        features: ['Double Bed', 'Air Conditioning', 'City View', '130 sq.ft', 'Attached Bath', 'Geyser'],
        desc: 'A comfortable Deluxe Double Bed AC Room with city views. 130 sq.ft of well-appointed space with modern amenities near Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
        images: [deluxeAc1, deluxeAc2, deluxeAc3, deluxeAc4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 3, name: 'AC Room with BreakFast', type: 'AC Room', tag: null,
        price: 3381, rating: 4.6, reviews: 210,
        features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi', 'Geyser', 'Complimentary Breakfast'],
        desc: 'Ideal for solo travelers and couples. Clean, affordable AC room near Jagannath Temple with complimentary breakfast, attached bath with geyser, and free WiFi.',
        gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
        images: [standardAc1, standardAc2, standardAc3, standardAc4],
        includes: ['Breakfast', 'Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 4, name: 'AC Room', type: 'AC Room', tag: null,
        price: 2600, rating: 4.5, reviews: 180,
        features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi', 'Geyser'],
        desc: 'Ideal for solo travelers and couples. Clean, affordable and well-located near Jagannath Temple. Equipped with AC, attached bath with geyser, and free WiFi.',
        gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
        images: [standardAc1, standardAc2, standardAc3, standardAc4],
        includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 5, name: 'Non-AC with BreakFast', type: 'Non-AC', tag: null,
        price: 1821, rating: 4.5, reviews: 165,
        features: ['Double Bed', 'Ceiling Fan', 'Attached Bath', 'Budget Friendly', 'Geyser', 'Complimentary Breakfast'],
        desc: 'Perfect for budget pilgrims. Clean, safe and simple stay with complimentary breakfast. Located just 100 meters from Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
        images: [economyNonAc1, economyNonAc2, economyNonAc3],
        includes: ['Breakfast', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
    },
    {
        id: 6, name: 'Non-AC', type: 'Non-AC', tag: 'Most Affordable',
        price: 1300, rating: 4.4, reviews: 140,
        features: ['Double Bed', 'Ceiling Fan', 'Attached Bath', 'Budget Friendly', 'Geyser'],
        desc: 'Perfect for budget pilgrims. Clean, safe and simple stay at the most affordable price in Puri. Located just 100 meters from Jagannath Temple.',
        gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
        images: [economyNonAc1, economyNonAc2, economyNonAc3],
        includes: ['Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
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
    { icon: '🚕', name: 'Tours & Travel', desc: 'Cab booking and travel assistance', color: '#0369A1', bg: '#F0F9FF' },
    { icon: '🥘', name: 'Mahaprasad Seva', desc: 'Arrangements for holy Mahaprasad', color: '#B45309', bg: '#FFF7ED' },
    { icon: '🚩', name: 'Temple Flag Seva', desc: 'Assistance with Patitapabana Bana Seva', color: '#BE123C', bg: '#FFF1F2' },
    { icon: '👁️', name: 'Local Sightseeing', desc: 'Guided tours around Puri', color: '#4338CA', bg: '#EEF2FF' },
];

export const GALLERY_IMAGES = [
    { src: highlightEx1Img, label: 'Main Entrance', category: 'Exterior & Entrance' },
    { src: highlightEx2Img, label: 'Hotel Building', category: 'Exterior & Entrance' },
    { src: hero6, label: 'Hotel Signboard', category: 'Exterior & Entrance' },
    { src: hero5, label: 'Night Exterior', category: 'Exterior & Entrance' },
    { src: deluxeAc1, label: 'Deluxe Room View', category: 'Rooms' },
    { src: deluxeAc2, label: 'Deluxe Suite', category: 'Rooms' },
    { src: standardAc1, label: 'Standard Room', category: 'Rooms' },
    { src: standardAc2, label: 'Cozy Room', category: 'Rooms' },
    { src: economyNonAc1, label: 'Economy Stay', category: 'Rooms' },
    { src: economyNonAc2, label: 'Simple Stay', category: 'Rooms' },

    { src: highlightRooftopImg, label: 'Rooftop Garden', category: 'Rooftop' },
    { src: highlightEx1Img, label: 'Rooftop View 1', category: 'Rooftop' },
    { src: highlightEx2Img, label: 'Rooftop View 2', category: 'Rooftop' },
    { src: highlightLobbyImg, label: 'Rooftop Lounge', category: 'Rooftop' },
    { src: highlightRooftopImg, label: 'Garden Dining', category: 'Restaurant' },
    { src: hero1, label: 'Restaurant Interior 1', category: 'Restaurant' },
    { src: hero2, label: 'Restaurant Interior 2', category: 'Restaurant' },
    { src: hero3, label: 'Dining Area 1', category: 'Restaurant' },
    { src: hero4, label: 'Dining Area 2', category: 'Restaurant' },

    // Note: Cupboard and Temple categories are added but might need specific images later
    { src: highlightLobbyImg, label: 'Storage Area', category: 'Cupboard' },
    { src: temple1, label: 'Temple View 1', category: 'Sree Jagannath Temple' },
    { src: temple2, label: 'Temple View 2', category: 'Sree Jagannath Temple' },
    { src: temple3, label: 'Temple View 3', category: 'Sree Jagannath Temple' },
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
    gstNumber: '21ELPPS1154B3ZA',
    foodLicense: '12025026000040',
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
    'Reservation payments are strictly non-refundable.',
    'Cancellations or modifications must be requested at least 24 hours prior to scheduled check-in.',
    'For cancellations made at least 24 hours in advance, the balance (less a one-day room charge) will be credited for your future use.',
    'Credit validity is 60 days from the date of the original reservation, subject to room availability and current seasonal tariffs.',
    'No modifications, credits, or refunds will be issued for cancellations made within 24 hours of scheduled check-in.',
];

// Dining Information
export const DINING = {
    avgCost: '₹500',
    cuisine: 'Pure Veg · North Indian, South Indian, Chinese, Local Odia (Without Onion & Garlic)',
    timings: [
        { meal: 'Breakfast', time: '6:30 AM – 11:00 AM', icon: '🌅' },
        { meal: 'Lunch', time: '11:00 AM – 4:00 PM', icon: '☀️' },
        { meal: 'Dinner', time: '7:00 PM – 11:30 PM', icon: '🌙' },
        { meal: 'Midnight', time: '12:00 AM – 3:00 AM', icon: '🌌' },
    ],
    delivery: [
        { name: 'Zomato', url: 'https://www.zomato.com/puri/hotel-amruta-bhojana-dolamandap-sahi/order', color: '#E23744' },
        { name: 'Swiggy', url: 'https://www.swiggy.com/city/puri/hotel-amruta-bhojana-balagandi-rest1190898', color: '#FC8019' },
    ],
};

// Booking Platforms
export const BOOKING_PLATFORMS = [
    { name: 'MakeMyTrip', url: 'https://www.makemytrip.com/hotels/hotel_amruta_bhojana_100mtrs_from_jaganath_temple-details-puri.html', icon: '🧳', highlight: true },
    { name: 'Goibibo', url: 'https://www.goibibo.com/hotels/amruta-bhojana-100mtrs-from-jaganath-temple-hotel-in-puri-7115236572056810877/', icon: '✈️' },
    { name: 'Agoda', url: 'https://www.agoda.com/en-gb/hotel-amruta-bhojana/hotel/puri-in.html?countryId=35&finalPriceView=1&isShowMobileAppPrice=false&cid=1917614&numberOfBedrooms=&familyMode=false&adults=2&children=0&rooms=1&maxRooms=0&checkIn=2026-03-4&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=1&showReviewSubmissionEntry=false&currencyCode=INR&isFreeOccSearch=false&los=1&searchrequestid=ff4704d5-a508-402d-9e04-d3f9dd65450d', icon: '🏨' },
    { name: 'TripAdvisor', url: 'https://www.tripadvisor.com/Hotel_Review-g503703-d34122460-Reviews-Hotel_Amruta_Bhojana-Puri_Puri_District_Odisha.html', icon: '🦉' },
];

// Nearby Attractions
export const NEARBY_ATTRACTIONS = [
    { name: 'Shree Jagannath Temple', distance: '100 m', icon: '🛕', highlight: true, mapLink: 'https://maps.app.goo.gl/L1rBDyrp67bjVfvV9', image: attrJagannath },
    { name: 'Narendra Puskarini Pond', distance: '1 km', icon: '💧', mapLink: 'https://www.google.com/maps?q=19.81367,85.82499', image: attrNarendra },
    { name: 'Mausi Maa Temple', distance: '1.5 km', icon: '🛕', mapLink: 'https://maps.google.com/?q=RR6G+CP7', image: attrMausiMaa },
    { name: 'Puri Sea Beach', distance: '1.5 km', icon: '🏖️', mapLink: 'https://www.google.com/maps/search/Puri+Sea+Beach', image: attrPuriBeach },
    { name: 'Blue Flag Sea Beach', distance: '1.5 km', icon: '🏖️', mapLink: 'https://goo.gl/maps/vvJecBzQaJdz48XW9', image: attrBlueFlag },
    { name: 'Puri Lighthouse Point', distance: '2 km', icon: '🗼', mapLink: 'https://www.google.com/maps/search/Puri+Lighthouse', image: attrLighthouse },
    { name: 'Gundicha Temple', distance: '3 km', icon: '🛕', mapLink: 'https://www.google.com/maps/search/Gundicha+Temple+Puri', image: attrGundicha },
    { name: 'Konark Sun Temple', distance: '32 km', icon: '🏛️', mapLink: 'https://www.google.com/maps/search/Konark+Sun+Temple', image: attrKonark },
    { name: 'Ramchandi Temple', distance: '35 km', icon: '🛕', mapLink: 'https://maps.app.goo.gl/PW5SYxWUraTUyUXG7', image: attrRamchandi },
    { name: 'Chandrabhaga Beach', distance: '35 km', icon: '🏖️', mapLink: 'https://www.google.com/maps/search/Chandrabhaga+Beach+Odisha', image: attrChandrabhaga },
    { name: 'Chilka Lake', distance: '45 km', icon: '🦩', mapLink: 'https://www.google.com/maps/place/Chilika+Lake/@19.717,85.317', image: attrChilka },
    { name: 'Lingraj Temple', distance: '65 km', icon: '🛕', mapLink: 'https://www.google.com/maps/search/Lingaraja+Temple+Bhubaneswar', image: attrLingraj },
    { name: 'Biraja Temple Jajpur (Shakti Peeth)', distance: '160 km', icon: '🛕', mapLink: 'https://maps.google.com/?q=Biraja+Temple+Jajpur', image: attrBiraja },
];

// How to Reach
export const HOW_TO_REACH = [
    { name: 'Jagannath Ballabha Parking', distance: '800 m', icon: '🅿️', mapLink: 'https://www.google.com/maps/search/Jagannath+Ballabha+Parking+Puri' },
    { name: 'Shree Setu', distance: '1 km', icon: '🌉', mapLink: 'https://www.google.com/maps/search/Shree+Setu+Puri' },
    { name: 'Puri Railway Station', distance: '2 km', icon: '🚂', mapLink: 'https://www.google.com/maps/search/Puri+Railway+Station' },
    { name: 'Puri Bus Terminal', distance: '2 km', icon: '🚌', mapLink: 'https://www.google.com/maps/search/Puri+Main+Bus+Stand' },
    { name: 'NH 316', distance: '2 km', icon: '🛣️', mapLink: 'https://www.google.com/maps/search/NH+316+India' },
    { name: 'District Hospital', distance: '2 km', icon: '🏥', mapLink: 'https://www.google.com/maps/search/District+Head+Quarter+Hospital+Puri' },
    { name: 'Bhubaneswar Airport', distance: '65 km', icon: '✈️', mapLink: 'https://www.google.com/maps/search/Bhubaneswar+Airport' },
];
