// scoringService.js - Multi-Factor Recommendation & Scoring Engine for Eastern UP

// Target 4 Cities of Uttar Pradesh
export const UP_CITIES = [
    {
        id: 'banaras',
        name: 'Banaras (Varanasi)',
        tagline: 'Eternal Ghats, Sacred Temples & Classical Heritage',
        image: 'god img/vn1.jpg',
        description: 'One of the oldest living cities in the world, famed for Kashi Vishwanath, Dashashwamedh Ganga Aarti, Sarnath, and vibrant Banarasi cuisine.',
        affinities: {
            spiritual: 98,
            heritage: 95,
            ghats_culture: 98,
            culinary: 92,
            waterfalls: 20,
            forests_fossils: 25,
            adventure: 35
        },
        budgetFit: {
            budget: 85,
            moderate: 96,
            luxury: 96
        },
        idealDaysRange: [2, 4],
        transportFit: {
            cab: 95,
            train: 98,
            bus: 90
        },
        highlights: [
            'Dashashwamedh Ghat Evening Ganga Aarti',
            'Kashi Vishwanath Jyotirlinga Darshan',
            'Sunrise Boat Cruise from Assi to Manikarnika',
            'Sarnath Buddhist Stupas & Museum',
            'Banarasi Silk Weaving & Street Food Trail'
        ],
        activities: [
            {
                id: 'b_aarti',
                title: 'Dashashwamedh Ghat Grand Evening Ganga Aarti',
                category: 'spiritual',
                categoryLabel: 'Spiritual & Sacred',
                icon: '🙏',
                bestTime: 'Evening (6:00 PM – 7:30 PM)',
                duration: '1.5 Hours',
                description: 'Witness high priests chanting Vedic hymns with multi-tiered brass oil lamps, synchronized chimes, and floating diyas reflecting on the sacred Ganges.',
                insiderTip: 'Book a wooden rowboat 30 minutes in advance for an unobstructed view from the river.',
                tags: ['Ganga Aarti', 'Spiritual', 'Sacred Chants']
            },
            {
                id: 'b_vishwanath',
                title: 'Kashi Vishwanath Corridor & Golden Temple Darshan',
                category: 'spiritual',
                categoryLabel: 'Spiritual & Sacred',
                icon: '🕉️',
                bestTime: 'Early Morning (5:00 AM – 7:30 AM)',
                duration: '2 Hours',
                description: 'Visit the revered Jyotirlinga shrine of Lord Shiva through the grand marble corridor connecting directly to the holy river.',
                insiderTip: 'Early morning Mangala Aarti passes offer peaceful access before crowds arrive.',
                tags: ['Jyotirlinga', 'Temple', 'Sacred Corridor']
            },
            {
                id: 'b_sunrise_boat',
                title: 'Sunrise Rowboat Cruise: Assi to Manikarnika Ghat',
                category: 'ghats_culture',
                categoryLabel: 'Ghats & Culture',
                icon: '🚣',
                bestTime: 'Dawn (5:30 AM – 7:00 AM)',
                duration: '1.5 Hours',
                description: 'Glide past 84 historic ghats as morning rays illuminate heritage palaces, listening to morning chants and temple bells.',
                insiderTip: 'Watch Subah-e-Banaras classical music & yoga at Assi Ghat before boarding.',
                tags: ['Sunrise Boat', 'Ghats', 'Photography']
            },
            {
                id: 'b_sarnath',
                title: 'Sarnath Buddhist Stupas & Ashoka Pillar Museum',
                category: 'heritage',
                categoryLabel: 'Heritage & History',
                icon: '🏛️',
                bestTime: 'Afternoon (2:00 PM – 5:00 PM)',
                duration: '2.5 Hours',
                description: 'Explore Dhamek Stupa where Lord Buddha delivered his first sermon, and view the original 4-lion Ashoka Capital in the archaeological museum.',
                insiderTip: 'The museum is closed on Fridays; hire a certified ASI guide for historical storytelling.',
                tags: ['UNESCO Heritage', 'Buddhism', 'Ashoka Pillar']
            },
            {
                id: 'b_food_trail',
                title: 'Chowk & Vishwanath Gali Street Food & Silk Trail',
                category: 'ghats_culture',
                categoryLabel: 'Street Food & Culture',
                icon: '🍲',
                bestTime: 'Morning or Evening',
                duration: '2 Hours',
                description: 'Taste authentic Banarasi Malaiyo (winter foam sweet), piping hot Kachori-Jalebi at Ram Bhandar, Blue Lassi, and traditional Banarasi Paan.',
                insiderTip: 'Visit Thatheri Bazaar to watch traditional master weavers make Banarasi Zari brocades.',
                tags: ['Banarasi Paan', 'Kachori', 'Blue Lassi', 'Silk Weaving']
            },
            {
                id: 'b_ramnagar',
                title: 'Ramnagar Fort & Royal Vintage Car Museum',
                category: 'heritage',
                categoryLabel: 'Heritage & Forts',
                icon: '🏰',
                bestTime: 'Afternoon (3:00 PM – 5:00 PM)',
                duration: '1.5 Hours',
                description: '18th-century sandstone fortress on eastern bank of Ganga, housing ancestral royal armor, antique clocks, and palanquins of the Kashi Naresh.',
                insiderTip: 'Try the famous chilled Lassi right outside the fort gate after your tour.',
                tags: ['Fortress', 'Royal Museum', 'Mughal Architecture']
            }
        ]
    },
    {
        id: 'allahabad',
        name: 'Allahabad (Prayagraj)',
        tagline: 'Sacred Triveni Sangam, Grand Forts & Cultural Legacy',
        image: 'god img/ayodhya.jpg',
        description: 'The holiest confluence of Ganga, Yamuna and invisible Saraswati, steeped in Mughal and colonial history, literary culture, and monumental parks.',
        affinities: {
            spiritual: 95,
            heritage: 90,
            ghats_culture: 92,
            culinary: 85,
            waterfalls: 15,
            forests_fossils: 20,
            adventure: 30
        },
        budgetFit: {
            budget: 88,
            moderate: 94,
            luxury: 82
        },
        idealDaysRange: [1, 3],
        transportFit: {
            cab: 94,
            train: 98,
            bus: 88
        },
        highlights: [
            'Triveni Sangam Holy Dip & Boat Ride',
            'Historic Allahabad Fort & Akshayavat Tree',
            'Anand Bhawan & Planetarium',
            'Khusro Bagh Mughal Mausoleums',
            'Bade Hanuman Ji (Lelet Hanuman Temple)'
        ],
        activities: [
            {
                id: 'a_sangam',
                title: 'Triveni Sangam Confluence Boat Ride & Holy Snan',
                category: 'spiritual',
                categoryLabel: 'Spiritual & Sacred',
                icon: '🙏',
                bestTime: 'Morning (6:30 AM – 9:00 AM)',
                duration: '2 Hours',
                description: 'Take a boat to the exact meeting point where the greenish waters of Yamuna merge with the pale waters of Ganga and mystical Saraswati.',
                insiderTip: 'Migratory Siberian seagulls flock here between October and March—carry bird grain for stunning photos.',
                tags: ['Sangam', 'Holy Dip', 'Boat Cruise', 'Seagulls']
            },
            {
                id: 'a_fort',
                title: 'Allahabad Fort & Underground Patalpuri Temple',
                category: 'heritage',
                categoryLabel: 'Heritage & Forts',
                icon: '🏰',
                bestTime: 'Morning (9:00 AM – 11:30 AM)',
                duration: '1.5 Hours',
                description: 'Grand 1583 AD fortress built by Emperor Akbar overlooking Sangam, sheltering the immortal banyan tree (Akshayavat) and Patalpuri underground shrine.',
                insiderTip: 'Entry to Akshayavat is managed by the army; keep a government ID handy.',
                tags: ['Akbar Fort', 'Akshayavat', 'Ancient Banyan']
            },
            {
                id: 'a_anand_bhawan',
                title: 'Anand Bhawan & Swaraj Bhawan Historical Tour',
                category: 'heritage',
                categoryLabel: 'Heritage & History',
                icon: '🏛️',
                bestTime: 'Afternoon (1:30 PM – 4:30 PM)',
                duration: '2 Hours',
                description: 'Ancestral mansion of the Nehru-Gandhi family, showcasing historic rooms preserved as they were during India’s Freedom Movement and the Jawahar Planetarium.',
                insiderTip: 'Buy tickets for the 30-minute sky show at the planetarium on the same premises.',
                tags: ['Freedom Movement', 'Colonial Mansion', 'Planetarium']
            },
            {
                id: 'a_hanuman',
                title: 'Bade Hanuman Ji (Reclining Hanuman) Darshan',
                category: 'spiritual',
                categoryLabel: 'Spiritual & Sacred',
                icon: '🕉️',
                bestTime: 'Morning or Evening',
                duration: '1 Hour',
                description: 'Unique underground shrine housing a massive 20-foot subterranean reclining idol of Lord Hanuman, submerged by sacred Ganga waters during floods.',
                insiderTip: 'Tuesdays and Saturdays have special vermilion (Sindoor) pujas.',
                tags: ['Reclining Hanuman', 'Rare Temple', 'Spiritual Energy']
            },
            {
                id: 'a_khusro',
                title: 'Khusro Bagh Mughal Fresco Garden & Tombs',
                category: 'heritage',
                categoryLabel: 'Heritage & Architecture',
                icon: '🌿',
                bestTime: 'Late Afternoon (3:30 PM – 5:30 PM)',
                duration: '1.5 Hours',
                description: 'Walled quadrilateral Mughal garden with elaborate sandstone mausoleums of Prince Khusrau, showcasing exquisite Persian calligraphy and stone jaalis.',
                insiderTip: 'The surrounding guava orchards are world-famous for the sweet Allahabad Surkha pink guavas.',
                tags: ['Mughal Tombs', 'Persian Art', 'Orchards']
            },
            {
                id: 'a_food',
                title: 'Civil Lines & Loknath Street Culinary Trail',
                category: 'ghats_culture',
                categoryLabel: 'Street Food & Culture',
                icon: '🍲',
                bestTime: 'Evening (6:00 PM – 8:30 PM)',
                duration: '1.5 Hours',
                description: 'Savor famous Hari Ram & Sons spicy samosas, Dehati ke Rasgulle, Netram rich kachori-thali, and creamy Rabri Kulfi in Loknath chowk.',
                insiderTip: 'Loknath lane is best explored on foot or battery e-rickshaw.',
                tags: ['Dehati Rasgulla', 'Netram Kachori', 'Street Food']
            }
        ]
    },
    {
        id: 'mirzapur',
        name: 'Mirzapur',
        tagline: 'Cascading Waterfalls, Vindhyavasini Shaktipeeth & Hills',
        image: 'waterfall.png',
        description: 'Nestled on the banks of Ganga and Vindhya hills, famous for magnificent waterfalls, Maa Vindhyavasini shrine, and the historic Chunar Fort.',
        affinities: {
            waterfalls: 96,
            spiritual: 90,
            nature: 92,
            hills_caves: 88,
            heritage: 80,
            ghats_culture: 75,
            adventure: 75,
            forests_fossils: 60,
            culinary: 75
        },
        budgetFit: {
            budget: 96,
            moderate: 86,
            luxury: 65
        },
        idealDaysRange: [1, 2],
        transportFit: {
            cab: 96,
            train: 90,
            bus: 85
        },
        highlights: [
            'Maa Vindhyavasini Devi & Ashtabhuja Mandir',
            'Wyndham Falls & Sirsi Dam Waterfalls',
            'Historic Chunar Fort on Ganga Cliff',
            'Tanda Falls & Scenic Vindhya Hilltop Views',
            'Famous Mirzapur Brass & Carpet Crafts'
        ],
        activities: [
            {
                id: 'm_wyndham',
                title: 'Wyndham Falls Trek & Natural Cascades',
                category: 'waterfalls',
                categoryLabel: 'Waterfalls & Scenic Nature',
                icon: '🌊',
                bestTime: 'Morning (8:30 AM – 11:30 AM)',
                duration: '2.5 Hours',
                description: 'Picturesque natural tiered waterfall nestled in rocky Vindhya crags, with natural stepping pools, forest trails, and scenic picnic viewpoints.',
                insiderTip: 'Wear sports shoes with good grip on wet rocks; carry drinking water.',
                tags: ['Waterfall Hike', 'Scenic Gorge', 'Nature Photography']
            },
            {
                id: 'm_sirsi',
                title: 'Sirsi Dam & Waterfall Reservoir Viewpoint',
                category: 'waterfalls',
                categoryLabel: 'Waterfalls & Scenic Nature',
                icon: '🌊',
                bestTime: 'Afternoon (1:00 PM – 3:30 PM)',
                duration: '2 Hours',
                description: 'Vast reservoir surrounded by green hills where overflowing waters create magnificent foaming cascades and a peaceful lake landscape.',
                insiderTip: 'Local fishermen offer tranquil short boat rides near the dam shore.',
                tags: ['Reservoir', 'Waterfall Cascade', 'Green Hills']
            },
            {
                id: 'm_vindhyachal',
                title: 'Maa Vindhyavasini Shaktipeeth & Trikona Parikrama',
                category: 'spiritual',
                categoryLabel: 'Spiritual & Sacred',
                icon: '🙏',
                bestTime: 'Early Morning (6:00 AM – 9:00 AM)',
                duration: '3 Hours',
                description: 'Sacred 51 Shaktipeeth pilgrimage completing the holy triangle: Maa Vindhyavasini (Goddess of Wealth), Maa Kali Khoh (Cave temple), and Ashtabhuja Devi (Hill shrine).',
                insiderTip: 'The newly built Vindhya Corridor offers smooth darshan and ropeway access to Ashtabhuja hill.',
                tags: ['Shaktipeeth', 'Cave Shrine', 'Ropeway View']
            },
            {
                id: 'm_chunar',
                title: 'Chunar Fort Overlooking the Ganga Cliff',
                category: 'heritage',
                categoryLabel: 'Heritage & Ancient Forts',
                icon: '🏰',
                bestTime: 'Afternoon (3:00 PM – 5:30 PM)',
                duration: '2 Hours',
                description: 'Imposing 56 BC hilltop stronghold fought over by Sher Shah Suri, Humayun, and Warren Hastings, featuring the Sonwa Mandap, sun-dial, and 180° river views.',
                insiderTip: 'Sunset view from the fort ramparts over the bending Ganga river is unforgettable.',
                tags: ['Ancient Fort', 'Sher Shah Suri', 'Ganga Panorama']
            },
            {
                id: 'm_tanda',
                title: 'Tanda Falls & Vindhya Forest Trail',
                category: 'adventure',
                categoryLabel: 'Adventure & Nature Treks',
                icon: '🧗',
                bestTime: 'Morning (9:00 AM – 12:00 PM)',
                duration: '2 Hours',
                description: 'Tranquil waterfall with rocky natural steps surrounded by scrub forests, ideal for quiet bird watching and peaceful forest walks.',
                insiderTip: 'Post-monsoon to early spring (Aug–Feb) has the highest water flow and lush green surroundings.',
                tags: ['Forest Trail', 'Bird Watching', 'Natural Stepping Waterfall']
            },
            {
                id: 'm_crafts',
                title: 'Mirzapur Handcrafted Carpet & Brass Guild Tour',
                category: 'ghats_culture',
                categoryLabel: 'Culture & Crafts',
                icon: '🧶',
                bestTime: 'Late Afternoon',
                duration: '1.5 Hours',
                description: 'Visit traditional hand-knotted Persian-style wool carpet looms and witness bell-metal brass utensil casting by hereditary artisan families.',
                insiderTip: 'You can purchase authentic GI-tagged Mirzapur woolen dhurries directly from weaver cooperatives.',
                tags: ['Handloom Carpets', 'Brass Artisans', 'GI Tag Heritage']
            }
        ]
    },
    {
        id: 'sonbhadra',
        name: 'Sonbhadra',
        tagline: 'Fossil Parks, Prehistoric Cave Art, Forests & Giant Dams',
        image: 'assets/varanasi/fort.jpg',
        description: 'India’s Energy Capital bordered by four states, boasting 1.4-billion-year-old fossils, lush tribal forests, Mukha falls, and Rihand Dam reservoir.',
        affinities: {
            forests_fossils: 96,
            waterfalls: 92,
            nature: 94,
            adventure: 85,
            hills_caves: 92,
            heritage: 75,
            spiritual: 50,
            ghats_culture: 40,
            culinary: 65
        },
        budgetFit: {
            budget: 95,
            moderate: 82,
            luxury: 60
        },
        idealDaysRange: [2, 3],
        transportFit: {
            cab: 94,
            train: 75,
            bus: 80
        },
        highlights: [
            'Salkhan Fossil Park (1.4 Billion Year Old Fossils)',
            'Panchmukhi Prehistoric Rock Art & Caves',
            'Mukha Falls & Robertsganj Forest Trails',
            'Rihand Dam & Govind Ballabh Pant Sagar',
            'Historic Vijaygarh Fort Hilltop Trek'
        ],
        activities: [
            {
                id: 's_fossils',
                title: 'Salkhan Fossil Park Guided Geological Exploration',
                category: 'forests_fossils',
                categoryLabel: 'Forests, Fossils & Cave Art',
                icon: '🌲',
                bestTime: 'Morning (8:30 AM – 11:30 AM)',
                duration: '2.5 Hours',
                description: 'Walk among giant circular fossilized stromatolites (cyanobacteria colonies) dating back 1.4 billion years—older than the Grand Canyon and Yellowstone fossils.',
                insiderTip: 'Carry a camera with macro lens; the concentric ring patterns on the rock tree-trunks are mesmerizing.',
                tags: ['1.4 Billion Yrs Old', 'Prehistoric Fossils', 'Geological Wonder']
            },
            {
                id: 's_caves',
                title: 'Panchmukhi & Kauva Khoh Prehistoric Cave Paintings',
                category: 'forests_fossils',
                categoryLabel: 'Forests, Fossils & Cave Art',
                icon: '🎨',
                bestTime: 'Morning (9:30 AM – 12:30 PM)',
                duration: '2.5 Hours',
                description: 'Discover hidden rock shelters adorned with Mesolithic red-ochre prehistoric paintings depicting hunting scenes, rhinos, sun symbols, and ancient tribal dancers.',
                insiderTip: 'Hire a local forest guide from Robertsganj to navigate the rocky hill paths.',
                tags: ['Rock Art', 'Cave Shelters', 'Stone Age Paintings']
            },
            {
                id: 's_mukha',
                title: 'Mukha Falls & Belan River Valley Excursion',
                category: 'waterfalls',
                categoryLabel: 'Waterfalls & Scenic Nature',
                icon: '🌊',
                bestTime: 'Afternoon (1:00 PM – 4:00 PM)',
                duration: '2 Hours',
                description: 'A dramatic waterfall where the Belan river drops 100+ feet over sheer red sandstone escarpments into a secluded jungle canyon.',
                insiderTip: 'Great spot for wilderness photography; avoid swimming during heavy water currents.',
                tags: ['Canyon Waterfall', 'Jungle Valley', 'Wilderness']
            },
            {
                id: 's_rihand',
                title: 'Rihand Dam & Govind Ballabh Pant Sagar Reservoir',
                category: 'adventure',
                categoryLabel: 'Scenic Views & Waterways',
                icon: '🏞️',
                bestTime: 'Late Afternoon (3:30 PM – 6:00 PM)',
                duration: '2 Hours',
                description: 'One of the largest artificial lakes in Asia, surrounded by forested hills and generating clean hydroelectric power.',
                insiderTip: 'The sunset over the endless reservoir horizon looks like an inland sea.',
                tags: ['Mega Dam', 'Inland Sea', 'Sunset Panorama']
            },
            {
                id: 's_vijaygarh',
                title: 'Vijaygarh Fort Hilltop Adventure Trek',
                category: 'heritage',
                categoryLabel: 'Heritage & Ancient Forts',
                icon: '🏰',
                bestTime: 'Early Morning (6:30 AM – 10:30 AM)',
                duration: '3.5 Hours',
                description: 'Historic 5th-century mountain citadel set atop a 400-foot steep hill, famous for perpetual hilltop water ponds (Ram Sagar) and ancient rock inscriptions.',
                insiderTip: 'Requires climbing ~800 stone steps; carry snacks and plenty of water for the trek.',
                tags: ['Hilltop Fort', 'Trekking', 'Ancient Inscriptions']
            }
        ]
    }
];

