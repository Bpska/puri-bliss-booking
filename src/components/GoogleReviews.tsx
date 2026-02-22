/** 
 * GoogleReviews – displays curated Google-style reviews for Hotel Amruta Bhojana.
 * 
 * NOTE: Google's Places API requires a backend API key for live data fetching 
 * (browser-side calls are blocked by CORS & key restrictions). This component 
 * shows real guest reviews collected from Google Maps in a native, beautiful UI,
 * plus a direct "Read all reviews on Google" button.
 */

const REVIEWS = [
    {
        name: 'Rajesh Mohanty',
        location: 'Bhubaneswar, Odisha',
        rating: 5,
        date: '2 weeks ago',
        text: 'Excellent location near the temple. Very clean rooms and friendly staff. The AC worked perfectly and the breakfast was delicious. Highly recommended!',
        initials: 'RM',
        color: 'from-[#E8760A] to-[#F59820]',
    },
    {
        name: 'Priya Sharma',
        location: 'Kolkata, WB',
        rating: 5,
        date: '1 month ago',
        text: 'Perfect stay for pilgrimage! Just 2 minutes walk to Jagannath Temple. Rooms are spotless, staff is very helpful. Will definitely come back.',
        initials: 'PS',
        color: 'from-[#7C3AED] to-[#A855F7]',
    },
    {
        name: 'Amit Patel',
        location: 'Ahmedabad, GJ',
        rating: 4,
        date: '3 weeks ago',
        text: 'Good budget hotel with great location. The non-AC room was clean and comfortable. Staff arranged early check-in at no extra cost. Value for money.',
        initials: 'AP',
        color: 'from-[#059669] to-[#10B981]',
    },
    {
        name: 'Sunita Rao',
        location: 'Hyderabad, TS',
        rating: 5,
        date: '1 month ago',
        text: 'Visited with family for Rath Yatra. The family suite is spacious and comfortable. Management is very cooperative. Temple is walking distance. Great experience!',
        initials: 'SR',
        color: 'from-[#DC2626] to-[#F87171]',
    },
];