export const INTEREST_OPTIONS = [
    { id: 'spiritual', label: 'Spiritual & Sacred Temples', icon: '🙏', color: '#8D6E63' },
    { id: 'waterfalls', label: 'Waterfalls & Scenic Nature', icon: '🌊', color: '#00897B' },
    { id: 'heritage', label: 'Heritage & Ancient Forts', icon: '🏛️', color: '#5D4037' },
    { id: 'forests_fossils', label: 'Forests, Fossils & Cave Art', icon: '🌲', color: '#33691E' },
    { id: 'adventure', label: 'Adventure & Nature Treks', icon: '🧗', color: '#BF360C' },
    { id: 'ghats_culture', label: 'Ghats, Boating & Street Food', icon: '🍲', color: '#C6A969' }
];

export const BUDGET_OPTIONS = [
    {
        id: 'budget',
        label: 'Budget-Friendly',
        subtitle: '₹1,000 – ₹2,200 / day',
        icon: '🪙',
        desc: 'Homestays, shared rides, authentic street foods & pocket-saving travel.'
    },
    {
        id: 'moderate',
        label: 'Standard & Comfortable',
        subtitle: '₹2,500 – ₹4,800 / day',
        icon: '🌟',
        desc: '3-Star hotels, private AC cab, guided tours & comfortable dining.'
    },
    {
        id: 'luxury',
        label: 'Premium & Luxury',
        subtitle: '₹5,500+ / day',
        icon: '👑',
        desc: 'Heritage properties, luxury boat rides, private chauffeur & VIP access.'
    }
];