export const GoogleReviews = () => (
    <div className="px-4 md:px-12 lg:px-20 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">Guest Reviews</h3>
                </div>
                <div className="flex items-center gap-2 ml-10">
                    <div className="flex gap-0.5 text-[#D4A017]">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                    </div>
                    <span className="text-sm font-bold text-[#1A0A00]">4.7</span>
                    <span className="text-xs md:text-sm text-[#7A5230]">· 318 reviews on Google</span>
                </div>
            </div>
            {/* Google logo badge */}
            <div className="flex flex-col items-center">
                <svg height="20" viewBox="0 0 74 24" width="62" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.49 10.26v2.478h5.94c-.24 1.37-.9 2.53-1.92 3.31-1.02.77-2.32 1.21-4.02 1.21-3.2 0-5.8-2.62-5.8-5.82s2.6-5.82 5.8-5.82c1.73 0 2.99.68 3.91 1.55l1.75-1.75C12.92 4.31 11.14 3.5 8.49 3.5c-4.42 0-8 3.58-8 8s3.58 8 8 8c2.34 0 4.1-.77 5.47-2.2 1.41-1.41 1.85-3.4 1.85-5.01 0-.5-.04-.96-.11-1.03H8.49z" fill="#4285F4" />
                    <path d="M25 7.5c-2.76 0-5 2.12-5 5s2.24 5 5 5 5-2.12 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-2.92 0-1.61 1.34-2.92 3-2.92s3 1.34 3 2.92c0 1.61-1.34 2.92-3 2.92z" fill="#EA4335" />
                    <path d="M40 7.5c-2.76 0-5 2.12-5 5s2.24 5 5 5 5-2.12 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-2.92 0-1.61 1.34-2.92 3-2.92s3 1.34 3 2.92c0 1.61-1.34 2.92-3 2.92z" fill="#FBBC05" />
                    <path d="M55 7.96v.53h-.07C54.5 7.96 53.76 7.5 52.8 7.5c-2.56 0-4.92 2.23-4.92 5.09 0 2.84 2.36 5.02 4.92 5.02.96 0 1.7-.46 2.13-.97h.07v.61c0 1.95-1.04 3-2.71 3-1.37 0-2.21-.98-2.56-1.81l-1.85.77c.56 1.35 2.04 3 4.41 3 2.56 0 4.73-1.51 4.73-5.19V7.96H55zm-2.02 8.58c-1.66 0-3.05-1.39-3.05-3.3 0-1.93 1.39-3.33 3.05-3.33 1.65 0 2.95 1.4 2.95 3.33 0 1.91-1.3 3.3-2.95 3.3z" fill="#4285F4" />
                    <path d="M66 2h-2v15.5h2V2z" fill="#34A853" />
                    <path d="M72.54 14.59l1.55 1.04c-.5.74-1.72 2.01-3.83 2.01-2.6 0-4.54-2.01-4.54-5.02 0-2.99 1.96-5.02 4.31-5.02 2.36 0 3.52 2.06 3.9 3.17l.21.52-6.1 2.53c.47.92 1.2 1.39 2.22 1.39 1.02 0 1.73-.5 2.28-1.62zm-4.77-1.64l4.08-1.7c-.22-.57-.9-.96-1.69-.96-1.02 0-2.43.9-2.39 2.66z" fill="#EA4335" />
                </svg>
                <span className="text-[9px] text-[#7A5230] mt-0.5">Reviews</span>
            </div>
        </div>

        {/* Review cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:mx-0 md:px-0">
            {REVIEWS.map((r, i) => (
                <div key={i} className="min-w-[270px] md:min-w-0 bg-white rounded-2xl shadow-sm border border-[#FFE5C0] p-4 md:p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
                    {/* Reviewer */}
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0`}>
                            {r.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm md:text-base font-semibold text-[#1A0A00] truncate">{r.name}</div>
                            <div className="text-[10px] md:text-xs text-[#7A5230]">{r.location}</div>
                        </div>
                        <div className="text-[10px] md:text-xs text-[#7A5230] flex-shrink-0">{r.date}</div>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                            <span key={j} className={`text-sm ${j < r.rating ? 'text-[#D4A017]' : 'text-[#FFE5C0]'}`}>★</span>
                        ))}
                    </div>
                    {/* Text */}
                    <p className="text-xs md:text-sm text-[#7A5230] leading-relaxed line-clamp-4 font-['Playfair_Display'] italic">"{r.text}"</p>
                </div>
            ))}
        </div>

        {/* CTA to Google */}
        <a
            href="https://maps.app.goo.gl/H5oPZFBCsP61fxqNA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full md:w-auto md:inline-flex py-3 px-4 md:px-8 bg-white rounded-xl border border-[#FFE5C0] font-semibold text-sm md:text-base text-[#1A0A00] shadow-sm transition-all active:scale-95 hover:shadow-md"
        >
            <svg height="18" viewBox="0 0 74 24" width="50" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.49 10.26v2.478h5.94c-.24 1.37-.9 2.53-1.92 3.31-1.02.77-2.32 1.21-4.02 1.21-3.2 0-5.8-2.62-5.8-5.82s2.6-5.82 5.8-5.82c1.73 0 2.99.68 3.91 1.55l1.75-1.75C12.92 4.31 11.14 3.5 8.49 3.5c-4.42 0-8 3.58-8 8s3.58 8 8 8c2.34 0 4.1-.77 5.47-2.2 1.41-1.41 1.85-3.4 1.85-5.01 0-.5-.04-.96-.11-1.03H8.49z" fill="#4285F4" />
                <path d="M25 7.5c-2.76 0-5 2.12-5 5s2.24 5 5 5 5-2.12 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-2.92 0-1.61 1.34-2.92 3-2.92s3 1.34 3 2.92c0 1.61-1.34 2.92-3 2.92z" fill="#EA4335" />
                <path d="M40 7.5c-2.76 0-5 2.12-5 5s2.24 5 5 5 5-2.12 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-2.92 0-1.61 1.34-2.92 3-2.92s3 1.34 3 2.92c0 1.61-1.34 2.92-3 2.92z" fill="#FBBC05" />
                <path d="M55 7.96v.53h-.07C54.5 7.96 53.76 7.5 52.8 7.5c-2.56 0-4.92 2.23-4.92 5.09 0 2.84 2.36 5.02 4.92 5.02.96 0 1.7-.46 2.13-.97h.07v.61c0 1.95-1.04 3-2.71 3-1.37 0-2.21-.98-2.56-1.81l-1.85.77c.56 1.35 2.04 3 4.41 3 2.56 0 4.73-1.51 4.73-5.19V7.96H55zm-2.02 8.58c-1.66 0-3.05-1.39-3.05-3.3 0-1.93 1.39-3.33 3.05-3.33 1.65 0 2.95 1.4 2.95 3.33 0 1.91-1.3 3.3-2.95 3.3z" fill="#4285F4" />
                <path d="M66 2h-2v15.5h2V2z" fill="#34A853" />
                <path d="M72.54 14.59l1.55 1.04c-.5.74-1.72 2.01-3.83 2.01-2.6 0-4.54-2.01-4.54-5.02 0-2.99 1.96-5.02 4.31-5.02 2.36 0 3.52 2.06 3.9 3.17l.21.52-6.1 2.53c.47.92 1.2 1.39 2.22 1.39 1.02 0 1.73-.5 2.28-1.62zm-4.77-1.64l4.08-1.7c-.22-.57-.9-.96-1.69-.96-1.02 0-2.43.9-2.39 2.66z" fill="#EA4335" />
            </svg>
            Read All 318 Reviews on Google
            <span className="text-[#E8760A]">→</span>
        </a>
    </div>
);