export const TRANSPORT_OPTIONS = [
    { id: 'cab', label: 'Private Cab / Self-Drive', icon: '🚗', desc: 'Maximum flexibility across waterfalls, hills & cities' },
    { id: 'train', label: 'Train / Rail Network', icon: '🚆', desc: 'Fast, comfortable between Varanasi, Prayagraj & Mirzapur' },
    { id: 'bus', label: 'Bus / Public Transit', icon: '🚌', desc: 'Economical travel for backpackers' }
];

/**
 * Returns activities for a given city prioritized and tagged by the user's selected preferences
 */
export const getCuratedActivitiesForCity = (cityId, userSelectedLandscapes = []) => {
    const city = UP_CITIES.find(c => c.id === cityId);
    if (!city || !city.activities) return [];

    return city.activities.map(act => {
        const isMatched = userSelectedLandscapes.includes(act.category);
        return {
            ...act,
            isUserPreferenceMatch: isMatched,
            matchBadge: isMatched ? `🌟 Matches your ${act.categoryLabel} preference` : null
        };
    }).sort((a, b) => (b.isUserPreferenceMatch ? 1 : 0) - (a.isUserPreferenceMatch ? 1 : 0));
};

/**
 * Computes the 5-Factor Weighted Score for each of the 4 UP cities:
 * 
 * Formula:
 * Final Score = (Interest × 0.40) + (Budget × 0.20) + (Distance × 0.15) + (Duration × 0.15) + (Transport × 0.10)
 */
export const evaluateUPDestinations = (formData) => {
    const selectedInterests = formData.landscapes || ['spiritual'];
    const budgetTier = formData.budget || 'moderate';
    const transportType = formData.transport || 'cab';
    const tripDays = Number(formData.days) || 3;
    const pickupLoc = (formData.pickupLocation || '').toLowerCase().trim();

    return UP_CITIES.map((city) => {
        // 1. Calculate Interest Match (0 - 100) -> Weight: 40%
        let interestSum = 0;
        let interestCount = 0;

        INTEREST_OPTIONS.forEach((opt) => {
            const isSelected = selectedInterests.includes(opt.id);
            const cityAffinity = city.affinities[opt.id] || 25;

            if (isSelected) {
                interestSum += cityAffinity * 2.5;
                interestCount += 2.5;
            } else {
                const unselectedMatch = Math.max(10, 100 - cityAffinity);
                interestSum += unselectedMatch * 0.5;
                interestCount += 0.5;
            }
        });
        const interestScore = Math.round(interestSum / Math.max(1, interestCount));

        // 2. Calculate Budget Match (0 - 100) -> Weight: 20%
        const budgetScore = city.budgetFit[budgetTier] || 85;

        // 3. Calculate Distance Match (0 - 100) -> Weight: 15%
        let distanceScore = 80;
        if (pickupLoc.includes('varanasi') || pickupLoc.includes('banaras') || pickupLoc.includes('kashi')) {
            if (city.id === 'banaras') distanceScore = 98;
            else if (city.id === 'mirzapur') distanceScore = 92;
            else if (city.id === 'allahabad') distanceScore = 84;
            else if (city.id === 'sonbhadra') distanceScore = 78;
        } else if (pickupLoc.includes('allahabad') || pickupLoc.includes('prayagraj')) {
            if (city.id === 'allahabad') distanceScore = 98;
            else if (city.id === 'mirzapur') distanceScore = 90;
            else if (city.id === 'banaras') distanceScore = 84;
            else if (city.id === 'sonbhadra') distanceScore = 72;
        } else if (pickupLoc.includes('mirzapur')) {
            if (city.id === 'mirzapur') distanceScore = 98;
            else if (city.id === 'banaras') distanceScore = 94;
            else if (city.id === 'allahabad') distanceScore = 90;
            else if (city.id === 'sonbhadra') distanceScore = 88;
        } else if (pickupLoc.includes('sonbhadra') || pickupLoc.includes('robertsganj')) {
            if (city.id === 'sonbhadra') distanceScore = 98;
            else if (city.id === 'mirzapur') distanceScore = 88;
            else if (city.id === 'banaras') distanceScore = 80;
            else if (city.id === 'allahabad') distanceScore = 72;
        } else if (pickupLoc.includes('lucknow')) {
            if (city.id === 'allahabad') distanceScore = 88;
            else if (city.id === 'banaras') distanceScore = 82;
            else if (city.id === 'mirzapur') distanceScore = 78;
            else if (city.id === 'sonbhadra') distanceScore = 70;
        } else {
            if (city.id === 'banaras' || city.id === 'allahabad') distanceScore = 88;
            else if (city.id === 'mirzapur') distanceScore = 82;
            else if (city.id === 'sonbhadra') distanceScore = 78;
        }

        // 4. Calculate Trip Duration Match (0 - 100) -> Weight: 15%
        let durationScore = 85;
        const [minDays, maxDays] = city.idealDaysRange;
        if (tripDays >= minDays && tripDays <= maxDays) {
            durationScore = 96;
        } else if (tripDays < minDays) {
            durationScore = 75;
        } else {
            durationScore = 90;
        }

        // 5. Calculate Transport Match (0 - 100) -> Weight: 10%
        const transportScore = city.transportFit[transportType] || 90;

        // Apply Exact Weighted Formula
        const weightedInterest = interestScore * 0.40;
        const weightedBudget = budgetScore * 0.20;
        const weightedDistance = distanceScore * 0.15;
        const weightedDuration = durationScore * 0.15;
        const weightedTransport = transportScore * 0.10;

        const finalScore = Math.round(
            weightedInterest +
            weightedBudget +
            weightedDistance +
            weightedDuration +
            weightedTransport
        );

        const reasons = [];
        if (interestScore >= 80) reasons.push('High interest synergy with your selected sights');
        if (budgetScore >= 88) reasons.push(`Ideal fit for your ${budgetTier} budget tier`);
        if (distanceScore >= 85) reasons.push(`Convenient transit from ${formData.pickupLocation || 'starting point'}`);
        if (durationScore >= 90) reasons.push(`Matches your ${tripDays}-day duration`);

        const curatedActivities = getCuratedActivitiesForCity(city.id, selectedInterests);

        return {
            ...city,
            curatedActivities,
            scores: {
                interest: interestScore,
                budget: budgetScore,
                distance: distanceScore,
                duration: durationScore,
                transport: transportScore,
                final: finalScore
            },
            weightedBreakdown: {
                interest: Number(weightedInterest.toFixed(1)),
                budget: Number(weightedBudget.toFixed(1)),
                distance: Number(weightedDistance.toFixed(1)),
                duration: Number(weightedDuration.toFixed(1)),
                transport: Number(weightedTransport.toFixed(1))
            },
            matchReasons: reasons.slice(0, 3)
        };
    }).sort((a, b) => b.scores.final - a.scores.final);
};

/**
 * Builds the User Travel Profile and persists to localStorage
 */
export const buildAndSaveUserProfile = (formData) => {
    const rankedDestinations = evaluateUPDestinations(formData);
    const topDestination = rankedDestinations[0];

    const profile = {
        id: 'up_trip_' + Date.now(),
        createdAt: new Date().toISOString(),
        formData: { ...formData },
        topDestination,
        rankedDestinations,
        recommendationSummary: {
            primaryCity: topDestination.name,
            score: topDestination.scores.final,
            tagline: topDestination.tagline,
            highlights: topDestination.highlights
        }
    };

    try {
        localStorage.setItem('india_tourist_active_profile', JSON.stringify(profile));
        const history = getStoredProfileHistory();
        const updated = [profile, ...history.filter(p => p.id !== profile.id)].slice(0, 10);
        localStorage.setItem('india_tourist_profile_history', JSON.stringify(updated));
    } catch (e) {
        console.error('Error saving profile:', e);
    }

    return profile;
};

export const getStoredUserProfile = () => {
    try {
        const item = localStorage.getItem('india_tourist_active_profile');
        if (item) return JSON.parse(item);
    } catch (e) {
        console.error(e);
    }
    return null;
};

export const getStoredProfileHistory = () => {
    try {
        const item = localStorage.getItem('india_tourist_profile_history');
        if (item) return JSON.parse(item);
    } catch (e) {
        console.error(e);
    }
    return [];
};

/**
 * Master 7-Day Curated Circuit & Guide Generator
 * Generates an in-depth, structured Day-by-Day itinerary tailored from 1 to 7 days
 * for the user's top recommended city and regional circuit stops.
 */
export const generateComprehensiveItinerary = (primaryCity, allRanked, totalDays = 3, userInterests = []) => {
    const pId = primaryCity.id;
    const days = [];

    // Master 7-Day Day Templates per primary city
    const MASTER_PLANS = {
        banaras: [
            {
                day: 1,
                city: 'Banaras (Varanasi)',
                cityId: 'banaras',
                title: 'Sacred Ghats, Ancient Corridors & Celestial Aarti',
                theme: 'Spiritual Awakening & Riverfront Culture',
                morning: {
                    time: '6:00 AM – 11:30 AM',
                    activity: 'Sunrise Ganges Rowboat from Assi to Manikarnika Ghat',
                    description: 'Start at dawn with Subah-e-Banaras Vedic chants at Assi Ghat, followed by a peaceful wooden rowboat ride past historic palatial ghats.',
                    foodTip: 'Hot Kachori-Jalebi at Ram Bhandar in Thatheri Gali'
                },
                afternoon: {
                    time: '1:00 PM – 4:30 PM',
                    activity: 'Kashi Vishwanath Jyotirlinga & Golden Temple Darshan',
                    description: 'Walk through the majestic Kashi Vishwanath marble corridor connecting the temple directly to the holy river.',
                    foodTip: 'Traditional Banarasi Satvik Thali at Keshari Restaurant'
                },
                evening: {
                    time: '5:30 PM – 8:30 PM',
                    activity: 'Dashashwamedh Ghat Grand Evening Ganga Aarti',
                    description: 'Watch high priests chant Vedic mantras with glowing brass oil lamps, conch shells, and thousands of floating diyas.',
                    foodTip: 'Creamy Blue Lassi & authentic Banarasi Meetha Paan'
                },
                stay: {
                    type: 'Riverfront Heritage Haveli',
                    recommendation: 'Heritage Haveli near Godowlia Chowk or Assi Ghat for quick river access'
                },
                transit: {
                    route: 'Walking through ancient heritage galis + battery e-rickshaw',
                    distance: '4–6 km intra-city'
                },
                packingTip: 'Slip-on shoes for temple entry and modest breathable attire.'
            },
            {
                day: 2,
                city: 'Banaras & Sarnath',
                cityId: 'banaras',
                title: 'Buddha’s First Sermon, Silk Looms & Classical Arts',
                theme: 'Buddhist Heritage, Textiles & Cultural Legacy',
                morning: {
                    time: '8:30 AM – 12:30 PM',
                    activity: 'Sarnath Buddhist Stupas & Ashoka Pillar Museum',
                    description: 'Visit Dhamek Stupa where Lord Buddha gave his first sermon (Dharmachakra Pravartana) and see the original 4-lion Ashoka Capital.',
                    foodTip: 'Breakfast tea and fresh samosas near Sarnath museum road'
                },
                afternoon: {
                    time: '1:30 PM – 4:30 PM',
                    activity: 'Banarasi Zari Silk Weaving Masterclass & Ramnagar Fort',
                    description: 'Watch hereditary master weavers create authentic Katan silk brocades, followed by an excursion to the 18th-century Ramnagar sandstone fort.',
                    foodTip: 'Famous chilled Lassi outside Ramnagar Fort main gate'
                },
                evening: {
                    time: '5:30 PM – 8:30 PM',
                    activity: 'Assi Ghat Classical Music & Ganga Boating',
                    description: 'Enjoy classical sitar and tabla recitals on the riverfront, followed by a stroll along the vibrant cafes of Assi.',
                    foodTip: 'Woodfired thin-crust pizza & apple pie at Pizzeria Vaatika Assi'
                },
                stay: {
                    type: 'Boutique City Hotel',
                    recommendation: 'Boutique property in Cantt or Assi Ghat'
                },
                transit: {
                    route: 'AC Cab / Auto: Varanasi $\\rightarrow$ Sarnath (10 km, ~30 min) $\\rightarrow$ Ramnagar (14 km)',
                    distance: '28 km total circuit'
                },
                packingTip: 'Camera with zoom lens for museum artifacts and Buddhist stupas.'
            },
            {
                day: 3,
                city: 'Mirzapur',
                cityId: 'mirzapur',
                title: 'Cascading Waterfalls & Scenic Vindhya Gorges',
                theme: 'Wilderness Escapes, Waterfalls & Dam Lakes',
                morning: {
                    time: '7:30 AM – 12:00 PM',
                    activity: 'Scenic Drive to Wyndham Falls & Nature Gorge Trek',
                    description: 'Drive from Varanasi across the Vindhya foothills to Wyndham Falls. Hike down rock stepping pools and enjoy the fresh mountain air.',
                    foodTip: 'Pack fresh breakfast or stop for highway tea & poori-sabzi'
                },
                afternoon: {
                    time: '1:00 PM – 4:00 PM',
                    activity: 'Sirsi Dam Reservoir & Foaming Cascades',
                    description: 'Marvel at the sprawling green hills around Sirsi Dam lake and relax beside the foaming water overflow cascades.',
                    foodTip: 'Local Dhaba lunch: hot Arhar Dal, spicy Aloo Bhujia & fresh Rotis'
                },
                evening: {
                    time: '4:30 PM – 7:30 PM',
                    activity: 'Tanda Falls Sunset Walk & Vindhya Hill Panorama',
                    description: 'Quiet nature walk around Tanda Falls natural stone terraces surrounded by scrub forests and migratory birds.',
                    foodTip: 'Fresh evening snacks and tea in Mirzapur town'
                },
                stay: {
                    type: 'Nature Resort or Vindhyachal Hotel',
                    recommendation: 'Resort near Vindhyachal hills or heritage stay in Mirzapur'
                },
                transit: {
                    route: 'AC Cab: Varanasi $\\rightarrow$ Wyndham Falls Mirzapur (65 km, 1.5 hrs via NH 135A)',
                    distance: '85 km total daily drive'
                },
                packingTip: 'Trekking sports shoes with rubber grip for wet rocks & extra towel.'
            },
            {
                day: 4,
                city: 'Mirzapur',
                cityId: 'mirzapur',
                title: 'Vindhyachal Shaktipeeth Pilgrimage & 56 BC Chunar Fort',
                theme: 'Sacred Hilltop Shrines & Ancient Citadels',
                morning: {
                    time: '6:30 AM – 11:30 AM',
                    activity: 'Maa Vindhyavasini Darshan & Ashtabhuja Hill Ropeway',
                    description: 'Complete the sacred Trikona Parikrama: Maa Vindhyavasini Devi (wealth), Kali Khoh cave shrine, and Ashtabhuja ropeway with hilltop views.',
                    foodTip: 'Vindhyachal Temple Prasad and pure ghee pedas'
                },
                afternoon: {
                    time: '1:00 PM – 4:30 PM',
                    activity: 'Chunar Fort Overlooking the Ganga Cliff',
                    description: 'Explore the impregnable 56 BC cliffside fortress of Sher Shah Suri, the Sonwa Mandap, and the 180° panorama of the curving Ganga river.',
                    foodTip: 'Traditional Litti Chokha with desi ghee in Chunar bazaar'
                },
                evening: {
                    time: '5:00 PM – 7:30 PM',
                    activity: 'Mirzapur Handcrafted Woolen Carpet & Brass Tour',
                    description: 'Visit hereditary master weavers crafting Persian-style knotted carpets and bell-metal brass casting workshops.',
                    foodTip: 'Crispy samosas and Jalebis at Mirzapur Clock Tower chowk'
                },
                stay: {
                    type: 'Heritage Hotel',
                    recommendation: 'Stay in Mirzapur / Vindhyachal or transit towards Sonbhadra'
                },
                transit: {
                    route: 'AC Cab: Vindhyachal $\\rightarrow$ Chunar Fort (32 km, 45 min)',
                    distance: '50 km day drive'
                },
                packingTip: 'Modest temple clothing and hat/sunglasses for fort walking.'
            },
            {
                day: 5,
                city: 'Sonbhadra',
                cityId: 'sonbhadra',
                title: '1.4-Billion-Year-Old Fossils & Prehistoric Rock Art',
                theme: 'Deep Earth History, Mesolithic Caves & Giant Lakes',
                morning: {
                    time: '8:00 AM – 12:30 PM',
                    activity: 'Salkhan Fossil Park Guided Geological Exploration',
                    description: 'Walk among 1.4-billion-year-old fossilized stromatolites (cyanobacteria trees) that predated dinosaurs and animal life on earth.',
                    foodTip: 'Hearty breakfast in Robertsganj market'
                },
                afternoon: {
                    time: '1:30 PM – 4:30 PM',
                    activity: 'Panchmukhi Prehistoric Rock Paintings & Mukha Falls',
                    description: 'Discover red-ochre cave shelters painted by Stone Age humans depicting hunting scenes, followed by a trek to Mukha canyon falls.',
                    foodTip: 'Local tribal lunch featuring roasted maize and seasonal curries'
                },
                evening: {
                    time: '5:00 PM – 7:30 PM',
                    activity: 'Govind Ballabh Pant Sagar & Rihand Dam Sunset',
                    description: 'Watch the sunset over one of Asia’s largest artificial lakes looking out like an endless inland sea.',
                    foodTip: 'Fresh local river fish fry or traditional vegetarian thali'
                },
                stay: {
                    type: 'Eco Resort / Hotel',
                    recommendation: 'Hotel / Forest Guest House in Robertsganj or Renukoot'
                },
                transit: {
                    route: 'AC Cab: Mirzapur $\\rightarrow$ Robertsganj $\\rightarrow$ Salkhan (75 km, ~2 hrs via SH 5A)',
                    distance: '110 km scenic hill drive'
                },
                packingTip: 'Camera with macro lens for fossil concentric rings and hiking boots.'
            },
            {
                day: 6,
                city: 'Allahabad (Prayagraj)',
                cityId: 'allahabad',
                title: 'Sacred Confluence of Triveni Sangam & Akbar’s Fort',
                theme: 'The Holy Confluence & Imperial Fortifications',
                morning: {
                    time: '6:30 AM – 11:30 AM',
                    activity: 'Triveni Sangam Sacred Confluence Boat Ride & Holy Snan',
                    description: 'Take a wooden boat to the exact meeting point of Ganga, Yamuna, and invisible Saraswati where you can feed migratory Siberian seagulls.',
                    foodTip: 'Netram Mulchand pure ghee Kachori-Jalebi thali in Katra'
                },
                afternoon: {
                    time: '1:00 PM – 4:30 PM',
                    activity: 'Historic Allahabad Fort, Patalpuri & Bade Hanuman Temple',
                    description: 'Visit Akbar’s 1583 AD sandstone fort, the immortal Akshayavat tree, and the unique 20-foot underground reclining Hanuman idol.',
                    foodTip: 'Famous Dehati ke Rasgulle near Civil Lines'
                },
                evening: {
                    time: '5:00 PM – 8:00 PM',
                    activity: 'Sangam Promenade Sunset & Ghat Evening Aarti',
                    description: 'Stroll along the sprawling Sangam riverbanks as lights reflect across the vast waters, enjoying the peaceful atmosphere.',
                    foodTip: 'Evening Chaat, Dahi Bhalle and Kulfi at Civil Lines'
                },
                stay: {
                    type: 'City Boutique Hotel',
                    recommendation: 'Heritage or 4-Star Hotel in Civil Lines Prayagraj'
                },
                transit: {
                    route: 'AC Cab / Train: Sonbhadra/Varanasi $\\rightarrow$ Prayagraj (125 km, ~2.5 hrs)',
                    distance: '130 km highway transit'
                },
                packingTip: 'Quick-dry clothes and towel for the sacred Sangam boat ride.'
            },
            {
                day: 7,
                city: 'Allahabad & Farewell',
                cityId: 'allahabad',
                title: 'Mughal Mausoleums, Anand Bhawan & Farewell Souvenirs',
                theme: 'Literary Culture, Freedom Movement & Departure',
                morning: {
                    time: '8:30 AM – 12:00 PM',
                    activity: 'Khusro Bagh Mughal Gardens & Persian Fresco Tombs',
                    description: 'Explore the walled Mughal garden with magnificent carved sandstone mausoleums of Prince Khusrau and sweet guava orchards.',
                    foodTip: 'Spicy Samosas & Gulab Jamun at Hari Ram & Sons in Loknath'
                },
                afternoon: {
                    time: '1:00 PM – 4:00 PM',
                    activity: 'Anand Bhawan Freedom Mansion & Jawahar Planetarium',
                    description: 'Tour the ancestral home of the Nehru-Gandhi family preserving original rooms, library, and exhibits from India’s independence movement.',
                    foodTip: 'Coffee & snacks at historic Indian Coffee House Civil Lines'
                },
                evening: {
                    time: '4:30 PM – 7:30 PM',
                    activity: 'Souvenir Shopping & Departure Connection',
                    description: 'Shop for Allahabad Surkha guavas, Banarasi silk scarves, and brass keepsakes before boarding your onward train or flight.',
                    foodTip: 'Farewell dinner at El Chico Civil Lines'
                },
                stay: {
                    type: 'Departure',
                    recommendation: 'Proceed to Prayagraj / Varanasi Junction or Airport'
                },
                transit: {
                    route: 'Local city transit $\\rightarrow$ Prayagraj Chheoki / Junction or VNS Airport',
                    distance: '15–30 km to departure hub'
                },
                packingTip: 'Ensure souvenirs & sweets are securely packed for transit.'
            }
        ],
        mirzapur: [
            {
                day: 1,
                city: 'Mirzapur',
                cityId: 'mirzapur',
                title: 'Cascading Waterfalls, Stepping Pools & Sirsi Lake',
                theme: 'Nature Cascades & Vindhya Mountain Gorges',
                morning: {
                    time: '8:00 AM – 12:00 PM',
                    activity: 'Wyndham Falls Trek & Natural Swimming Pools',
                    description: 'Explore the multi-tiered natural waterfall gorge, stepping along natural stone terraces surrounded by Vindhyan greenery.',
                    foodTip: 'Hot Poori-Sabzi and masala chai at scenic viewpoint'
                },
                afternoon: {
                    time: '1:00 PM – 4:00 PM',
                    activity: 'Sirsi Dam Reservoir & Foaming Overflow Cascades',
                    description: 'Visit the vast water reservoir and take in panoramic views of the water plunging over the dam gates into the gorge.',
                    foodTip: 'Local Dhaba meal: freshly cooked Dal Tadka and hot Rotis'
                },
                evening: {
                    time: '4:30 PM – 7:30 PM',
                    activity: 'Tanda Falls Sunset Walk & Bird Watching',
                    description: 'Quiet nature walk along Tanda falls as the evening light paints the rocky Vindhya hills in golden hues.',
                    foodTip: 'Evening tea and hot samosas in Mirzapur market'
                },
                stay: {
                    type: 'Nature Resort',
                    recommendation: 'Eco-resort or hotel near Vindhyachal hills'
                },
                transit: {
                    route: 'AC Cab: Pickup $\\rightarrow$ Wyndham Falls $\\rightarrow$ Sirsi Dam $\\rightarrow$ Tanda',
                    distance: '45 km scenic drive'
                },
                packingTip: 'Sturdy walking shoes with rubber grip for wet rocks.'
            },
            {
                day: 2,
                city: 'Mirzapur',
                cityId: 'mirzapur',
                title: 'Maa Vindhyavasini Shaktipeeth & Ancient Chunar Fort',
                theme: 'Sacred Hilltop Pilgrimage & Ganga Cliff Fortress',
                morning: {
                    time: '6:30 AM – 11:30 AM',
                    activity: 'Vindhyachal Shaktipeeth & Ashtabhuja Ropeway',
                    description: 'Darshan at Maa Vindhyavasini Devi mandir, Kali Khoh cave shrine, and ropeway ascent to Ashtabhuja hill shrine.',
                    foodTip: 'Vindhyachal Temple pure ghee Pedas & fresh breakfast'
                },
                afternoon: {
                    time: '1:00 PM – 4:30 PM',
                    activity: '56 BC Chunar Fort Overlooking the Ganges',
                    description: 'Explore the historic fortress of Sher Shah Suri and Warren Hastings perched high on the Ganga cliff with 180° river views.',
                    foodTip: 'Famous Chunar Litti Chokha with desi ghee'
                },
                evening: {
                    time: '5:00 PM – 7:30 PM',
                    activity: 'Handloom Carpet Weaving & Brass Artisan Guilds',
                    description: 'Witness master artisans hand-knotting Persian-style woolen carpets and casting traditional bell-metal brass utensils.',
                    foodTip: 'Crispy Jalebis & Rabri in Mirzapur chowk'
                },
                stay: {
                    type: 'Heritage Hotel',
                    recommendation: 'Stay in Mirzapur or transit towards Sonbhadra / Varanasi'
                },
                transit: {
                    route: 'AC Cab: Vindhyachal $\\rightarrow$ Chunar Fort (32 km, 45 min)',
                    distance: '40 km day drive'
                },
                packingTip: 'Modest attire for temple & sunglasses for fort exploration.'
            },
            {
                day: 3,
                city: 'Sonbhadra',
                cityId: 'sonbhadra',
                title: '1.4-Billion-Yr Fossil Park & Prehistoric Cave Art',
                theme: 'Deep Geology & Stone Age Rock Shelters',
                morning: {
                    time: '8:00 AM – 12:30 PM',
                    activity: 'Salkhan Fossil Park Guided Geology Walk',
                    description: 'Explore giant fossilized stromatolite tree trunks dating back 1.4 billion years—older than the Grand Canyon fossils.',
                    foodTip: 'Hearty breakfast in Robertsganj'
                },
                afternoon: {
                    time: '1:30 PM – 4:30 PM',
                    activity: 'Panchmukhi Prehistoric Rock Art & Mukha Falls Trek',
                    description: 'Discover ancient cave paintings in red ochre depicting prehistoric life, followed by a hike to Mukha canyon falls.',
                    foodTip: 'Local roasted corn and authentic UP thali'
                },
                evening: {
                    time: '5:00 PM – 7:30 PM',
                    activity: 'Govind Ballabh Pant Sagar Reservoir Sunset',
                    description: 'Relax by the shores of the inland sea reservoir surrounded by forested hill ranges.',
                    foodTip: 'Fresh evening dinner at Renukoot / Robertsganj'
                },
                stay: {
                    type: 'Forest / Eco Guest House',
                    recommendation: 'Comfortable hotel in Robertsganj or eco guest house'
                },
                transit: {
                    route: 'AC Cab: Mirzapur $\\rightarrow$ Robertsganj $\\rightarrow$ Salkhan (75 km, 2 hrs)',
                    distance: '100 km hill drive'
                },
                packingTip: 'Camera with macro lens and light jacket for evening.'
            },
            {
                day: 4,
                city: 'Sonbhadra to Banaras',
                cityId: 'banaras',
                title: 'Scenic Hill Pass & Welcome to the Sacred City',
                theme: 'Vindhya Mountain Crossing to River Ganges',
                morning: {
                    time: '8:30 AM – 12:00 PM',
                    activity: 'Vijaygarh Fort Hilltop Trek or Scenic Drive to Varanasi',
                    description: 'Trek the historic 5th-century mountain citadel or take a scenic drive through Vindhya forest passes toward Varanasi.',
                    foodTip: 'Highway Dhaba tea and breakfast'
                },
                afternoon: {
                    time: '1:30 PM – 4:30 PM',
                    activity: 'Check-in at Riverfront Haveli & Gali Exploration',
                    description: 'Check into your heritage property in Varanasi and take a guided walk through ancient silk and brass alleyways.',
                    foodTip: 'Authentic Banarasi Thali at Keshari'
                },
                evening: {
                    time: '5:30 PM – 8:30 PM',
                    activity: 'Dashashwamedh Ghat Grand Evening Ganga Aarti',
                    description: 'Experience the world-renowned multi-tiered brass lamp ritual from a reserved wooden boat on the Ganges.',
                    foodTip: 'Blue Lassi and Banarasi Paan'
                },
                stay: {
                    type: 'Heritage Haveli',
                    recommendation: 'Riverfront Haveli near Dashashwamedh Ghat'
                },
                transit: {
                    route: 'AC Cab: Sonbhadra $\\rightarrow$ Varanasi (110 km, ~2.5 hrs via NH 35)',
                    distance: '115 km transit'
                },
                packingTip: 'Camera for the evening river aarti.'
            },
            {
                day: 5,
                city: 'Banaras (Varanasi)',
                cityId: 'banaras',
                title: 'Sunrise Rowboat, Kashi Vishwanath & Sarnath',
                theme: 'Spiritual Jyotirlinga & Buddhist Enlightenment',
                morning: {
                    time: '6:00 AM – 11:30 AM',
                    activity: 'Sunrise Ganges Boat Ride & Kashi Vishwanath Darshan',
                    description: 'Rowing boat past 84 ghats from Assi to Manikarnika, followed by darshan at the Kashi Vishwanath Golden Temple.',
                    foodTip: 'Kachori-Jalebi at Ram Bhandar Thatheri Bazaar'
                },
                afternoon: {
                    time: '1:00 PM – 4:30 PM',
                    activity: 'Sarnath Buddhist Stupas & Ashoka Museum',
                    description: 'Visit Dhamek Stupa where Lord Buddha delivered his first sermon and explore the original Ashoka 4-lion pillar.',
                    foodTip: 'Sarnath garden cafe snacks and tea'
                },
                evening: {
                    time: '5:30 PM – 8:30 PM',
                    activity: 'Assi Ghat Subah-e-Banaras Cultural recitals',
                    description: 'Enjoy classical sitar and vocal performances by the riverfront, followed by dinner in Assi cafes.',
                    foodTip: 'Pizzeria Vaatika Assi Ghat'
                },
                stay: {
                    type: 'Heritage Hotel',
                    recommendation: 'Stay in Varanasi (Assi or Godowlia)'
                },
                transit: {
                    route: 'Local E-rickshaw + Cab to Sarnath (10 km, 30 min)',
                    distance: '24 km day circuit'
                },
                packingTip: 'Comfortable walking shoes.'
            },
            {
                day: 6,
                city: 'Allahabad (Prayagraj)',
                cityId: 'allahabad',
                title: 'Holy Confluence at Triveni Sangam & Akbar Fort',
                theme: 'Confluence Dip, Forts & Underground Shrines',
                morning: {
                    time: '6:30 AM – 11:30 AM',
                    activity: 'Triveni Sangam Boat Ride & Sacred Bathing Ritual',
                    description: 'Boat ride to the holy confluence of Ganga, Yamuna & Saraswati with migratory Siberian seagulls.',
                    foodTip: 'Netram Mulchand pure ghee Kachori thali'
                },
                afternoon: {
                    time: '1:00 PM – 4:30 PM',
                    activity: 'Allahabad Fort, Akshayavat Tree & Bade Hanuman Temple',
                    description: 'Visit Akbar’s 1583 AD fortress, the immortal banyan tree, and the 20-foot underground reclining Hanuman temple.',
                    foodTip: 'Dehati ke Rasgulle near Civil Lines'
                },
                evening: {
                    time: '5:00 PM – 8:00 PM',
                    activity: 'Sangam Ghat Promenade & Evening Cultural Stroll',
                    description: 'Enjoy a peaceful evening walk along the Sangam riverbanks and watch twilight reflections.',
                    foodTip: 'Loknath Street Chaat & Rabri Kulfi'
                },
                stay: {
                    type: 'Boutique Hotel',
                    recommendation: 'Hotel in Civil Lines Prayagraj'
                },
                transit: {
                    route: 'AC Cab: Varanasi $\\rightarrow$ Prayagraj (125 km, ~2.5 hrs via NH 19)',
                    distance: '130 km highway'
                },
                packingTip: 'Quick dry clothes for holy dip.'
            },
            {
                day: 7,
                city: 'Allahabad & Farewell',
                cityId: 'allahabad',
                title: 'Mughal Khusro Bagh, Anand Bhawan & Departure',
                theme: 'Historic Mansions, Mughal Tombs & Farewell',
                morning: {
                    time: '8:30 AM – 12:00 PM',
                    activity: 'Khusro Bagh Mughal Fresco Garden & Mausoleums',
                    description: 'Wander through peaceful 17th-century sandstone tombs of Prince Khusrau and surrounding guava orchards.',
                    foodTip: 'Hari Ram & Sons spicy samosas in Loknath'
                },
                afternoon: {
                    time: '1:00 PM – 4:00 PM',
                    activity: 'Anand Bhawan Freedom Mansion & Jawahar Planetarium',
                    description: 'Explore the ancestral estate of the Nehru family and its role in India’s freedom movement.',
                    foodTip: 'Indian Coffee House Civil Lines'
                },
                evening: {
                    time: '4:30 PM – 7:30 PM',
                    activity: 'Souvenir Shopping & Farewell Departure',
                    description: 'Pick up Allahabad Surkha pink guavas and brass souvenirs before heading to Prayagraj Junction or airport.',
                    foodTip: 'Farewell dinner at El Chico'
                },
                stay: {
                    type: 'Departure',
                    recommendation: 'Departure from Prayagraj / Varanasi Junction or Airport'
                },
                transit: {
                    route: 'Local city transit to station / airport',
                    distance: '15 km'
                },
                packingTip: 'Pack memories and souvenirs safely.'
            }
        ]
    };

    // Pick template list matching primary city or fallback to banaras/mirzapur
    let templateList = MASTER_PLANS[pId] || MASTER_PLANS.banaras;

    // Build the exact required number of days (1 to 7)
    for (let i = 0; i < totalDays && i < templateList.length; i++) {
        days.push({
            ...templateList[i],
            day: i + 1
        });
    }

    return days;
};

