// scoringService.js - Multi-Factor Recommendation & Scoring Engine for Eastern UP

// Helper for Google Images & Maps URL generation
export const getGoogleImagesUrl = (placeName, cityName = 'Uttar Pradesh') => {
    const query = `${placeName} ${cityName} tourist attraction real photos`;
    return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
};

export const getGoogleMapsPlaceUrl = (placeName, cityName = 'Uttar Pradesh') => {
    const query = `${placeName}, ${cityName}, Uttar Pradesh`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

// Target 4 Cities of Uttar Pradesh
export const UP_CITIES = [
    {
        id: 'banaras',
        name: 'Banaras (Varanasi)',
        tagline: 'Eternal Ghats, Sacred Temples & Classical Heritage',
        image: '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
        images: [
            '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
            '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple.jpg',
            '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
            '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi).jpg'
        ],
        googleImagesUrl: getGoogleImagesUrl('Varanasi Ghats and Temples', 'Banaras'),
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
                image: '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
                images: [
                    '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
                    '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat1.jpg',
                    '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat2.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Dashashwamedh Ghat Ganga Aarti', 'Varanasi'),
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
                image: '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple.jpg',
                images: [
                    '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple.jpg',
                    '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple1.jpg',
                    '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple2.jpg',
                    '/varansi/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi).jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Kashi Vishwanath Temple Corridor', 'Varanasi'),
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
                image: '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
                images: [
                    '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
                    '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi1.jpg',
                    '/varansi/Manikarnika Ghat/Manikarnika Ghat.jpg',
                    '/varansi/Manikarnika Ghat/Manikarnika Ghat1.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Assi Ghat Sunrise Boat Cruise', 'Varanasi'),
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
                image: '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi).jpg',
                images: [
                    '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi).jpg',
                    '/varansi/Dhamek Stupa Sarnath, (Varanasi)/2.jpg',
                    '/varansi/Dhamek Stupa Sarnath, (Varanasi)/25.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Sarnath Dhamek Stupa Ashoka Pillar', 'Varanasi'),
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
                image: '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi2.jpg',
                images: [
                    '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi2.jpg',
                    '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
                    '/varansi/Manikarnika Ghat/Manikarnika Ghat.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Banarasi Silk Weaving Street Food Chowk', 'Varanasi'),
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
                image: '/varansi/Ramnagar Fort/Ramnagar Fort.jpg',
                images: [
                    '/varansi/Ramnagar Fort/Ramnagar Fort.jpg',
                    '/varansi/Ramnagar Fort/Ramnagar Fort1.jpg',
                    '/varansi/Ramnagar Fort/Ramnagar Fort10.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Ramnagar Fort Royal Palace', 'Varanasi'),
                tags: ['Fortress', 'Royal Museum', 'Mughal Architecture']
            }
        ]
    },
    {
        id: 'allahabad',
        name: 'Allahabad (Prayagraj)',
        tagline: 'Sacred Triveni Sangam, Grand Forts & Cultural Legacy',
        image: '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
        images: [
            '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
            '/allahabad/allahabad-fort/allahabad-fort-1.jpg',
            '/allahabad/anand-bhawan/anand-bhawan-1.jpg',
            '/allahabad/khusro-bagh/khusro-bagh-1.jpg'
        ],
        googleImagesUrl: getGoogleImagesUrl('Triveni Sangam Allahabad Fort', 'Prayagraj'),
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
                image: '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
                images: [
                    '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
                    '/allahabad/triveni-sangam/triveni-sangam-2.jpg',
                    '/allahabad/triveni-sangam/triveni-sangam-3.jpg',
                    '/allahabad/triveni-sangam/triveni-sangam-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Triveni Sangam Ghats Boat Ride', 'Prayagraj'),
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
                image: '/allahabad/allahabad-fort/allahabad-fort-1.jpg',
                images: [
                    '/allahabad/allahabad-fort/allahabad-fort-1.jpg',
                    '/allahabad/allahabad-fort/allahabad-fort-2.jpg',
                    '/allahabad/allahabad-fort/allahabad-fort-3.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Allahabad Akbar Fort Akshayavat', 'Prayagraj'),
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
                image: '/allahabad/anand-bhawan/anand-bhawan-1.jpg',
                images: [
                    '/allahabad/anand-bhawan/anand-bhawan-1.jpg',
                    '/allahabad/anand-bhawan/anand-bhawan-2.jpg',
                    '/allahabad/anand-bhawan/anand-bhawan-3.jpg',
                    '/allahabad/anand-bhawan/anand-bhawan-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Anand Bhawan Planetarium', 'Prayagraj'),
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
                image: '/allahabad/bade-hanuman/bade-hanuman-1.jpg',
                images: [
                    '/allahabad/bade-hanuman/bade-hanuman-1.jpg',
                    '/allahabad/bade-hanuman/bade-hanuman-2.jpg',
                    '/allahabad/bade-hanuman/bade-hanuman-3.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Letey Hanuman Ji Bade Mandir', 'Prayagraj'),
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
                image: '/allahabad/khusro-bagh/khusro-bagh-1.jpg',
                images: [
                    '/allahabad/khusro-bagh/khusro-bagh-1.jpg',
                    '/allahabad/khusro-bagh/khusro-bagh-2.jpg',
                    '/allahabad/khusro-bagh/khusro-bagh-3.jpg',
                    '/allahabad/khusro-bagh/khusro-bagh-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Khusro Bagh Mughal Tombs', 'Prayagraj'),
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
                image: '/allahabad/civil-lines/civil-lines-1.jpg',
                images: [
                    '/allahabad/civil-lines/civil-lines-1.jpg',
                    '/allahabad/civil-lines/civil-lines-2.jpg',
                    '/allahabad/civil-lines/civil-lines-3.jpg',
                    '/allahabad/civil-lines/civil-lines-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Netram Kachori Loknath Food', 'Prayagraj'),
                tags: ['Dehati Rasgulla', 'Netram Kachori', 'Street Food']
            }
        ]
    },
    {
        id: 'mirzapur',
        name: 'Mirzapur',
        tagline: 'Cascading Waterfalls, Vindhyavasini Shaktipeeth & Hills',
        image: '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
        images: [
            '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
            '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
            '/mirzapur/chunar-fort/chunar-fort-2.jpg',
            '/mirzapur/tanda-falls/tanda-falls-1.jpg',
            '/mirzapur/ashtabhuja/ashtabhuja-1.jpg',
            '/mirzapur/lakhaniya-dari/lakhaniya-dari-1.jpg'
        ],
        googleImagesUrl: getGoogleImagesUrl('Wyndham Falls Chunar Fort Vindhyachal', 'Mirzapur'),
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
                image: '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
                images: [
                    '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
                    '/mirzapur/wyndham-falls/wyndham-falls-2.jpg',
                    '/mirzapur/wyndham-falls/wyndham-falls-3.jpg',
                    '/mirzapur/wyndham-falls/wyndham-falls-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Wyndham Falls Mirzapur Waterfalls', 'Mirzapur'),
                tags: ['Waterfall Hike', 'Scenic Gorge', 'Nature Photography']
            },
            {
                id: 'm_sirsi',
                title: 'Lakhaniya Dari & Sirsi Waterfalls Gorge Trail',
                category: 'waterfalls',
                categoryLabel: 'Waterfalls & Scenic Nature',
                icon: '🌊',
                bestTime: 'Afternoon (1:00 PM – 3:30 PM)',
                duration: '2 Hours',
                description: 'Magnificent valley gorge waterfalls surrounded by forested green hills where cascading mountain streams create foaming natural pools and scenic trails.',
                insiderTip: 'Local forest guides are available near Ahraura to assist along the boulders.',
                image: '/mirzapur/lakhaniya-dari/lakhaniya-dari-1.jpg',
                images: [
                    '/mirzapur/lakhaniya-dari/lakhaniya-dari-1.jpg',
                    '/mirzapur/lakhaniya-dari/lakhaniya-dari-2.jpg',
                    '/mirzapur/lakhaniya-dari/lakhaniya-dari-3.jpg',
                    '/mirzapur/lakhaniya-dari/lakhaniya-dari-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Lakhaniya Dari Falls Mirzapur', 'Mirzapur'),
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
                image: '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
                images: [
                    '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
                    '/mirzapur/vindhyavasini/vindhyavasini-2.jpg',
                    '/mirzapur/ashtabhuja/ashtabhuja-1.jpg',
                    '/mirzapur/kali-khoh/kali-khoh-1.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Maa Vindhyavasini Temple Ashtabhuja', 'Vindhyachal Mirzapur'),
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
                image: '/mirzapur/chunar-fort/chunar-fort-2.jpg',
                images: [
                    '/mirzapur/chunar-fort/chunar-fort-2.jpg',
                    '/mirzapur/chunar-fort/chunar-fort-1.jpg',
                    '/mirzapur/chunar-fort/chunar-fort-3.jpg',
                    '/mirzapur/chunar-fort/chunar-fort-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Chunar Fort Ganga View', 'Mirzapur'),
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
                image: '/mirzapur/tanda-falls/tanda-falls-1.jpg',
                images: [
                    '/mirzapur/tanda-falls/tanda-falls-1.jpg',
                    '/mirzapur/tanda-falls/tanda-falls-2.jpg',
                    '/mirzapur/tanda-falls/tanda-falls-3.jpg',
                    '/mirzapur/tanda-falls/tanda-falls-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Tanda Falls Mirzapur', 'Mirzapur'),
                tags: ['Forest Trail', 'Bird Watching', 'Natural Stepping Waterfall']
            },
            {
                id: 'm_crafts',
                title: 'Pakka Ghat, Ghanta Ghar & Mirzapur Crafts Tour',
                category: 'ghats_culture',
                categoryLabel: 'Culture & Heritage',
                icon: '🧶',
                bestTime: 'Late Afternoon',
                duration: '2 Hours',
                description: 'Stroll along the historic sandstone Pakka Ghat on the Ganga, view the 1891 Victorian Ghanta Ghar, and visit traditional hand-knotted Persian wool carpet and brass artisan looms.',
                insiderTip: 'Pakka Ghat evening aarti and sweet pedas near the riverfront are a must-try.',
                image: '/mirzapur/pakka-ghat/pakka-ghat-2.jpg',
                images: [
                    '/mirzapur/pakka-ghat/pakka-ghat-2.jpg',
                    '/mirzapur/pakka-ghat/pakka-ghat-1.jpg',
                    '/mirzapur/ghanta-ghar/ghanta-ghar-1.jpg',
                    '/mirzapur/lal-bhairav/lal-bhairav-2.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Mirzapur Pakka Ghat Ghanta Ghar Brass', 'Mirzapur'),
                tags: ['Pakka Ghat', 'Ghanta Ghar', 'Handloom Carpets', 'Brass Artisans']
            }
        ]
    },
    {
        id: 'sonbhadra',
        name: 'Sonbhadra',
        tagline: 'Fossil Parks, Prehistoric Cave Art, Forests & Giant Dams',
        image: '/sonebhadra/fossils-park/fossils-park-1.jpg',
        images: [
            '/sonebhadra/fossils-park/fossils-park-1.jpg',
            '/sonebhadra/vijaygarh-fort/IMG_1265626b-80b9-4a5e-8379-1d9a15f4ccf3.webp',
            '/sonebhadra/mukkha-fall/IMG_0aa06ed5-3131-44c8-81f4-ba6428603d3f.png',
            '/sonebhadra/rihand-dam/IMG_0408a34d-d68e-4adb-832e-b8afe460964b.webp',
            '/sonebhadra/agori-fort/agori-fort-1.jpg',
            '/sonebhadra/dhandharoul-dam/dhandharoul-dam-1.jpg'
        ],
        googleImagesUrl: getGoogleImagesUrl('Salkhan Fossil Park Rihand Dam Mukha Falls', 'Sonbhadra'),
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
                image: '/sonebhadra/fossils-park/fossils-park-1.jpg',
                images: [
                    '/sonebhadra/fossils-park/fossils-park-1.jpg',
                    '/sonebhadra/fossils-park/fossils-park-2.jpg',
                    '/sonebhadra/fossils-park/fossils-park-3.jpg',
                    '/sonebhadra/fossils-park/fossils-park-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Salkhan Fossil Park Stromatolites', 'Sonbhadra'),
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
                image: '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                images: [
                    '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                    '/sonebhadra/sun-eco-point/sun-eco-point-2.jpg',
                    '/sonebhadra/sun-eco-point/sun-eco-point-3.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Panchmukhi Prehistoric Rock Art Caves', 'Sonbhadra'),
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
                image: '/sonebhadra/mukkha-fall/mukkha-fall-1.jpg',
                images: [
                    '/sonebhadra/mukkha-fall/mukkha-fall-1.jpg',
                    '/sonebhadra/mukkha-fall/mukkha-fall-2.jpg',
                    '/sonebhadra/mukkha-fall/mukkha-fall-3.jpg',
                    '/sonebhadra/mukkha-fall/mukkha-fall-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Mukha Falls Belan River Canyon', 'Sonbhadra'),
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
                image: '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
                images: [
                    '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
                    '/sonebhadra/rihand-dam/rihand-dam-2.jpg',
                    '/sonebhadra/rihand-dam/rihand-dam-3.jpg',
                    '/sonebhadra/rihand-dam/rihand-dam-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Rihand Dam Govind Ballabh Pant Sagar', 'Sonbhadra'),
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
                image: '/sonebhadra/vijaygarh-fort/vijaygarh-fort-1.jpg',
                images: [
                    '/sonebhadra/vijaygarh-fort/vijaygarh-fort-1.jpg',
                    '/sonebhadra/vijaygarh-fort/vijaygarh-fort-2.jpg',
                    '/sonebhadra/vijaygarh-fort/vijaygarh-fort-3.jpg',
                    '/sonebhadra/vijaygarh-fort/vijaygarh-fort-4.jpg'
                ],
                googleImagesUrl: getGoogleImagesUrl('Vijaygarh Fort Mountain Citadel', 'Sonbhadra'),
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
    { id: 'ghats_culture', label: 'Ghats, Boating & Cultural Heritage', icon: '🚣', color: '#C6A969' }
];

export const BUDGET_OPTIONS = [
    {
        id: 'budget',
        label: 'Budget-Friendly',
        subtitle: '₹1,000 – ₹2,200 / day',
        icon: '🪙',
        image: '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
        desc: 'Economical sightseeing, shared transit & pocket-saver tourist entry passes.'
    },
    {
        id: 'moderate',
        label: 'Standard & Comfortable',
        subtitle: '₹2,500 – ₹4,800 / day',
        icon: '🌟',
        image: '/mirzapur/chunar-fort/chunar-fort-1.jpg',
        desc: 'Private AC cab with chauffeur, guided attraction tours & all tourist permits.'
    },
    {
        id: 'luxury',
        label: 'Premium & Luxury',
        subtitle: '₹5,500+ / day',
        icon: '👑',
        image: '/varansi/Ramnagar Fort/Ramnagar Fort.jpg',
        desc: 'VIP temple darshan, private luxury river cruises & dedicated historian guide.'
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
        let interestScore = 80;
        if (selectedInterests && selectedInterests.length > 0) {
            const scores = selectedInterests.map(intId => {
                if (city.affinities[intId] !== undefined) {
                    return city.affinities[intId];
                }
                return 40;
            });
            const avg = scores.reduce((sum, val) => sum + val, 0) / scores.length;
            const maxVal = Math.max(...scores);
            // Standout bonus for exceptional match in at least one chosen category
            const bonus = maxVal >= 95 ? 3 : (maxVal >= 90 ? 2 : 0);
            interestScore = Math.min(100, Math.round(avg + bonus));
        }

        // 2. Calculate Budget Match (0 - 100) -> Weight: 20%
        const budgetScore = city.budgetFit[budgetTier] || 85;

        // 3. Calculate Distance / Proximity Match (0 - 100) -> Weight: 25%
        let distanceScore = 80;
        if (pickupLoc.includes('varanasi') || pickupLoc.includes('banaras') || pickupLoc.includes('kashi')) {
            if (city.id === 'banaras') distanceScore = 100;
            else if (city.id === 'mirzapur') distanceScore = 86;
            else if (city.id === 'allahabad') distanceScore = 78;
            else if (city.id === 'sonbhadra') distanceScore = 70;
        } else if (pickupLoc.includes('allahabad') || pickupLoc.includes('prayagraj')) {
            if (city.id === 'allahabad') distanceScore = 100;
            else if (city.id === 'mirzapur') distanceScore = 86;
            else if (city.id === 'banaras') distanceScore = 78;
            else if (city.id === 'sonbhadra') distanceScore = 68;
        } else if (pickupLoc.includes('mirzapur')) {
            if (city.id === 'mirzapur') distanceScore = 100;
            else if (city.id === 'banaras') distanceScore = 88;
            else if (city.id === 'sonbhadra') distanceScore = 84;
            else if (city.id === 'allahabad') distanceScore = 78;
        } else if (pickupLoc.includes('sonbhadra') || pickupLoc.includes('robertsganj')) {
            if (city.id === 'sonbhadra') distanceScore = 100;
            else if (city.id === 'mirzapur') distanceScore = 88;
            else if (city.id === 'banaras') distanceScore = 76;
            else if (city.id === 'allahabad') distanceScore = 68;
        } else if (pickupLoc.includes('lucknow')) {
            if (city.id === 'allahabad') distanceScore = 96;
            else if (city.id === 'banaras') distanceScore = 88;
            else if (city.id === 'mirzapur') distanceScore = 80;
            else if (city.id === 'sonbhadra') distanceScore = 70;
        } else if (pickupLoc.includes('delhi')) {
            if (city.id === 'allahabad') distanceScore = 92;
            else if (city.id === 'banaras') distanceScore = 90;
            else if (city.id === 'mirzapur') distanceScore = 82;
            else if (city.id === 'sonbhadra') distanceScore = 74;
        } else {
            if (city.id === 'banaras') distanceScore = 96;
            else if (city.id === 'mirzapur') distanceScore = 86;
            else if (city.id === 'allahabad') distanceScore = 80;
            else if (city.id === 'sonbhadra') distanceScore = 72;
        }

        // 4. Calculate Trip Duration Match (0 - 100) -> Weight: 10%
        let durationScore = 85;
        const [minDays, maxDays] = city.idealDaysRange;
        if (tripDays >= minDays && tripDays <= maxDays) {
            durationScore = 96;
        } else if (tripDays < minDays) {
            durationScore = 75;
        } else {
            durationScore = 92;
        }

        // 5. Calculate Transport Match (0 - 100) -> Weight: 10%
        const transportScore = city.transportFit[transportType] || 90;

        // Apply Exact Weighted Formula: Proximity receives 25% weight so pickup location is respected
        const weightedInterest = interestScore * 0.35;
        const weightedBudget = budgetScore * 0.20;
        const weightedDistance = distanceScore * 0.25;
        const weightedDuration = durationScore * 0.10;
        const weightedTransport = transportScore * 0.10;

        const finalScore = Math.round(
            weightedInterest +
            weightedBudget +
            weightedDistance +
            weightedDuration +
            weightedTransport
        );

        const reasons = [];
        if (interestScore >= 85) reasons.push(`Top interest synergy (${interestScore}%) with selected sights`);
        else if (interestScore >= 75) reasons.push(`Strong interest match (${interestScore}%)`);
        if (budgetScore >= 90) reasons.push(`Ideal fit for ${budgetTier.charAt(0).toUpperCase() + budgetTier.slice(1)} budget`);
        if (distanceScore >= 90) reasons.push(`Direct seamless access from ${formData.pickupLocation || 'starting point'}`);
        else if (distanceScore >= 82) reasons.push(`Convenient transit connection`);
        if (durationScore >= 90) reasons.push(`Optimal for ${tripDays}-day duration`);

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
 * Master Trip Plan Generator: Constructs the central "Trip Plan Object"
 * which serves as the single source of truth for:
 * 1. Itinerary
 * 2. Map & Route
 * 3. Food & Stay
 * 4. AI Travel Guide
 */
export const generateTripPlan = (formData, customRanked = null) => {
    const ranked = customRanked || evaluateUPDestinations(formData);
    const totalDays = Math.max(1, Math.min(14, Number(formData.days) || 3));
    const people = Math.max(1, Number(formData.people) || 2);
    const budgetTier = formData.budget || 'moderate';
    const transportType = formData.transport || 'cab';
    const userInterests = formData.landscapes || ['spiritual'];
    const pickupLoc = formData.pickupLocation || 'Varanasi';

    // Helper to check category interest matches
    const isInterestMatch = (category) => {
        if (!userInterests || userInterests.length === 0 || userInterests.includes('all')) return true;
        return userInterests.some(choice => {
            if (choice === 'waterfalls') return category === 'waterfalls';
            if (choice === 'spiritual') return category === 'spiritual' || category === 'ghats_culture';
            if (choice === 'heritage' || choice === 'forts') return category === 'heritage';
            if (choice === 'forests_fossils') return category === 'forests_fossils';
            if (choice === 'adventure') return category === 'adventure';
            return category === choice;
        });
    };

    // 1. City Details & Place Master Catalog
    const DESTINATION_MASTER = {
        banaras: {
            name: 'Banaras (Varanasi)',
            tagline: 'Eternal Ghats, Sacred Temples & Classical Heritage',
            image: '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
            images: [
                '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
                '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple.jpg',
                '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
                '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi).jpg',
                '/varansi/Ramnagar Fort/Ramnagar Fort.jpg'
            ],
            googleImagesUrl: getGoogleImagesUrl('Varanasi Ghats and Temples', 'Banaras'),
            coordinates: { lat: 25.3176, lng: 82.9739 },
            hotels: {
                budget: { name: 'Kashi Heritage Guesthouse (Assi Ghat)', type: 'Homestay / Guesthouse', pricePerNight: 1200, address: 'Assi Ghat Road, Shivala, Varanasi', rating: 4.4, amenities: ['Free Wi-Fi', 'Rooftop River View', 'Satvik Breakfast'], coordinates: { lat: 25.2890, lng: 83.0060 } },
                moderate: { name: 'Hotel Surya Kaiser Palace (Cantt)', type: '3-Star Heritage Hotel', pricePerNight: 3200, address: 'The Mall Road, Cantonment, Varanasi', rating: 4.6, amenities: ['Pool & Spa', 'AC Deluxe Rooms', 'Multi-Cuisine Dining'], coordinates: { lat: 25.3340, lng: 82.9860 } },
                luxury: { name: 'BrijRama Palace / Taj Nadesar Palace', type: '5-Star Luxury Heritage Palace', pricePerNight: 9500, address: 'Darbhanga Ghat / Nadesar, Varanasi', rating: 4.9, amenities: ['Private River Chauffeur', 'Royal Dining', 'VIP Corridor Access'], coordinates: { lat: 25.3045, lng: 83.0115 } }
            },
            culinarySpots: [
                {
                    name: 'Ram Bhandar (Thatheri Gali)',
                    specialty: 'Authentic Poori-Bhaji & Jalebi with Hing Aloo',
                    mealType: 'Breakfast',
                    avgCost: 120,
                    coordinates: { lat: 25.3135, lng: 83.0075 },
                    image: '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat1.jpg',
                    images: [
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat1.jpg',
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat2.jpg'
                    ]
                },
                {
                    name: 'Keshari Restaurant (Godowlia)',
                    specialty: 'Classic Banarasi Pure Ghee Satvik Thali & Malai Kofta',
                    mealType: 'Lunch',
                    avgCost: 280,
                    coordinates: { lat: 25.3090, lng: 83.0065 },
                    image: '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple1.jpg',
                    images: [
                        '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple1.jpg',
                        '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple2.jpg'
                    ]
                },
                {
                    name: 'Blue Lassi Shop (Manikarnika)',
                    specialty: '30+ Varieties of Thick Cream Lassi in Clay Kulhads',
                    mealType: 'Snack/Dessert',
                    avgCost: 90,
                    coordinates: { lat: 25.3110, lng: 83.0130 },
                    image: '/varansi/Manikarnika Ghat/Manikarnika Ghat.jpg',
                    images: [
                        '/varansi/Manikarnika Ghat/Manikarnika Ghat.jpg',
                        '/varansi/Manikarnika Ghat/Manikarnika Ghat1.jpg'
                    ]
                },
                {
                    name: 'Pizzeria Vaatika Cafe (Assi Ghat)',
                    specialty: 'Apple Pie & Woodfired Thin-Crust Pizza by the Ganges',
                    mealType: 'Dinner',
                    avgCost: 450,
                    coordinates: { lat: 25.2885, lng: 83.0070 },
                    image: '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi1.jpg',
                    images: [
                        '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi1.jpg',
                        '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi2.jpg'
                    ]
                },
                {
                    name: 'Keshav Tambool Bhandar',
                    specialty: 'Legendary Royal Banarasi Meetha Paan with Gulkand & Silver Vark',
                    mealType: 'Digestif',
                    avgCost: 50,
                    coordinates: { lat: 25.3075, lng: 83.0040 },
                    image: '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi3.jpg',
                    images: [
                        '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi3.jpg',
                        '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi4.jpg'
                    ]
                }
            ],
            sights: [
                {
                    id: 'b_sunrise_boat',
                    place: 'Assi Ghat to Manikarnika Ghat',
                    category: 'ghats_culture',
                    categoryLabel: 'Ghats & Culture',
                    icon: '🚣',
                    activity: 'Sunrise Ganges Rowboat Cruise past 84 Historic Ghats',
                    description: 'Witness Subah-e-Banaras dawn Vedic chants at Assi Ghat, followed by a serene wooden rowboat ride past morning bathers, palaces, and ancient ghats.',
                    duration: '1.5 hrs',
                    distFromBase: '3.5 km',
                    travelTimeCab: '12 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 250,
                    image: '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
                    images: [
                        '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi.jpg',
                        '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi1.jpg',
                        '/varansi/Assi Ghat Varanasi/Assi Ghat Varanasi2.jpg',
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Assi Ghat Sunrise Boat Cruise', 'Varanasi'),
                    coordinates: { lat: 25.2985, lng: 83.0076 },
                    insiderTip: 'Board by 5:45 AM to catch the pristine golden light reflecting across the river.',
                    tags: ['Sunrise Cruise', '84 Ghats', 'Photography']
                },
                {
                    id: 'b_vishwanath',
                    place: 'Kashi Vishwanath Corridor & Temple',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Kashi Vishwanath Jyotirlinga Darshan & Sacred Corridor Walk',
                    description: 'Explore the newly constructed marble corridor connecting the holy Ganges directly to the revered golden spire Jyotirlinga temple.',
                    duration: '2 hrs',
                    distFromBase: '1.2 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 100,
                    image: '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple.jpg',
                    images: [
                        '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple.jpg',
                        '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple1.jpg',
                        '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple2.jpg',
                        '/varansi/shri kasi vishwanath/Shri Kashi Vishwanath Temple3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Kashi Vishwanath Temple Corridor', 'Varanasi'),
                    coordinates: { lat: 25.3109, lng: 83.0107 },
                    insiderTip: 'Deposit electronic devices at the corridor locker gate for swift security clearance.',
                    tags: ['Jyotirlinga', 'Temple', 'Sacred Corridor']
                },
                {
                    id: 'b_sarnath',
                    place: 'Sarnath Archaeological Complex & Museum',
                    category: 'heritage',
                    categoryLabel: 'Heritage & History',
                    icon: '🏛️',
                    activity: 'Sarnath Dhamek Stupa & Ashoka Pillar Museum Tour',
                    description: 'Visit the sacred deer park where Lord Buddha gave his first sermon, and view the original 4-lion Ashoka Capital housed in the ASI museum.',
                    duration: '2.5 hrs',
                    distFromBase: '10.5 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '40 mins',
                    cost: 150,
                    image: '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi).jpg',
                    images: [
                        '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi).jpg',
                        '/varansi/Dhamek Stupa Sarnath, (Varanasi)/2.jpg',
                        '/varansi/Dhamek Stupa Sarnath, (Varanasi)/25.jpg',
                        '/varansi/Dhamek Stupa Sarnath, (Varanasi)/Dhamek Stupa Sarnath, (Varanasi)1.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Sarnath Dhamek Stupa Ashoka Pillar', 'Varanasi'),
                    coordinates: { lat: 25.3811, lng: 83.0214 },
                    insiderTip: 'Hire a certified archaeological guide at the entrance for rich historical storytelling.',
                    tags: ['UNESCO Site', 'Buddhism', 'Ashoka Pillar']
                },
                {
                    id: 'b_aarti',
                    place: 'Dashashwamedh Ghat',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🙏',
                    activity: 'Dashashwamedh Ghat Grand Evening Ganga Aarti',
                    description: 'High priests perform synchronized Vedic chants holding tiered brass lamps with conch shells and incense as thousands of floating diyas glow on the river.',
                    duration: '1.5 hrs',
                    distFromBase: '2.0 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 100,
                    image: '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
                    images: [
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg',
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat1.jpg',
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat2.jpg',
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Dashashwamedh Ghat Ganga Aarti', 'Varanasi'),
                    coordinates: { lat: 25.3076, lng: 83.0104 },
                    insiderTip: 'Reserve a wooden boat seat on the river 30 minutes in advance for an unobstructed viewpoint.',
                    tags: ['Ganga Aarti', 'Spiritual', 'Sacred Chants']
                },
                {
                    id: 'b_ramnagar',
                    place: 'Ramnagar Fort & Ganga East Bank',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Forts',
                    icon: '🏰',
                    activity: 'Ramnagar Sandstone Fort & Royal Carriage Museum',
                    description: '18th-century royal palace fortress overlooking the bending Ganges, preserving vintage royal palanquins, ivory carvings, and astronomical clocks.',
                    duration: '1.5 hrs',
                    distFromBase: '12 km',
                    travelTimeCab: '30 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '45 mins',
                    cost: 120,
                    image: '/varansi/Ramnagar Fort/Ramnagar Fort.jpg',
                    images: [
                        '/varansi/Ramnagar Fort/Ramnagar Fort.jpg',
                        '/varansi/Ramnagar Fort/Ramnagar Fort1.jpg',
                        '/varansi/Ramnagar Fort/Ramnagar Fort2.jpg',
                        '/varansi/Ramnagar Fort/Ramnagar Fort3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Ramnagar Fort Royal Palace', 'Varanasi'),
                    coordinates: { lat: 25.2678, lng: 83.0264 },
                    insiderTip: 'Try the famous chilled rabri lassi right outside the fort main gate.',
                    tags: ['Royal Fort', 'Museum', 'Mughal Architecture']
                },
                {
                    id: 'b_silk',
                    place: 'Thatheri Bazaar & Chowk Silk Guilds',
                    category: 'ghats_culture',
                    categoryLabel: 'Culture & Crafts',
                    icon: '🧶',
                    activity: 'Banarasi Zari Silk Weaving & Ancient Galis Walking Tour',
                    description: 'Walk through historic labyrinthine alleyways to see hereditary master weavers hand-operating wooden jacquard looms to craft world-famous Banarasi sarees.',
                    duration: '1.5 hrs',
                    distFromBase: '1.5 km',
                    travelTimeCab: 'Walking/E-Rickshaw',
                    travelTimeTrain: '—',
                    travelTimeBus: '—',
                    cost: 50,
                    image: '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi).jpg',
                    images: [
                        '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi).jpg',
                        '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi)1.jpg',
                        '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi)2.jpg',
                        '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Banarasi Silk Weaving Street Food Chowk', 'Varanasi'),
                    coordinates: { lat: 25.3120, lng: 83.0080 },
                    insiderTip: 'Buy directly from certified weaver cooperatives to ensure authentic pure silk zari work.',
                    tags: ['Silk Weaving', 'Handloom', 'Ancient Bazaars']
                },
                {
                    id: 'b_kashi_bhu',
                    place: 'Shri Kashi Vishwanath Ji Temple (BHU Campus)',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'New Vishwanath Temple (VT) Darshan & BHU Campus Stroll',
                    description: 'Magnificent 250-foot white marble spire temple built by the Birla family inside the lush Banaras Hindu University campus, featuring Bhagavad Gita verses engraved on marble walls.',
                    duration: '1.5 hrs',
                    distFromBase: '7 km',
                    travelTimeCab: '20 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '30 mins',
                    cost: 50,
                    image: '/varansi/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi).jpg',
                    images: [
                        '/varansi/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi).jpg',
                        '/varansi/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)1.jpg',
                        '/varansi/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)2.jpg',
                        '/varansi/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)/Shri Kashi Vishwanath Ji Temple, BHU Campus (Varanasi)3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('New Vishwanath Temple BHU', 'Varanasi'),
                    coordinates: { lat: 25.2677, lng: 82.9913 },
                    insiderTip: 'Walk through the green BHU campus lawns in the early morning for peaceful contemplation.',
                    tags: ['Birla Temple', 'BHU Campus', 'Marble Architecture']
                },
                {
                    id: 'b_tulsi_manas',
                    place: 'Shri Satyanarayan Tulsi Manas Temple',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Tulsi Manas White Marble Temple & Ramcharitmanas Inscriptions',
                    description: 'Historic white marble shrine built at the sacred site where saint Goswami Tulsidas composed the Ramcharitmanas, with entire verses sculpted on gleaming marble walls.',
                    duration: '1 hr',
                    distFromBase: '3.2 km',
                    travelTimeCab: '12 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 40,
                    image: '/varansi/Shri Satyanarayan Tulsi Manas Temple, (Varanasi)/Shri Satyanarayan Tulsi Manas Temple, (Varanasi).jpg',
                    images: [
                        '/varansi/Shri Satyanarayan Tulsi Manas Temple, (Varanasi)/Shri Satyanarayan Tulsi Manas Temple, (Varanasi).jpg',
                        '/varansi/Shri Satyanarayan Tulsi Manas Temple, (Varanasi)/Shri Satyanarayan Tulsi Manas Temple, (Varanasi)1.jpg',
                        '/varansi/Shri Satyanarayan Tulsi Manas Temple, (Varanasi)/Shri Satyanarayan Tulsi Manas Temple, (Varanasi)2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Tulsi Manas Temple Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.2850, lng: 82.9990 },
                    insiderTip: 'Check the mechanical puppet exhibits on the upper floor illustrating scenes from the Ramayana.',
                    tags: ['Tulsidas', 'Ramcharitmanas', 'White Marble']
                },
                {
                    id: 'b_batuk_bhairav',
                    place: 'Shri Batuk Bhairav Temple',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Batuk Bhairav Child Deity Darshan & Sacred Blessings',
                    description: 'Ancient tantric pilgrimage temple dedicated to Lord Bhairav in his youthful Batuk form, revered by devotees seeking protection from negative obstacles.',
                    duration: '1 hr',
                    distFromBase: '4 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 40,
                    image: '/varansi/Shri Batuk Bhairav Temple, (Varanasi)/Shri Batuk Bhairav Temple, (Varanasi).jpg',
                    images: [
                        '/varansi/Shri Batuk Bhairav Temple, (Varanasi)/Shri Batuk Bhairav Temple, (Varanasi).jpg',
                        '/varansi/Shri Batuk Bhairav Temple, (Varanasi)/Shri Batuk Bhairav Temple, (Varanasi)1.jpg',
                        '/varansi/Shri Batuk Bhairav Temple, (Varanasi)/Shri Batuk Bhairav Temple, (Varanasi)3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Batuk Bhairav Temple Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.2950, lng: 82.9970 },
                    insiderTip: 'Special morning aartis here are spiritually energizing and less crowded.',
                    tags: ['Batuk Bhairav', 'Spiritual Protection', 'Ancient Temple']
                },
                {
                    id: 'b_bharat_kala',
                    place: 'Bharat Kala Bhavan Museum (BHU)',
                    category: 'heritage',
                    categoryLabel: 'Heritage & History',
                    icon: '🏛️',
                    activity: 'Bharat Kala Bhavan Mughal Miniatures & Archaeological Treasures Tour',
                    description: 'World-renowned university museum showcasing exquisite collections of Indian miniature paintings, ancient Chola bronzes, medieval textiles, and archaeological artifacts.',
                    duration: '2 hrs',
                    distFromBase: '6.5 km',
                    travelTimeCab: '18 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '30 mins',
                    cost: 80,
                    image: '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi).jpg',
                    images: [
                        '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi).jpg',
                        '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi)1.jpg',
                        '/varansi/Bharat Kala Bhavan Museum, (BHU Varanasi)/Bharat Kala Bhavan Museum, (BHU Varanasi)2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Bharat Kala Bhavan Museum Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.2660, lng: 82.9920 },
                    insiderTip: 'The miniature painting gallery features rare Mughal, Rajasthani, and Pahari masterworks.',
                    tags: ['Art Museum', 'Mughal Miniatures', 'Archaeological Artifacts']
                },
                {
                    id: 'b_bharat_mata',
                    place: 'Bharat Mata Mandir MGKVP',
                    category: 'heritage',
                    categoryLabel: 'Heritage & History',
                    icon: '🏛️',
                    activity: 'Bharat Mata Relief Marble Map of Undivided India Exhibition',
                    description: 'Unique national monument inaugurated by Mahatma Gandhi in 1936, housing a relief map of undivided India carved out of pristine Makrana marble showing detailed topographic elevations.',
                    duration: '1 hr',
                    distFromBase: '2.5 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 40,
                    image: '/varansi/Bharat Mata Mandir MGKVP (Varanasi)/Bharat Mata Mandir MGKVP (Varanasi).jpg',
                    images: [
                        '/varansi/Bharat Mata Mandir MGKVP (Varanasi)/Bharat Mata Mandir MGKVP (Varanasi).jpg',
                        '/varansi/Bharat Mata Mandir MGKVP (Varanasi)/Bharat Mata Mandir MGKVP (Varanasi)1.jpg',
                        '/varansi/Bharat Mata Mandir MGKVP (Varanasi)/Bharat Mata Mandir MGKVP (Varanasi)2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Bharat Mata Mandir Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.3175, lng: 82.9890 },
                    insiderTip: 'Observe the precise mountain peaks, river valleys, and ocean depths carved on the marble floor.',
                    tags: ['Mahatma Gandhi', 'Marble Map', 'Freedom Movement']
                },
                {
                    id: 'b_nepali_temple',
                    place: 'Nepali Temple (Kathwala Wooden Temple)',
                    category: 'heritage',
                    categoryLabel: 'Heritage & History',
                    icon: '🏛️',
                    activity: 'Nepali Kathwala Temple Hand-Carved Terracotta & Woodwork Walk',
                    description: '19th-century pagoda-style wooden temple built by the King of Nepal on Lalita Ghat, famed for its intricate Himalayan wood carvings reminiscent of Kathmandu’s Pashupatinath.',
                    duration: '1 hr',
                    distFromBase: '1.8 km',
                    travelTimeCab: 'Walking/Ghat Walk',
                    travelTimeTrain: '—',
                    travelTimeBus: '—',
                    cost: 40,
                    image: '/varansi/Nepali Temple/Nepali Temple.jpg',
                    images: [
                        '/varansi/Nepali Temple/Nepali Temple.jpg',
                        '/varansi/Nepali Temple/Nepali Temple1.jpg',
                        '/varansi/Nepali Temple/Nepali Temple2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Nepali Temple Lalita Ghat Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.3095, lng: 83.0125 },
                    insiderTip: 'Sit on the riverfront terrace for one of the most serene views of the morning Ganges.',
                    tags: ['Pagoda Temple', 'Himalayan Woodwork', 'Lalita Ghat']
                },
                {
                    id: 'b_tibetan_temple',
                    place: 'Tibetan Buddhist Temple (Sarnath)',
                    category: 'heritage',
                    categoryLabel: 'Heritage & History',
                    icon: '🏛️',
                    activity: 'Tibetan Temple Tibetan Frescoes & Golden Shakyamuni Darshan',
                    description: 'Colorful Tibetan monastery in Sarnath featuring traditional Tibetan Buddhist prayer wheels, vibrant thangka wall paintings, and a grand golden statue of Shakyamuni Buddha.',
                    duration: '1 hr',
                    distFromBase: '10.8 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '40 mins',
                    cost: 50,
                    image: '/varansi/Tibetan Temple, (Varanasi)/Tibetan Temple, (Varanasi).jpg',
                    images: [
                        '/varansi/Tibetan Temple, (Varanasi)/Tibetan Temple, (Varanasi).jpg',
                        '/varansi/Tibetan Temple, (Varanasi)/Tibetan Temple, (Varanasi)1.jpg',
                        '/varansi/Tibetan Temple, (Varanasi)/Tibetan Temple, (Varanasi)2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Tibetan Temple Sarnath Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.3780, lng: 83.0230 },
                    insiderTip: 'Spin the prayer wheels along the outer perimeter while circumambulating the main prayer hall.',
                    tags: ['Tibetan Monastery', 'Thangka Art', 'Buddhist Peace']
                },
                {
                    id: 'b_sankatmochan',
                    place: 'Shri Sankat Mochan Hanuman Temple',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Sankat Mochan Temple Darshan & Besan Ladoo Prasad',
                    description: 'Revered temple established by Goswami Tulsidas on the banks of the Assi River, renowned for its peaceful spiritual aura and evening aarti.',
                    duration: '1.5 hrs',
                    distFromBase: '3.5 km',
                    travelTimeCab: '12 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 50,
                    image: '/varansi/Shri Sankat Mochan Hanuman Temple, (Varanasi)/Shri Sankat Mochan Hanuman Temple, (Varanasi).jpg',
                    images: [
                        '/varansi/Shri Sankat Mochan Hanuman Temple, (Varanasi)/Shri Sankat Mochan Hanuman Temple, (Varanasi).jpg',
                        '/varansi/Shri Sankat Mochan Hanuman Temple, (Varanasi)/Shri Sankat Mochan Hanuman Temple, (Varanasi)1.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Sankat Mochan Temple Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.2825, lng: 82.9980 },
                    insiderTip: 'Taste the legendary warm besan ladoos offered as sacred prasad.',
                    tags: ['Tulsidas Temple', 'Hanuman Darshan', 'Spiritual Energy']
                },
                {
                    id: 'b_durgakund',
                    place: 'Shree Durga Mata Mandir Durgakund',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Historic Red Stone Durga Kund Temple Darshan',
                    description: 'Magnificent 18th-century red ochre Nagara-style temple dedicated to Goddess Durga, featuring an ancient holy water kund and multi-tiered carved shikhara.',
                    duration: '1 hr',
                    distFromBase: '3 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 50,
                    image: '/varansi/Shree Durga Mata Mandir Durgakund Varanasi/Shree Durga Mata Mandir Durgakund Varanasi.jpg',
                    images: [
                        '/varansi/Shree Durga Mata Mandir Durgakund Varanasi/Shree Durga Mata Mandir Durgakund Varanasi.jpg',
                        '/varansi/Shree Durga Mata Mandir Durgakund Varanasi/Shree Durga Mata Mandir Durgakund Varanasi1.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Durga Kund Temple Varanasi', 'Varanasi'),
                    coordinates: { lat: 25.2880, lng: 82.9995 },
                    insiderTip: 'Visit during morning chanting hours for an uplifting meditative experience.',
                    tags: ['Nagara Architecture', 'Durga Shrine', 'Historic Kund']
                }
            ]
        },
        allahabad: {
            name: 'Allahabad (Prayagraj)',
            tagline: 'Sacred Triveni Sangam, Grand Forts & Cultural Legacy',
            image: '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
            images: [
                '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
                '/allahabad/allahabad-fort/allahabad-fort-1.jpg',
                '/allahabad/anand-bhawan/anand-bhawan-1.jpg',
                '/allahabad/khusro-bagh/khusro-bagh-1.jpg'
            ],
            googleImagesUrl: getGoogleImagesUrl('Triveni Sangam Allahabad Fort', 'Prayagraj'),
            coordinates: { lat: 25.4358, lng: 81.8463 },
            hotels: {
                budget: { name: 'Prayag Yatri Niwas (Civil Lines)', type: 'Budget Hotel / Guesthouse', pricePerNight: 1100, address: 'MG Marg, Civil Lines, Prayagraj', rating: 4.3, amenities: ['Free Wi-Fi', 'Clean AC Rooms', 'Travel Desk'], coordinates: { lat: 25.4520, lng: 81.8340 } },
                moderate: { name: 'Hotel Kanha Shyam / Grand Continental', type: '3-Star Deluxe Hotel', pricePerNight: 2900, address: 'Civil Lines, Prayagraj', rating: 4.5, amenities: ['Buffet Breakfast', 'Spacious AC Rooms', 'Ample Parking'], coordinates: { lat: 25.4545, lng: 81.8325 } },
                luxury: { name: 'The Legend Hotel / Heritage Kasmanda', type: '4-Star Premium Boutique', pricePerNight: 6500, address: 'Cantonment / Civil Lines, Prayagraj', rating: 4.8, amenities: ['Fine Dining', 'Chauffeur Service', 'Sangam Tour Specialist'], coordinates: { lat: 25.4610, lng: 81.8410 } }
            },
            culinarySpots: [
                { name: 'Netram Mulchand & Sons (Katra)', specialty: 'Pure Desi Ghee Kachori-Sabzi Thali with Jalebi', mealType: 'Breakfast', avgCost: 150, coordinates: { lat: 25.4630, lng: 81.8520 } },
                { name: 'Hari Ram & Sons (Loknath Chowk)', specialty: 'Crispy Spicy Samosas, Dalmoth & Gulab Jamun', mealType: 'Lunch/Snack', avgCost: 110, coordinates: { lat: 25.4330, lng: 81.8370 } },
                { name: 'Dehati ke Rasgulle (Civil Lines)', specialty: 'Mouth-melting Warm Black Rasgullas', mealType: 'Snack/Dessert', avgCost: 80, coordinates: { lat: 25.4500, lng: 81.8360 } },
                { name: 'El Chico Restaurant (Civil Lines)', specialty: 'Heritage Mughlai Biryani, Butter Paneer & Baked Alaska', mealType: 'Dinner', avgCost: 550, coordinates: { lat: 25.4530, lng: 81.8350 } },
                { name: 'Indian Coffee House (MG Marg)', specialty: 'Filter Coffee & Cold Coffee in a historic 1957 setting', mealType: 'Evening Refresher', avgCost: 120, coordinates: { lat: 25.4515, lng: 81.8355 } }
            ],
            sights: [
                {
                    id: 'a_sangam',
                    place: 'Triveni Sangam Ghats',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🙏',
                    activity: 'Triveni Sangam Confluence Boat Ride & Holy Snan',
                    description: 'Take a boat ride to the exact meeting point where the greenish waters of Yamuna merge with the pale waters of Ganga and invisible Saraswati.',
                    duration: '2 hrs',
                    distFromBase: '6.5 km',
                    travelTimeCab: '18 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '30 mins',
                    cost: 200,
                    image: '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
                    images: [
                        '/allahabad/triveni-sangam/triveni-sangam-1.jpg',
                        '/allahabad/triveni-sangam/triveni-sangam-2.jpg',
                        '/allahabad/triveni-sangam/triveni-sangam-3.jpg',
                        '/allahabad/triveni-sangam/triveni-sangam-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Triveni Sangam Ghats Boat Ride', 'Prayagraj'),
                    coordinates: { lat: 25.4243, lng: 81.8845 },
                    insiderTip: 'From October to March, carry bird grain to feed thousands of migratory Siberian seagulls.',
                    tags: ['Holy Sangam', 'Boat Ride', 'Seagulls']
                },
                {
                    id: 'a_fort',
                    place: 'Allahabad Fort & Patalpuri Temple',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Forts',
                    icon: '🏰',
                    activity: 'Historic Akbar Fort, Patalpuri & Akshayavat Tree',
                    description: 'Grand 1583 AD sandstone fortress built by Emperor Akbar on the banks of Yamuna, housing the underground Patalpuri shrine and the immortal Akshayavat tree.',
                    duration: '1.5 hrs',
                    distFromBase: '5.0 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 80,
                    image: '/allahabad/allahabad-fort/allahabad-fort-1.jpg',
                    images: [
                        '/allahabad/allahabad-fort/allahabad-fort-1.jpg',
                        '/allahabad/allahabad-fort/allahabad-fort-2.jpg',
                        '/allahabad/allahabad-fort/allahabad-fort-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Allahabad Akbar Fort Akshayavat', 'Prayagraj'),
                    coordinates: { lat: 25.4300, lng: 81.8760 },
                    insiderTip: 'Keep a government ID handy for entry into the fort army-managed precinct.',
                    tags: ['Akbar Fort', 'Akshayavat', 'Mughal Architecture']
                },
                {
                    id: 'a_hanuman',
                    place: 'Bade Hanuman Ji (Letey Hanuman)',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Bade Hanuman Ji (Subterranean Reclining Hanuman) Darshan',
                    description: 'Unique subterranean temple enshrining a 20-foot reclining idol of Lord Hanuman, submerged during peak Ganga monsoon floods.',
                    duration: '1 hr',
                    distFromBase: '5.5 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 50,
                    image: '/allahabad/bade-hanuman/bade-hanuman-1.jpg',
                    images: [
                        '/allahabad/bade-hanuman/bade-hanuman-1.jpg',
                        '/allahabad/bade-hanuman/bade-hanuman-2.jpg',
                        '/allahabad/bade-hanuman/bade-hanuman-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Letey Hanuman Ji Bade Mandir', 'Prayagraj'),
                    coordinates: { lat: 25.4280, lng: 81.8790 },
                    insiderTip: 'Tuesday and Saturday mornings have vibrant vermilion (sindoor) pujas.',
                    tags: ['Reclining Hanuman', 'Rare Temple', 'Spiritual Energy']
                },
                {
                    id: 'a_anand_bhawan',
                    place: 'Anand Bhawan & Jawahar Planetarium',
                    category: 'heritage',
                    categoryLabel: 'Heritage & History',
                    icon: '🏛️',
                    activity: 'Anand Bhawan Freedom Mansion & Sky Planetarium Tour',
                    description: 'The historic ancestral residence of the Nehru family showcasing original rooms, memorabilia from India’s independence struggle, and celestial planetarium shows.',
                    duration: '2 hrs',
                    distFromBase: '3.0 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 120,
                    image: '/allahabad/anand-bhawan/anand-bhawan-1.jpg',
                    images: [
                        '/allahabad/anand-bhawan/anand-bhawan-1.jpg',
                        '/allahabad/anand-bhawan/anand-bhawan-2.jpg',
                        '/allahabad/anand-bhawan/anand-bhawan-3.jpg',
                        '/allahabad/anand-bhawan/anand-bhawan-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Anand Bhawan Planetarium', 'Prayagraj'),
                    coordinates: { lat: 25.4594, lng: 81.8596 },
                    insiderTip: 'Book the 30-minute sky show at the Jawahar Planetarium upon arrival.',
                    tags: ['Freedom Movement', 'Mansion', 'Planetarium']
                },
                {
                    id: 'a_khusro',
                    place: 'Khusro Bagh Mughal Complex',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Gardens',
                    icon: '🌿',
                    activity: 'Khusro Bagh Mughal Fresco Garden & Mausoleums',
                    description: 'Sprawling quadrilateral walled Mughal garden with intricately carved red sandstone mausoleums of Prince Khusrau and sweet Allahabad Surkha guava orchards.',
                    duration: '1.5 hrs',
                    distFromBase: '2.5 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 50,
                    image: '/allahabad/khusro-bagh/khusro-bagh-1.jpg',
                    images: [
                        '/allahabad/khusro-bagh/khusro-bagh-1.jpg',
                        '/allahabad/khusro-bagh/khusro-bagh-2.jpg',
                        '/allahabad/khusro-bagh/khusro-bagh-3.jpg',
                        '/allahabad/khusro-bagh/khusro-bagh-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Khusro Bagh Mughal Tombs', 'Prayagraj'),
                    coordinates: { lat: 25.4468, lng: 81.8252 },
                    insiderTip: 'Late afternoons provide the best lighting for photographing Persian stone jaalis.',
                    tags: ['Mughal Tombs', 'Persian Art', 'Guava Orchards']
                }
            ]
        },
        mirzapur: {
            name: 'Mirzapur',
            tagline: 'Cascading Waterfalls, Vindhyavasini Shaktipeeth & Hills',
            image: '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
            images: [
                '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
                '/mirzapur/chunar-fort/chunar-fort-1.jpg',
                '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
                '/mirzapur/tanda-falls/tanda-falls-1.jpg',
                '/mirzapur/lakhaniya-dari/lakhaniya-dari-1.jpg',
                '/mirzapur/pakka-ghat/pakka-ghat-1.jpg'
            ],
            googleImagesUrl: getGoogleImagesUrl('Wyndham Falls Chunar Fort Vindhyachal', 'Mirzapur'),
            coordinates: { lat: 25.1337, lng: 82.5644 },
            hotels: {
                budget: { name: 'Vindhyachal Tourist Guesthouse', type: 'Budget Guesthouse', pricePerNight: 950, address: 'Temple Road, Vindhyachal, Mirzapur', rating: 4.2, amenities: ['Clean Rooms', 'Temple Proximity', 'Vegetarian Meals'], coordinates: { lat: 25.1630, lng: 82.5090 } },
                moderate: { name: 'The Galaxy Hotel / Vindhya Retreat', type: '3-Star Comfort Hotel', pricePerNight: 2400, address: 'Station Road / Vindhyachal Hills, Mirzapur', rating: 4.4, amenities: ['AC Deluxe Rooms', 'Nature Views', 'In-House Dining'], coordinates: { lat: 25.1470, lng: 82.5710 } },
                luxury: { name: 'Chunar Ganga Cliff Eco-Resort', type: 'Heritage Nature Resort', pricePerNight: 5200, address: 'Chunar Cliff View, Mirzapur', rating: 4.7, amenities: ['River Panorama', 'Private Waterfall Trek Guide', 'Organic Dining'], coordinates: { lat: 25.1240, lng: 82.8710 } }
            },
            culinarySpots: [
                {
                    name: 'Vindhyachal Mandir Chowk',
                    specialty: 'Fresh Desi Ghee Pedas, Poori-Sabzi & Kheer',
                    mealType: 'Breakfast',
                    avgCost: 110,
                    coordinates: { lat: 25.1655, lng: 82.5150 },
                    image: '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
                    images: [
                        '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
                        '/mirzapur/vindhyavasini/vindhyavasini-2.jpg',
                        '/mirzapur/ashtabhuja/ashtabhuja-1.jpg'
                    ]
                },
                {
                    name: 'Chunar Fort Road Dhaba',
                    specialty: 'Authentic UP Litti Chokha with Desi Ghee & Green Chutney',
                    mealType: 'Lunch',
                    avgCost: 140,
                    coordinates: { lat: 25.1290, lng: 82.8730 },
                    image: '/mirzapur/chunar-fort/chunar-fort-1.jpg',
                    images: [
                        '/mirzapur/chunar-fort/chunar-fort-1.jpg',
                        '/mirzapur/chunar-fort/chunar-fort-2.jpg',
                        '/mirzapur/chunar-fort/chunar-fort-3.jpg',
                        '/mirzapur/chunar-fort/chunar-fort-4.jpg'
                    ]
                },
                {
                    name: 'Mirzapur Clock Tower Food Lane',
                    specialty: 'Crispy Samosas, Jalebis & Rabri in Clay Cups',
                    mealType: 'Snack/Dessert',
                    avgCost: 75,
                    coordinates: { lat: 25.1510, lng: 82.5690 },
                    image: '/mirzapur/ghanta-ghar/ghanta-ghar-1.jpg',
                    images: [
                        '/mirzapur/ghanta-ghar/ghanta-ghar-1.jpg',
                        '/mirzapur/ghanta-ghar/ghanta-ghar-2.jpg',
                        '/mirzapur/ghanta-ghar/ghanta-ghar-3.jpg'
                    ]
                },
                {
                    name: 'Vindhya Greens Restaurant',
                    specialty: 'Dal Tadka, Shahi Paneer, Garlic Naan & Gulab Jamun',
                    mealType: 'Dinner',
                    avgCost: 350,
                    coordinates: { lat: 25.1420, lng: 82.5650 },
                    image: '/mirzapur/pakka-ghat/pakka-ghat-1.jpg',
                    images: [
                        '/mirzapur/pakka-ghat/pakka-ghat-1.jpg',
                        '/mirzapur/pakka-ghat/pakka-ghat-2.jpg',
                        '/mirzapur/pakka-ghat/pakka-ghat-3.jpg'
                    ]
                }
            ],
            sights: [
                {
                    id: 'm_wyndham',
                    place: 'Wyndham Falls & Nature Gorge',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Wyndham Falls Rocky Stepping Pools & Nature Hike',
                    description: 'Picturesque tiered waterfall cascading through rocky Vindhyan red sandstone crags, surrounded by peaceful forests and scenic picnic viewpoints.',
                    duration: '2.5 hrs',
                    distFromBase: '14 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '40 mins',
                    cost: 80,
                    image: '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
                    images: [
                        '/mirzapur/wyndham-falls/wyndham-falls-1.jpg',
                        '/mirzapur/wyndham-falls/wyndham-falls-2.jpg',
                        '/mirzapur/wyndham-falls/wyndham-falls-3.jpg',
                        '/mirzapur/wyndham-falls/wyndham-falls-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Wyndham Falls Mirzapur Waterfalls', 'Mirzapur'),
                    coordinates: { lat: 25.0744, lng: 82.5831 },
                    insiderTip: 'Wear sports shoes with firm rubber grip on wet rocks; carry drinking water.',
                    tags: ['Waterfall Trek', 'Natural Pools', 'Scenic Gorge']
                },
                {
                    id: 'm_lakhaniya',
                    place: 'Lakhaniya Dari Canyon Waterfall',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Lakhaniya Dari Canyon Trek & Deep Waterfall Plunge Pool',
                    description: 'Grand natural waterfall hidden deep within a prehistoric sandstone boulder canyon, plunging into a clear turquoise natural pool surrounded by dense forest.',
                    duration: '3 hrs',
                    distFromBase: '35 km',
                    travelTimeCab: '45 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '1 hr',
                    cost: 80,
                    image: '/mirzapur/lakhaniya-dari/lakhaniya-dari-1.jpg',
                    images: [
                        '/mirzapur/lakhaniya-dari/lakhaniya-dari-1.jpg',
                        '/mirzapur/lakhaniya-dari/lakhaniya-dari-2.jpg',
                        '/mirzapur/lakhaniya-dari/lakhaniya-dari-3.jpg',
                        '/mirzapur/lakhaniya-dari/lakhaniya-dari-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Lakhaniya Dari Waterfall Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 25.0420, lng: 82.9150 },
                    insiderTip: 'Carry trekking shoes and waterproof phone cases for boulder crossing.',
                    tags: ['Canyon Waterfall', 'Boulder Trek', 'Forest Gorge']
                },
                {
                    id: 'm_tanda',
                    place: 'Tanda Falls & Forest Cascade',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Tanda Falls Stepping Terraces & Scenic Forest Pool',
                    description: 'Tranquil natural stepped waterfall surrounded by scrub forests and migratory birds, perfect for a refreshing afternoon stroll.',
                    duration: '1.5 hrs',
                    distFromBase: '12 km',
                    travelTimeCab: '20 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '35 mins',
                    cost: 50,
                    image: '/mirzapur/tanda-falls/tanda-falls-1.jpg',
                    images: [
                        '/mirzapur/tanda-falls/tanda-falls-1.jpg',
                        '/mirzapur/tanda-falls/tanda-falls-2.jpg',
                        '/mirzapur/tanda-falls/tanda-falls-3.jpg',
                        '/mirzapur/tanda-falls/tanda-falls-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Tanda Falls Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 25.0920, lng: 82.5980 },
                    insiderTip: 'Carry a light pair of binoculars to spot kingfishers and painted storks.',
                    tags: ['Forest Walk', 'Bird Watching', 'Stepped Waterfall']
                },
                {
                    id: 'm_sirsi',
                    place: 'Sirsi Dam Waterfall Cascades',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Sirsi Dam Reservoir Lake & Foaming Water Cascades',
                    description: 'Sprawling water reservoir nestled in rolling green hills where overflow waters create dramatic foaming rapids and quiet scenic viewpoints.',
                    duration: '2 hrs',
                    distFromBase: '38 km',
                    travelTimeCab: '50 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '1.2 hrs',
                    cost: 50,
                    image: '/mirzapur/wyndham-falls/wyndham-falls-2.jpg',
                    images: [
                        '/mirzapur/wyndham-falls/wyndham-falls-2.jpg',
                        '/mirzapur/wyndham-falls/wyndham-falls-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Sirsi Dam Waterfalls Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 24.9650, lng: 82.6850 },
                    insiderTip: 'Great location for landscape photography during mid-day and early afternoon.',
                    tags: ['Dam Reservoir', 'Cascades', 'Green Hills']
                },
                {
                    id: 'm_vindhyachal',
                    place: 'Maa Vindhyavasini Shaktipeeth & Ashtabhuja',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🙏',
                    activity: 'Vindhyachal Corridor Darshan & Ashtabhuja Hill Ropeway',
                    description: 'Sacred 51 Shaktipeeth pilgrimage completing the holy triangle: Maa Vindhyavasini (Goddess of Wealth), Kali Khoh cave shrine, and Ashtabhuja ropeway with hilltop views.',
                    duration: '3 hrs',
                    distFromBase: '8 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 150,
                    image: '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
                    images: [
                        '/mirzapur/vindhyavasini/vindhyavasini-1.jpg',
                        '/mirzapur/vindhyavasini/vindhyavasini-2.jpg',
                        '/mirzapur/ashtabhuja/ashtabhuja-1.jpg',
                        '/mirzapur/kali-khoh/kali-khoh-1.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Maa Vindhyavasini Temple Ashtabhuja', 'Vindhyachal Mirzapur'),
                    coordinates: { lat: 25.1667, lng: 82.5167 },
                    insiderTip: 'Use the newly built Vindhya Corridor for fast and smooth darshan without long queues.',
                    tags: ['Shaktipeeth', 'Ropeway', 'Hilltop Shrine']
                },
                {
                    id: 'm_ashtabhuja',
                    place: 'Ashtabhuja Devi Hilltop Temple & Ropeway',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Ashtabhuja Temple Darshan & Vindhya Panoramic Vista',
                    description: 'Sacred hilltop shrine dedicated to Goddess Saraswati, accessed by a scenic hill ropeway offering breathtaking views of the Vindhya plateau and Ganga.',
                    duration: '1.5 hrs',
                    distFromBase: '9 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 80,
                    image: '/mirzapur/ashtabhuja/ashtabhuja-1.jpg',
                    images: [
                        '/mirzapur/ashtabhuja/ashtabhuja-1.jpg',
                        '/mirzapur/ashtabhuja/ashtabhuja-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Ashtabhuja Temple Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 25.1580, lng: 82.5080 },
                    insiderTip: 'Take the ropeway for scenic views of the holy triangle.',
                    tags: ['Hilltop Temple', 'Ropeway', 'Scenic Views']
                },
                {
                    id: 'm_kalikhoh',
                    place: 'Kali Khoh Cave Temple',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Kali Khoh Ancient Cave Shrine Pilgrimage',
                    description: 'Mystic cave shrine nestled in the hill slope dedicated to Goddess Mahakali, completing the second corner of the Vindhyachal Trikon Parikrama.',
                    duration: '1 hr',
                    distFromBase: '8.5 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 50,
                    image: '/mirzapur/kali-khoh/kali-khoh-1.jpg',
                    images: [
                        '/mirzapur/kali-khoh/kali-khoh-1.jpg',
                        '/mirzapur/kali-khoh/kali-khoh-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Kali Khoh Temple Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 25.1610, lng: 82.5120 },
                    insiderTip: 'Serene meditative atmosphere nestled inside natural rock formations.',
                    tags: ['Cave Temple', 'Trikon Parikrama', 'Spiritual Shrine']
                },
                {
                    id: 'm_lalbhairav',
                    place: 'Lal Bhairav Mandir',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Lal Bhairav Protective Guardian Deity Darshan',
                    description: 'Sacred guardian deity temple of the Vindhyachal pilgrimage, where devotees pay respects to seek spiritual blessings and protection.',
                    duration: '45 mins',
                    distFromBase: '7 km',
                    travelTimeCab: '12 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '18 mins',
                    cost: 40,
                    image: '/mirzapur/lal-bhairav/lal-bhairav-1.jpg',
                    images: [
                        '/mirzapur/lal-bhairav/lal-bhairav-1.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Lal Bhairav Mandir Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 25.1550, lng: 82.5200 },
                    insiderTip: 'Traditional stop after completing Maa Vindhyavasini darshan.',
                    tags: ['Guardian Deity', 'Sacred Temple', 'Vindhyachal']
                },
                {
                    id: 'm_pakkaghat',
                    place: 'Pakka Ghat Historic Ganga Riverfront & Aarti',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🙏',
                    activity: 'Pakka Ghat Sandstone Steps & Evening River Aarti',
                    description: 'Mirzapur’s historic carved red sandstone riverfront ghat overlooking the wide Ganges, famous for serene evening breeze, boat rides, and deep tranquility.',
                    duration: '1.5 hrs',
                    distFromBase: '2 km',
                    travelTimeCab: '8 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '12 mins',
                    cost: 50,
                    image: '/mirzapur/pakka-ghat/pakka-ghat-1.jpg',
                    images: [
                        '/mirzapur/pakka-ghat/pakka-ghat-1.jpg',
                        '/mirzapur/pakka-ghat/pakka-ghat-2.jpg',
                        '/mirzapur/pakka-ghat/pakka-ghat-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Pakka Ghat Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 25.1520, lng: 82.5680 },
                    insiderTip: 'Peaceful alternative to Varanasi ghats with authentic local heritage architecture.',
                    tags: ['Historic Ghat', 'Ganga Aarti', 'Sandstone Carvings']
                },
                {
                    id: 'm_chunar',
                    place: 'Chunar Fort on Ganga Cliff',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Ancient Forts',
                    icon: '🏰',
                    activity: '56 BC Chunar Fort & Ganga Cliff Viewpoint Exploration',
                    description: 'Impregnable hilltop fortress fought over by Sher Shah Suri and Warren Hastings, featuring the Sonwa Mandap and a 180° panorama of the curving Ganges river.',
                    duration: '2 hrs',
                    distFromBase: '32 km',
                    travelTimeCab: '45 mins',
                    travelTimeTrain: '35 mins',
                    travelTimeBus: '1 hr',
                    cost: 100,
                    image: '/mirzapur/chunar-fort/chunar-fort-1.jpg',
                    images: [
                        '/mirzapur/chunar-fort/chunar-fort-1.jpg',
                        '/mirzapur/chunar-fort/chunar-fort-2.jpg',
                        '/mirzapur/chunar-fort/chunar-fort-3.jpg',
                        '/mirzapur/chunar-fort/chunar-fort-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Chunar Fort Ganga View', 'Mirzapur'),
                    coordinates: { lat: 25.1278, lng: 82.8767 },
                    insiderTip: 'Sunset over the curving Ganga from the fort ramparts is a photographer’s dream.',
                    tags: ['Sher Shah Suri', 'Cliff Fort', 'Ganga Panorama']
                },
                {
                    id: 'm_ghanta',
                    place: 'Ghanta Ghar Victorian Clock Tower & Bazaars',
                    category: 'heritage',
                    categoryLabel: 'Heritage & History',
                    icon: '🏛️',
                    activity: 'Mirzapur 1891 Victorian Red Sandstone Clock Tower Walk',
                    description: 'Historic colonial clock tower built of finely carved Chunar sandstone, standing tall in the heart of Mirzapur’s historic brass and carpet market squares.',
                    duration: '1 hr',
                    distFromBase: '1 km',
                    travelTimeCab: '5 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '—',
                    cost: 40,
                    image: '/mirzapur/ghanta-ghar/ghanta-ghar-1.jpg',
                    images: [
                        '/mirzapur/ghanta-ghar/ghanta-ghar-1.jpg',
                        '/mirzapur/ghanta-ghar/ghanta-ghar-2.jpg',
                        '/mirzapur/ghanta-ghar/ghanta-ghar-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Ghanta Ghar Mirzapur Clock Tower', 'Mirzapur'),
                    coordinates: { lat: 25.1510, lng: 82.5690 },
                    insiderTip: 'Try the famous local jalebis and rabri in clay cups right next to the tower.',
                    tags: ['Clock Tower', 'Sandstone Carvings', 'Heritage Market']
                },
                {
                    id: 'm_crafts',
                    place: 'Mirzapur Carpet & Brass Guilds',
                    category: 'ghats_culture',
                    categoryLabel: 'Culture & Crafts',
                    icon: '🧶',
                    activity: 'Handcrafted Persian Carpet Looms & Brass Guild Tour',
                    description: 'Visit traditional artisan workshops to watch hereditary master craftspeople weave hand-knotted woolen carpets and cast bell-metal utensils.',
                    duration: '1.5 hrs',
                    distFromBase: '4 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 50,
                    image: '/mirzapur/pakka-ghat/pakka-ghat-1.jpg',
                    images: [
                        '/mirzapur/pakka-ghat/pakka-ghat-1.jpg',
                        '/mirzapur/pakka-ghat/pakka-ghat-2.jpg',
                        '/mirzapur/lal-bhairav/lal-bhairav-1.jpg',
                        '/mirzapur/ghanta-ghar/ghanta-ghar-1.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Mirzapur Handmade Woolen Carpet Brass', 'Mirzapur'),
                    coordinates: { lat: 25.1480, lng: 82.5720 },
                    insiderTip: 'GI-tagged Mirzapur woolen dhurries make authentic, lightweight take-home souvenirs.',
                    tags: ['GI Tag Heritage', 'Woolen Carpets', 'Brass Casting']
                }
            ]
        },
        sonbhadra: {
            name: 'Sonbhadra',
            tagline: 'Fossil Parks, Prehistoric Cave Art, Forests & Giant Dams',
            image: '/sonebhadra/fossils-park/fossils-park-1.jpg',
            images: [
                '/sonebhadra/fossils-park/fossils-park-1.jpg',
                '/sonebhadra/vijaygarh-fort/vijaygarh-fort-1.jpg',
                '/sonebhadra/mukkha-fall/mukkha-fall-1.jpg',
                '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
                '/sonebhadra/agori-fort/agori-fort-1.jpg',
                '/sonebhadra/dhandharoul-dam/dhandharoul-dam-1.jpg'
            ],
            googleImagesUrl: getGoogleImagesUrl('Salkhan Fossil Park Rihand Dam Mukha Falls', 'Sonbhadra'),
            coordinates: { lat: 24.6860, lng: 83.0640 },
            hotels: {
                budget: { name: 'Forest Rest House / Robertsganj Inn', type: 'Eco Guesthouse', pricePerNight: 850, address: 'Robertsganj Market, Sonbhadra', rating: 4.1, amenities: ['Basic Clean Rooms', 'Homestyle Food', 'Forest Desk'], coordinates: { lat: 24.6920, lng: 83.0680 } },
                moderate: { name: 'Hotel Shivam / Renukoot Heights', type: 'Comfort Hotel', pricePerNight: 2200, address: 'Robertsganj / Renukoot Road, Sonbhadra', rating: 4.3, amenities: ['AC Deluxe Rooms', 'Restaurant', 'Guide Arrangement'], coordinates: { lat: 24.6810, lng: 83.0590 } },
                luxury: { name: 'Govind Sagar Lakefront Eco-Camp', type: 'Lakefront Nature Camp', pricePerNight: 4800, address: 'Rihand Dam Road, Sonbhadra', rating: 4.6, amenities: ['Lakefront Tents', 'Campfire & Stargazing', 'Geology Guide'], coordinates: { lat: 24.2150, lng: 83.0250 } }
            },
            culinarySpots: [
                {
                    name: 'Robertsganj Chowk Dhaba',
                    specialty: 'Hot Poori-Sabzi, Fresh Curd & Jalebi',
                    mealType: 'Breakfast',
                    avgCost: 90,
                    coordinates: { lat: 24.6880, lng: 83.0660 },
                    image: '/sonebhadra/dongia-picnic-spot/dongia-picnic-spot-1.jpg',
                    images: [
                        '/sonebhadra/dongia-picnic-spot/dongia-picnic-spot-1.jpg',
                        '/sonebhadra/dongia-picnic-spot/dongia-picnic-spot-2.jpg'
                    ]
                },
                {
                    name: 'Belan Valley Tribal Kitchen',
                    specialty: 'Roasted Bhutta (Corn), Desi Aloo Chokha & Arhar Dal',
                    mealType: 'Lunch',
                    avgCost: 130,
                    coordinates: { lat: 24.6150, lng: 83.0450 },
                    image: '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                    images: [
                        '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                        '/sonebhadra/sun-eco-point/sun-eco-point-2.jpg'
                    ]
                },
                {
                    name: 'Rihand Lakefront Eateries',
                    specialty: 'Crispy Hot Samosas & Masala Chai at Sunset',
                    mealType: 'Snack/Tea',
                    avgCost: 60,
                    coordinates: { lat: 24.2100, lng: 83.0290 },
                    image: '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
                    images: [
                        '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
                        '/sonebhadra/rihand-dam/rihand-dam-2.jpg'
                    ]
                },
                {
                    name: 'Son Valley Dining Hall',
                    specialty: 'Local River Fish Curry or Paneer Butter Masala with Fresh Rotis',
                    mealType: 'Dinner',
                    avgCost: 320,
                    coordinates: { lat: 24.6830, lng: 83.0620 },
                    image: '/sonebhadra/dhandharoul-dam/dhandharoul-dam-1.jpg',
                    images: [
                        '/sonebhadra/dhandharoul-dam/dhandharoul-dam-1.jpg',
                        '/sonebhadra/dhandharoul-dam/dhandharoul-dam-2.jpg'
                    ]
                }
            ],
            sights: [
                {
                    id: 's_fossils',
                    place: 'Salkhan Fossil Park',
                    category: 'forests_fossils',
                    categoryLabel: 'Forests, Fossils & Cave Art',
                    icon: '🌲',
                    activity: 'Salkhan Fossil Park Guided Geological Exploration',
                    description: 'Walk among 1.4-billion-year-old fossilized stromatolites (cyanobacteria tree rings) that date back to the Mesoproterozoic era—older than the Grand Canyon fossils.',
                    duration: '2.5 hrs',
                    distFromBase: '15 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '40 mins',
                    cost: 80,
                    image: '/sonebhadra/fossils-park/fossils-park-1.jpg',
                    images: [
                        '/sonebhadra/fossils-park/fossils-park-1.jpg',
                        '/sonebhadra/fossils-park/fossils-park-2.jpg',
                        '/sonebhadra/fossils-park/fossils-park-3.jpg',
                        '/sonebhadra/fossils-park/fossils-park-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Salkhan Fossil Park Stromatolites', 'Sonbhadra'),
                    coordinates: { lat: 24.5886, lng: 83.0886 },
                    insiderTip: 'Carry a camera with a macro mode to capture the intricate concentric rings on the petrified tree trunks.',
                    tags: ['1.4 Billion Yrs Old', 'Geological Wonder', 'Fossil Forest']
                },
                {
                    id: 's_caves',
                    place: 'Panchmukhi & Kauva Khoh Caves',
                    category: 'forests_fossils',
                    categoryLabel: 'Forests, Fossils & Cave Art',
                    icon: '🎨',
                    activity: 'Panchmukhi Prehistoric Red-Ochre Cave Paintings Exploration',
                    description: 'Discover secluded rock shelters adorned with Stone Age Mesolithic cave art depicting hunting parties, wild rhinos, sun symbols, and ancient dancers.',
                    duration: '2 hrs',
                    distFromBase: '22 km',
                    travelTimeCab: '35 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '50 mins',
                    cost: 50,
                    image: '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                    images: [
                        '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                        '/sonebhadra/sun-eco-point/sun-eco-point-2.jpg',
                        '/sonebhadra/sun-eco-point/sun-eco-point-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Panchmukhi Prehistoric Rock Art Caves', 'Sonbhadra'),
                    coordinates: { lat: 24.6200, lng: 83.0500 },
                    insiderTip: 'Hire a knowledgeable local forest guide in Robertsganj to easily spot hidden cave crevices.',
                    tags: ['Prehistoric Art', 'Cave Shelters', 'Stone Age Paintings']
                },
                {
                    id: 's_mukha',
                    place: 'Mukha Falls & Belan Canyon',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Mukha Falls Jungle Trek & Sandstone Canyon Gorge',
                    description: 'Dramatic waterfall where the Belan River plunges over 100 feet of sheer red sandstone cliff faces into a pristine jungle canyon.',
                    duration: '2 hrs',
                    distFromBase: '40 km',
                    travelTimeCab: '55 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '1.3 hrs',
                    cost: 60,
                    image: '/sonebhadra/mukkha-fall/mukkha-fall-1.jpg',
                    images: [
                        '/sonebhadra/mukkha-fall/mukkha-fall-1.jpg',
                        '/sonebhadra/mukkha-fall/mukkha-fall-2.jpg',
                        '/sonebhadra/mukkha-fall/mukkha-fall-3.jpg',
                        '/sonebhadra/mukkha-fall/mukkha-fall-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Mukha Falls Belan River Canyon', 'Sonbhadra'),
                    coordinates: { lat: 24.5500, lng: 83.1500 },
                    insiderTip: 'Spectacular wilderness photo opportunities; remain on marked viewing perimeters.',
                    tags: ['Canyon Waterfall', 'Jungle Valley', 'Wilderness']
                },
                {
                    id: 's_rihand',
                    place: 'Rihand Dam & Govind Ballabh Pant Sagar',
                    category: 'adventure',
                    categoryLabel: 'Scenic Views & Waterways',
                    icon: '🏞️',
                    activity: 'Govind Ballabh Pant Sagar Inland Sea Sunset View',
                    description: 'Marvel at one of Asia’s largest artificial lakes, framed by emerald Vindhyan ridges and generating clean hydroelectric energy.',
                    duration: '2 hrs',
                    distFromBase: '65 km',
                    travelTimeCab: '1.2 hrs',
                    travelTimeTrain: '—',
                    travelTimeBus: '1.8 hrs',
                    cost: 50,
                    image: '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
                    images: [
                        '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
                        '/sonebhadra/rihand-dam/rihand-dam-2.jpg',
                        '/sonebhadra/rihand-dam/rihand-dam-3.jpg',
                        '/sonebhadra/rihand-dam/rihand-dam-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Rihand Dam Govind Ballabh Pant Sagar', 'Sonbhadra'),
                    coordinates: { lat: 24.2000, lng: 83.0300 },
                    insiderTip: 'Sunset over the vast reservoir gives the illusion of being at an endless seaside shore.',
                    tags: ['Mega Dam', 'Inland Sea', 'Sunset Panorama']
                },
                {
                    id: 's_vijaygarh',
                    place: 'Vijaygarh Fort Hilltop Citadel',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Forts',
                    icon: '🏰',
                    activity: '5th-Century Vijaygarh Fort Mountain Citadel Trek',
                    description: 'Climb 400 feet up to the ancient mountain citadel famous for perennial hilltop sweetwater reservoirs (Ram Sagar) and ancient rock inscriptions.',
                    duration: '3 hrs',
                    distFromBase: '30 km',
                    travelTimeCab: '45 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '1 hr',
                    cost: 60,
                    image: '/sonebhadra/vijaygarh-fort/vijaygarh-fort-1.jpg',
                    images: [
                        '/sonebhadra/vijaygarh-fort/vijaygarh-fort-1.jpg',
                        '/sonebhadra/vijaygarh-fort/vijaygarh-fort-2.jpg',
                        '/sonebhadra/vijaygarh-fort/vijaygarh-fort-3.jpg',
                        '/sonebhadra/vijaygarh-fort/vijaygarh-fort-4.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Vijaygarh Fort Mountain Citadel', 'Sonbhadra'),
                    coordinates: { lat: 24.5800, lng: 83.2200 },
                    insiderTip: 'Requires climbing ~750 stone steps; start early in the morning with ample drinking water.',
                    tags: ['Hilltop Fort', 'Trek', 'Ancient Inscriptions']
                },
                {
                    id: 's_obra',
                    place: 'Obra Dam Lake & Scenic Reservoir',
                    category: 'adventure',
                    categoryLabel: 'Scenic Views & Waterways',
                    icon: '🏞️',
                    activity: 'Obra Dam Vast Reservoir Overlook & Eco Trail',
                    description: 'Expansive masonry gravity dam across the Rihand river, forming a sprawling water reservoir surrounded by quiet wooded shores and scenic sunset viewpoints.',
                    duration: '2 hrs',
                    distFromBase: '15 km',
                    travelTimeCab: '20 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '30 mins',
                    cost: 40,
                    image: '/sonebhadra/obra-dam/obra-dam-1.jpg',
                    images: [
                        '/sonebhadra/obra-dam/obra-dam-1.jpg',
                        '/sonebhadra/obra-dam/obra-dam-2.jpg',
                        '/sonebhadra/obra-dam/obra-dam-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Obra Dam Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.4167, lng: 82.9833 },
                    insiderTip: 'Very peaceful picnic atmosphere along the tranquil reservoir banks.',
                    tags: ['Dam Reservoir', 'Eco Picnic', 'Water View']
                },
                {
                    id: 's_vaishnodevi',
                    place: 'Maa Vaishnodevi Mandir (Dala)',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Dala Vaishnodevi Hilltop Cave Darshan',
                    description: 'Revered mountain cave temple modeled after Jammu’s holy Vaishno Devi shrine, nestled against rugged Vindhyan crags in Dala, complete with sacred cave passage.',
                    duration: '1.5 hrs',
                    distFromBase: '20 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '35 mins',
                    cost: 40,
                    image: '/sonebhadra/vaishnodevi-dala/vaishnodevi-dala-1.jpg',
                    images: [
                        '/sonebhadra/vaishnodevi-dala/vaishnodevi-dala-1.jpg',
                        '/sonebhadra/vaishnodevi-dala/vaishnodevi-dala-2.jpg',
                        '/sonebhadra/vaishnodevi-dala/vaishnodevi-dala-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Vaishnodevi Temple Dala Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.5300, lng: 83.0600 },
                    insiderTip: 'Climbing up the cave steps offers wide vistas of the Dala quarry hills.',
                    tags: ['Cave Temple', 'Vaishno Devi Replica', 'Spiritual Hill']
                },
                {
                    id: 's_mangleshwar',
                    place: 'Mangleshwar Mahadev Mandir',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Mangleshwar Ancient Shiva Lingam Darshan',
                    description: 'Centuries-old stone Shiva temple nestled in tranquil rural surroundings, revered for wish-fulfilling Mahadev worship and annual Shivratri festivities.',
                    duration: '1 hr',
                    distFromBase: '12 km',
                    travelTimeCab: '18 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 30,
                    image: '/sonebhadra/mangleshwar-mahadev/mangleshwar-mahadev-1.jpg',
                    images: [
                        '/sonebhadra/mangleshwar-mahadev/mangleshwar-mahadev-1.jpg',
                        '/sonebhadra/mangleshwar-mahadev/mangleshwar-mahadev-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Mangleshwar Mahadev Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.6400, lng: 83.0500 },
                    insiderTip: 'Known for its peaceful rural setting away from urban commotion.',
                    tags: ['Shiva Temple', 'Ancient Lingam', 'Serene Shrine']
                },
                {
                    id: 's_sun_eco',
                    place: 'Sun Eco Point & Churk Valley',
                    category: 'adventure',
                    categoryLabel: 'Scenic Views & Waterways',
                    icon: '🌄',
                    activity: 'Churk Valley Sun Eco Point Sunrise & Escarpment Overlook',
                    description: 'Panoramic mountain ridge viewpoint near Churk, looking out across the vast Vindhyan valley gorges, sunrise vistas, and endemic forest flora.',
                    duration: '1.5 hrs',
                    distFromBase: '14 km',
                    travelTimeCab: '20 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '30 mins',
                    cost: 40,
                    image: '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                    images: [
                        '/sonebhadra/sun-eco-point/sun-eco-point-1.jpg',
                        '/sonebhadra/sun-eco-point/sun-eco-point-2.jpg',
                        '/sonebhadra/sun-eco-point/sun-eco-point-3.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Sun Eco Point Churk Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.6200, lng: 83.0800 },
                    insiderTip: 'Spectacular early morning sunrise views over the mist-covered Churk valley.',
                    tags: ['Valley Overlook', 'Sunrise Point', 'Eco Tourism']
                },
                {
                    id: 's_dhandharoul',
                    place: 'Dhandharoul Dam Waterfall Cascades',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Dhandharoul Dam Spillway Foaming Cascades & Picnic Overlook',
                    description: 'Scenic masonry dam surrounded by rolling Vindhya hills where cascading spillway waters create rushing white-water rapids and refreshing pools.',
                    duration: '2 hrs',
                    distFromBase: '28 km',
                    travelTimeCab: '35 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '50 mins',
                    cost: 50,
                    image: '/sonebhadra/dhandharoul-dam/dhandharoul-dam-1.jpg',
                    images: [
                        '/sonebhadra/dhandharoul-dam/dhandharoul-dam-1.jpg',
                        '/sonebhadra/dhandharoul-dam/dhandharoul-dam-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Dhandharoul Dam Cascades Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.6830, lng: 83.0620 },
                    insiderTip: 'Excellent sunset viewpoint over the vast water reservoir.',
                    tags: ['Dam Cascades', 'Vindhya Hills', 'Scenic Reservoir']
                },
                {
                    id: 's_dongia',
                    place: 'Dongia Cascading Stream & Rock Plunge',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Dongia Natural Rock Stream Hike & Waterfall Bath',
                    description: 'Hidden ecological gem with cool forest stream cascades sliding over smooth bedrock shelves into natural wading basins.',
                    duration: '2 hrs',
                    distFromBase: '18 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '35 mins',
                    cost: 40,
                    image: '/sonebhadra/dongia-picnic-spot/dongia-picnic-spot-1.jpg',
                    images: [
                        '/sonebhadra/dongia-picnic-spot/dongia-picnic-spot-1.jpg',
                        '/sonebhadra/dongia-picnic-spot/dongia-picnic-spot-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Dongia Picnic Spot Stream Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.6500, lng: 83.0800 },
                    insiderTip: 'Very quiet and peaceful spot favored by nature lovers.',
                    tags: ['Rock Stream', 'Cascades', 'Eco Picnic']
                },
                {
                    id: 's_khanta',
                    place: 'Khanta Forest Waterfall & Lagoon',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Scenic Nature',
                    icon: '🌊',
                    activity: 'Khanta Forest Cascade Hike & Sandstone Lagoon',
                    description: 'Secluded forest waterfall nestled in native sal woods, cascading into a serene rock basin surrounded by untouched wildlife habitat.',
                    duration: '2 hrs',
                    distFromBase: '32 km',
                    travelTimeCab: '40 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '55 mins',
                    cost: 50,
                    image: '/sonebhadra/khanta-picnic-spot/khanta-picnic-spot-1.jpg',
                    images: [
                        '/sonebhadra/khanta-picnic-spot/khanta-picnic-spot-1.jpg',
                        '/sonebhadra/khanta-picnic-spot/khanta-picnic-spot-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Khanta Waterfall Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.6300, lng: 83.0950 },
                    insiderTip: 'Carry binoculars to spot Indian peacocks and paradise flycatchers.',
                    tags: ['Secluded Waterfall', 'Sal Forest', 'Bird Watching']
                },
                {
                    id: 's_agori',
                    place: 'Agori Fort on Sone River Escarpment',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Ancient Forts',
                    icon: '🏰',
                    activity: 'Agori Fort Ancient Baland Dynasty River Citadel Exploration',
                    description: 'Historic river citadel surrounded on three sides by the Rihand, Bijul, and Sone rivers, containing ancient carvings and stone defensive bastions.',
                    duration: '2 hrs',
                    distFromBase: '25 km',
                    travelTimeCab: '35 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '50 mins',
                    cost: 50,
                    image: '/sonebhadra/agori-fort/agori-fort-1.jpg',
                    images: [
                        '/sonebhadra/agori-fort/agori-fort-1.jpg',
                        '/sonebhadra/agori-fort/agori-fort-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Agori Fort Sone River Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.5200, lng: 83.0100 },
                    insiderTip: 'Hire a wooden boat to view the fort walls rising dramatically above the river waters.',
                    tags: ['River Citadel', 'Baland Dynasty', 'Historical Ruins']
                },
                {
                    id: 's_jwalamukhi',
                    place: 'Jwalamukhi Devi Shaktipeeth Mandir',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Jwalamukhi Shaktipeeth Darshan & Sacred Temple Homa',
                    description: 'Ancient hill temple revered as the tongue of Sati, where sacred eternal fires have been worshipped for centuries by pilgrims seeking divine blessings.',
                    duration: '1.5 hrs',
                    distFromBase: '22 km',
                    travelTimeCab: '30 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '45 mins',
                    cost: 40,
                    image: '/sonebhadra/jwalamukhi-temple/jwalamukhi-temple-1.jpg',
                    images: [
                        '/sonebhadra/jwalamukhi-temple/jwalamukhi-temple-1.jpg',
                        '/sonebhadra/jwalamukhi-temple/jwalamukhi-temple-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Jwalamukhi Temple Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.5900, lng: 83.0400 },
                    insiderTip: 'Atmospheric morning arati with continuous sacred chants and bells.',
                    tags: ['Shaktipeeth', 'Eternal Flame', 'Sacred Darshan']
                },
                {
                    id: 's_renukeshwar',
                    place: 'Renukeshwar Mahadev Mandir',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Renukeshwar Shiva Temple Darshan & Lake Vista',
                    description: 'Prominent Shiva shrine situated along the scenic shores of the lake in Renukoot, known for its grand entrance gateway, carved shrines, and peaceful lawns.',
                    duration: '1.5 hrs',
                    distFromBase: '60 km',
                    travelTimeCab: '1.1 hrs',
                    travelTimeTrain: '—',
                    travelTimeBus: '1.5 hrs',
                    cost: 40,
                    image: '/sonebhadra/renukeshwar-mahadev/renukeshwar-mahadev-1.jpg',
                    images: [
                        '/sonebhadra/renukeshwar-mahadev/renukeshwar-mahadev-1.jpg',
                        '/sonebhadra/renukeshwar-mahadev/renukeshwar-mahadev-2.jpg'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Renukeshwar Mahadev Temple Sonbhadra', 'Sonbhadra'),
                    coordinates: { lat: 24.2100, lng: 83.0200 },
                    insiderTip: 'Well-maintained gardens make it a tranquil spiritual sanctuary.',
                    tags: ['Shiva Temple', 'Lake Vista', 'Peaceful Grounds']
                }
            ]
        },
        lucknow: {
            name: 'Lucknow',
            tagline: 'City of Nawabs, Grand Imambaras & Awadhi Heritage',
            image: '/lucknow/bara-imambara/bara-imambara-1.jpg',
            images: [
                '/lucknow/bara-imambara/bara-imambara-1.jpg',
                '/lucknow/rumi-darwaza/rumi-darwaza-1.jpg',
                '/lucknow/chota-imambada/chota-imambada-1.jpg',
                '/lucknow/ambedkar-memorial/ambedkar-memorial-1.jpg'
            ],
            googleImagesUrl: getGoogleImagesUrl('Bara Imambara Rumi Darwaza Lucknow', 'Lucknow'),
            coordinates: { lat: 26.8467, lng: 80.9462 },
            hotels: {
                budget: { name: 'Clarks Heritage Stay (Hazratganj)', type: 'Budget Boutique Stay', pricePerNight: 1500, address: 'Hazratganj, Lucknow', rating: 4.3, amenities: ['Wi-Fi', 'Central Location', 'Breakfast'], coordinates: { lat: 26.8490, lng: 80.9430 } },
                moderate: { name: 'La Place Sarovar Portico', type: '3-Star Heritage Hotel', pricePerNight: 3400, address: 'Shah Najaf Road, Hazratganj, Lucknow', rating: 4.5, amenities: ['Awadhi Dining', 'AC Rooms', 'City Tours'], coordinates: { lat: 26.8540, lng: 80.9510 } },
                luxury: { name: 'Taj Mahal Lucknow', type: '5-Star Heritage Luxury', pricePerNight: 8500, address: 'Gomti Nagar, Lucknow', rating: 4.9, amenities: ['Pool', 'Fine Awadhi Cuisine', 'Private Chauffeur'], coordinates: { lat: 26.8565, lng: 80.9760 } }
            },
            culinarySpots: [
                { name: 'Tunday Kababi (Aminabad & Chowk)', specialty: 'Legendary Galouti Kebabs & Ulte Tawe Ka Paratha', mealType: 'Lunch/Dinner', avgCost: 220, coordinates: { lat: 26.8442, lng: 80.9278 } },
                { name: 'Royal Cafe (Hazratganj)', specialty: 'signature Basket Chaat & Old-World Snacks', mealType: 'Evening Snack', avgCost: 200, coordinates: { lat: 26.8510, lng: 80.9445 } }
            ],
            sights: [
                {
                    id: 'l_bara_imambara',
                    place: 'Bara Imambara & Bhool Bhulaiya',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Architecture',
                    icon: '🕌',
                    activity: 'Bara Imambara Hall, Bhool Bhulaiya Labyrinth & Shahi Baoli',
                    description: 'Built in 1784 by Nawab Asaf-ud-Daula, renowned for its unsupported arched central hall and famous 1,000-passage labyrinth.',
                    duration: '2.5 hrs',
                    distFromBase: '4.5 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 50,
                    image: '/lucknow/bara-imambara/bara-imambara-1.jpg',
                    images: ['/lucknow/bara-imambara/bara-imambara-1.jpg', '/lucknow/bara-imambara/bara-imambara-2.jpg', '/lucknow/bara-imambara/bara-imambara-3.jpg', '/lucknow/bara-imambara/bara-imambara-4.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Bara Imambara Bhool Bhulaiya', 'Lucknow'),
                    coordinates: { lat: 26.8693, lng: 80.9129 },
                    insiderTip: 'Hire an authorized guide at the gate for the Bhool Bhulaiya rooftop views.',
                    tags: ['Awadhi Heritage', 'Labyrinth', 'Stepwell']
                },
                {
                    id: 'l_rumi_darwaza',
                    place: 'Rumi Darwaza & Chota Imambada',
                    category: 'heritage',
                    categoryLabel: 'Heritage & Monuments',
                    icon: '🏛️',
                    activity: 'Iconic Rumi Gate & Palace of Lights Heritage Walk',
                    description: 'Stroll beneath the towering 60-foot signature Rumi Darwaza into the chandelier-filled Chota Imambada complex.',
                    duration: '1.5 hrs',
                    distFromBase: '5.0 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 50,
                    image: '/lucknow/rumi-darwaza/rumi-darwaza-1.jpg',
                    images: ['/lucknow/rumi-darwaza/rumi-darwaza-1.jpg', '/lucknow/chota-imambada/chota-imambada-1.jpg', '/lucknow/chota-imambada/chota-imambada-2.jpg', '/lucknow/rumi-darwaza/rumi-darwaza-2.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Rumi Darwaza Chota Imambada', 'Lucknow'),
                    coordinates: { lat: 26.8711, lng: 80.9110 },
                    insiderTip: 'Visit near sunset when Rumi Darwaza’s floral chhatri lights up warmly.',
                    tags: ['Iconic Gateway', 'Chandeliers', 'Hussainabad']
                },
                {
                    id: 'l_residency',
                    place: 'The Residency & Hazratganj Walk',
                    category: 'heritage',
                    categoryLabel: 'Historical Ruins & Culture',
                    icon: '🌿',
                    activity: '1857 Residency Museum Ruins & Hazratganj Ganjing Trail',
                    description: 'Explore tranquil red-brick 1857 heritage lawns followed by a Victorian boulevard stroll through Hazratganj.',
                    duration: '2 hrs',
                    distFromBase: '2.5 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 25,
                    image: '/lucknow/the-residency/the-residency-1.jpg',
                    images: ['/lucknow/the-residency/the-residency-1.jpg', '/lucknow/hazratganj/hazratganj-1.jpg', '/lucknow/la-martiniere-college/la-martiniere-college-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('The Residency Hazratganj', 'Lucknow'),
                    coordinates: { lat: 26.8606, lng: 80.9265 },
                    insiderTip: 'Pair Residency ruins with Royal Cafe Basket Chaat on Hazratganj MG Marg.',
                    tags: ['1857 Memorial', 'Chikankari', 'Heritage Walk']
                },
                {
                    id: 'l_ambedkar',
                    place: 'Dr. B. R. Ambedkar Memorial & Gomti Riverfront',
                    category: 'ghats_culture',
                    categoryLabel: 'Monumental Architecture',
                    icon: '✨',
                    activity: 'Sunset Sandstone Colonnade & Gomti Riverfront Breeze',
                    description: 'Stroll across monumental Chunar-sandstone domes and stone elephant galleries bordering the glowing Gomti Riverfront Park.',
                    duration: '1.5 hrs',
                    distFromBase: '6.0 km',
                    travelTimeCab: '15 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '25 mins',
                    cost: 20,
                    image: '/lucknow/ambedkar-memorial/ambedkar-memorial-1.jpg',
                    images: ['/lucknow/ambedkar-memorial/ambedkar-memorial-1.jpg', '/lucknow/gomti-riverfront-park/gomti-riverfront-park-1.jpg', '/lucknow/janeshwar-mishra-park/janeshwar-mishra-park-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Ambedkar Memorial Park Lucknow', 'Lucknow'),
                    coordinates: { lat: 26.8473, lng: 80.9765 },
                    insiderTip: 'Reach around 5:00 PM for twilight sandstone glow and riverfront fountains.',
                    tags: ['Pink Sandstone', 'Gomti Riverfront', 'Sunset Vista']
                },
                {
                    id: 'l_mankameshwar',
                    place: 'Shri Mankameshwar Temple & Sri Ramakrishna Math',
                    category: 'spiritual',
                    categoryLabel: 'Spiritual & Sacred',
                    icon: '🕉️',
                    activity: 'Ancient Gomti Riverside Shiva Darshan & Peace Sanctuary',
                    description: 'Seek serene blessings at historic Mankameshwar Temple on the Gomti banks and Sri Ramakrishna Math.',
                    duration: '1.5 hrs',
                    distFromBase: '4.0 km',
                    travelTimeCab: '12 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 0,
                    image: '/lucknow/mankameshwar-temple/mankameshwar-temple-3.jpg',
                    images: ['/lucknow/mankameshwar-temple/mankameshwar-temple-3.jpg', '/lucknow/ramakrishna-math/ramakrishna-math-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Mankameshwar Temple Lucknow', 'Lucknow'),
                    coordinates: { lat: 26.8669, lng: 80.9317 },
                    insiderTip: 'Morning arati offers tranquil serenity beside the river.',
                    tags: ['Shiva Temple', 'Meditation', 'Gomti Banks']
                }
            ]
        },
        ayodhya: {
            name: 'Ayodhya',
            tagline: 'Sacred Dham of Shri Ram, Saryu Ghats & Ancient Heritage',
            image: '/ayodhya/ram-janmabhoomi/ram-janmabhoomi-1.jpg',
            images: [
                '/ayodhya/ram-janmabhoomi/ram-janmabhoomi-1.jpg',
                '/ayodhya/hanuman-garhi/hanuman-garhi-2.jpg',
                '/ayodhya/kanak-bhawan/kanak-bhawan-2.jpg',
                '/ayodhya/saryu-ghat/saryu-ghat-1.jpg'
            ],
            googleImagesUrl: getGoogleImagesUrl('Shri Ram Janmabhoomi Temple Ayodhya', 'Ayodhya'),
            coordinates: { lat: 26.7957, lng: 82.1944 },
            hotels: {
                budget: { name: 'Ramprastha Dham Yatri Niwas', type: 'Sacred Pilgrim Guesthouse', pricePerNight: 1400, address: 'Naya Ghat / Ram Path, Ayodhya', rating: 4.3, amenities: ['Clean AC Rooms', 'Temple Transfers'], coordinates: { lat: 26.8030, lng: 82.2010 } },
                moderate: { name: 'Taraji Resort / Ramayana Hotel', type: '3-Star Heritage Stay', pricePerNight: 3600, address: 'Ram Path, Ayodhya', rating: 4.6, amenities: ['Sattvik Restaurant', 'Courtyard', 'Shuttle Service'], coordinates: { lat: 26.7860, lng: 82.1890 } },
                luxury: { name: 'The Ramayana Luxury Boutique', type: '4-Star Premium Hotel', pricePerNight: 7500, address: 'Ayodhya Dham Highway, Ayodhya', rating: 4.8, amenities: ['Concierge Darshan Help', 'Spa', 'Fine Dining'], coordinates: { lat: 26.7790, lng: 82.1950 } }
            },
            culinarySpots: [
                { name: 'Bhakti Path Traditional Mithai Shops', specialty: 'Pure Desi Ghee Besan Laddoos & Kheer Prasadam', mealType: 'Prasad/Breakfast', avgCost: 120, coordinates: { lat: 26.7980, lng: 82.1960 } },
                { name: 'Naya Ghat Satvik Bhojanalaya', specialty: 'Traditional Poori-Sabzi, Kadhi Chawal & Saffron Rabri', mealType: 'Lunch', avgCost: 180, coordinates: { lat: 26.8050, lng: 82.2050 } }
            ],
            sights: [
                {
                    id: 'ay_ram_mandir',
                    place: 'Shree Ram Janmabhoomi Temple',
                    category: 'spiritual',
                    categoryLabel: 'Supreme Sacred Shrine',
                    icon: '🛕',
                    activity: 'Shree Ram Janmabhoomi Darshan & Sandstone Mandapas',
                    description: 'Monumental three-story Nagara pink-sandstone temple enshrining Shri Ram Lalla at the sacred birthplace of Lord Rama.',
                    duration: '2 hrs',
                    distFromBase: '2.0 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 0,
                    image: '/ayodhya/ram-janmabhoomi/ram-janmabhoomi-1.jpg',
                    images: ['/ayodhya/ram-janmabhoomi/ram-janmabhoomi-1.jpg', '/ayodhya/ram-janmabhoomi/ram-janmabhoomi-2.jpg', '/ayodhya/ram-janmabhoomi/ram-janmabhoomi-3.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Shree Ram Janmabhoomi Temple Ayodhya', 'Ayodhya'),
                    coordinates: { lat: 26.7957, lng: 82.1944 },
                    insiderTip: 'Leave phones/bags in free Janmabhoomi Path lockers before entering the darshan queue.',
                    tags: ['Ram Mandir', 'Nagara Sandstone', 'Birthplace']
                },
                {
                    id: 'ay_hanuman_garhi',
                    place: 'Shri Hanuman Garhi Mandir & Kanak Bhawan',
                    category: 'spiritual',
                    categoryLabel: 'Fortress Temple & Palace',
                    icon: '🙏',
                    activity: 'Hanuman Garhi Hilltop Darshan & Kanak Bhawan Golden Shrine',
                    description: 'Ascend 76 steps to seek Lord Hanuman’s blessings before visiting Queen Kaikeyi’s golden-crowned Kanak Bhawan palace shrine.',
                    duration: '1.5 hrs',
                    distFromBase: '1.8 km',
                    travelTimeCab: '8 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 0,
                    image: '/ayodhya/hanuman-garhi/hanuman-garhi-2.jpg',
                    images: ['/ayodhya/hanuman-garhi/hanuman-garhi-2.jpg', '/ayodhya/kanak-bhawan/kanak-bhawan-2.jpg', '/ayodhya/dashrath-mahal/dashrath-mahal-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Hanuman Garhi Kanak Bhawan Ayodhya', 'Ayodhya'),
                    coordinates: { lat: 26.7966, lng: 82.1995 },
                    insiderTip: 'Traditional Ayodhya pilgrimage visits Hanuman Garhi prior to Ram Janmabhoomi.',
                    tags: ['Hanuman Garhi', 'Kanak Bhawan', 'Dashrath Mahal']
                },
                {
                    id: 'ay_saryu_ghat',
                    place: 'Saryu Ghat & Ram Ki Paidi',
                    category: 'ghats_culture',
                    categoryLabel: 'Sacred Riverfront',
                    icon: '🪔',
                    activity: 'Evening Saryu Aarti, Ram Ki Paidi Canal Pools & Deepotsav Steps',
                    description: 'Witness luminous dusk aartis along the peaceful stepped ghats of the Saryu River flanked by Nageshwar Nath Mandir.',
                    duration: '1.5 hrs',
                    distFromBase: '3.0 km',
                    travelTimeCab: '10 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '15 mins',
                    cost: 0,
                    image: '/ayodhya/saryu-ghat/saryu-ghat-1.jpg',
                    images: ['/ayodhya/saryu-ghat/saryu-ghat-1.jpg', '/ayodhya/nageshwar-nath-mandir/nageshwar-nath-mandir-1.jpg', '/ayodhya/ram-katha-park/ram-katha-park-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Saryu Ghat Ram Ki Paidi Ayodhya', 'Ayodhya'),
                    coordinates: { lat: 26.8077, lng: 82.2036 },
                    insiderTip: 'Arrive around 5:30 PM to see Ram Ki Paidi stone bridges glow warmly at sunset.',
                    tags: ['Saryu Aarti', 'Ram Ki Paidi', 'Nageshwar Nath']
                },
                {
                    id: 'ay_guptar_gulab',
                    place: 'Guptar Ghat, Mani Parvat & Gulab Bari',
                    category: 'heritage',
                    categoryLabel: 'River & Royal Heritage',
                    icon: '🏰',
                    activity: 'Serene Guptar Ghat Bend & Historical Gulab Bari Gardens',
                    description: 'Explore peaceful riverside ghats revered in Ramayana lore along with Awadhi rose-garden heritage at Imambada Gulab Bari.',
                    duration: '2 hrs',
                    distFromBase: '6.5 km',
                    travelTimeCab: '20 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '30 mins',
                    cost: 20,
                    image: '/ayodhya/guptar-ghat/guptar-ghat-4.jpg',
                    images: ['/ayodhya/guptar-ghat/guptar-ghat-4.jpg', '/ayodhya/gulab-bari/gulab-bari-1.jpg', '/ayodhya/mani-parvat/mani-parvat-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Guptar Ghat Gulab Bari Ayodhya', 'Ayodhya'),
                    coordinates: { lat: 26.7852, lng: 82.1190 },
                    insiderTip: 'Perfect peaceful afternoon circuit away from main temple lane crowds.',
                    tags: ['Guptar Ghat', 'Gulab Bari', 'Mani Parvat']
                }
            ]
        },
        mathura: {
            name: 'Mathura & Vrindavan',
            tagline: 'Sacred Birthplace of Lord Krishna, Marble Temples & Yamuna Ghats',
            image: '/mathura/prem-mandir/prem-mandir-1.jpg',
            images: [
                '/mathura/prem-mandir/prem-mandir-1.jpg',
                '/mathura/krishna-janmasthan/krishna-janmasthan-1.jpg',
                '/mathura/banke-bihari-mandir/banke-bihari-mandir-2.jpg',
                '/mathura/vishram-ghat/vishram-ghat-1.jpg'
            ],
            googleImagesUrl: getGoogleImagesUrl('Prem Mandir Krishna Janmasthan Mathura', 'Mathura'),
            coordinates: { lat: 27.4924, lng: 77.6737 },
            hotels: {
                budget: { name: 'Brijwasi Inn (Junction Road)', type: 'Comfort Pilgrim Hotel', pricePerNight: 1400, address: 'Dampier Nagar, Mathura', rating: 4.3, amenities: ['Pure Veg Dining', 'Clean AC Rooms'], coordinates: { lat: 27.4940, lng: 77.6750 } },
                moderate: { name: 'Nidhivan Sarovar Portico', type: '3-Star Vrindavan Retreat', pricePerNight: 3600, address: 'Khasra 797, Vrindavan', rating: 4.6, amenities: ['Sattvik Buffet', 'E-Rickshaw Desk', 'Lush Courtyard'], coordinates: { lat: 27.5710, lng: 77.6755 } },
                luxury: { name: 'Kadamb Resort & Heritage Braj', type: '4-Star Sanctuary Resort', pricePerNight: 7200, address: 'Chhatikara–Vrindavan Road', rating: 4.8, amenities: ['Pool', 'Temple Transfers', 'Braj Cultural Shows'], coordinates: { lat: 27.5680, lng: 77.6520 } }
            },
            culinarySpots: [
                { name: 'Brijwasi Mithai Wala (Holi Gate)', specialty: 'Authentic Mathura Peda, Bedai Poori & Kulhad Lassi', mealType: 'Breakfast', avgCost: 140, coordinates: { lat: 27.5030, lng: 77.6850 } },
                { name: 'Govinda’s Restaurant (ISKCON Vrindavan)', specialty: 'Pure Sattvik Prasadam Thali & Herbal Drinks', mealType: 'Lunch/Dinner', avgCost: 300, coordinates: { lat: 27.5720, lng: 77.6790 } }
            ],
            sights: [
                {
                    id: 'mt_janmasthan',
                    place: 'Shri Krishna Janmasthan & Dwarkadhish Temple',
                    category: 'spiritual',
                    categoryLabel: 'Sacred Birthplace',
                    icon: '🦚',
                    activity: 'Garbha Griha Prison Sanctum, Bhagavata Bhawan & Dwarkadhish',
                    description: 'Begin your Braj pilgrimage at Lord Krishna’s holy birthplace before exploring the ornate Rajasthani haveli carvings of Dwarkadhish Temple.',
                    duration: '2.5 hrs',
                    distFromBase: '2.0 km',
                    travelTimeCab: '12 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '20 mins',
                    cost: 0,
                    image: '/mathura/krishna-janmasthan/krishna-janmasthan-1.jpg',
                    images: ['/mathura/krishna-janmasthan/krishna-janmasthan-1.jpg', '/mathura/dwarkadhish-temple/dwarkadhish-temple-2.png', '/mathura/kans-quila/kans-quila-2.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Shri Krishna Janmasthan Mathura', 'Mathura'),
                    coordinates: { lat: 27.5048, lng: 77.6696 },
                    insiderTip: 'Store phones and leather belts in the official gate lockers outside Janmasthan prior to queuing.',
                    tags: ['Janmasthan', 'Dwarkadhish', 'Kans Quila']
                },
                {
                    id: 'mt_prem_mandir',
                    place: 'Prem Mandir & ISKCON Vrindavan',
                    category: 'spiritual',
                    categoryLabel: 'White Marble Shrines',
                    icon: '🏛️',
                    activity: 'Evening Illuminated Prem Mandir & ISKCON Hare Krishna Kirtan',
                    description: 'Experience blissful devotional kirtan at Raman Reti’s marble ISKCON temple followed by Prem Mandir’s illuminated Krishna Leela gardens.',
                    duration: '2.5 hrs',
                    distFromBase: '11 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '35 mins',
                    cost: 0,
                    image: '/mathura/prem-mandir/prem-mandir-1.jpg',
                    images: ['/mathura/prem-mandir/prem-mandir-1.jpg', '/mathura/iskcon-vrindavan/iskcon-vrindavan-2.jpg', '/mathura/prem-mandir/prem-mandir-2.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Prem Mandir ISKCON Vrindavan', 'Vrindavan'),
                    coordinates: { lat: 27.5719, lng: 77.6725 },
                    insiderTip: 'Stay at Prem Mandir until 7:00 PM to enjoy the shifting rainbow marble illumination and water show.',
                    tags: ['Italian Marble', 'ISKCON Kirtan', 'Light Show']
                },
                {
                    id: 'mt_banke_bihari',
                    place: 'Banke Bihari Mandir, Nidhivan & Radha Raman',
                    category: 'spiritual',
                    categoryLabel: 'Ancient Braj Kunjs',
                    icon: '🙏',
                    activity: 'Sacred Jhanki Darshan & Mystic Tulsi Grove Trail',
                    description: 'Seek joyful blessings in the heart of old Vrindavan spanning Banke Bihari, ancient Radha Raman Lal, and mystical Nidhivan.',
                    duration: '2 hrs',
                    distFromBase: '12 km',
                    travelTimeCab: '25 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '35 mins',
                    cost: 0,
                    image: '/mathura/banke-bihari-mandir/banke-bihari-mandir-2.jpg',
                    images: ['/mathura/banke-bihari-mandir/banke-bihari-mandir-2.jpg', '/mathura/nidhivan-vrindavan/nidhivan-vrindavan-2.jpg', '/mathura/radha-raman-temple/radha-raman-temple-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Banke Bihari Nidhivan Vrindavan', 'Vrindavan'),
                    coordinates: { lat: 27.5801, lng: 77.6901 },
                    insiderTip: 'Tuck away eyeglasses safely in Vrindavan narrow lanes; Nidhivan gates close strictly before dark.',
                    tags: ['Banke Bihari', 'Nidhivan', 'Radha Raman']
                },
                {
                    id: 'mt_vishram_kusum',
                    place: 'Vishram Ghat & Kusum Sarovar (Govardhan)',
                    category: 'heritage',
                    categoryLabel: 'Ghats & Sandstone Kunds',
                    icon: '🪔',
                    activity: 'Kusum Sarovar Jat Chhatris & Dusk Yamuna Aarti at Vishram Ghat',
                    description: 'Marvel at mirror-still royal sandstone pavilions along Govardhan hill and conclude with floating oil lamps on the Yamuna.',
                    duration: '2.5 hrs',
                    distFromBase: '20 km',
                    travelTimeCab: '35 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '50 mins',
                    cost: 0,
                    image: '/mathura/kusum-sarovar/kusum-sarovar-1.jpg',
                    images: ['/mathura/kusum-sarovar/kusum-sarovar-1.jpg', '/mathura/vishram-ghat/vishram-ghat-1.jpg', '/mathura/radha-rani-barsana/radha-rani-barsana-1.jpg'],
                    googleImagesUrl: getGoogleImagesUrl('Kusum Sarovar Vishram Ghat', 'Mathura'),
                    coordinates: { lat: 27.5150, lng: 77.4795 },
                    insiderTip: 'Reach Kusum Sarovar in afternoon sunlight and return to Vishram Ghat right before sunset aarti.',
                    tags: ['Vishram Ghat', 'Kusum Sarovar', 'Yamuna Aarti']
                }
            ]
        }
    };

    // 2. Helper to check if a destination possesses sights matching user's selected category
    const destinationHasMatchingSights = (cityId) => {
        const sights = DESTINATION_MASTER[cityId]?.sights || [];
        return sights.some(s => isInterestMatch(s.category));
    };

    // Helper to map user's chosen pickup or focus location strictly to the starting hub destination
    const getStartCityId = (loc) => {
        const str = (loc || '').toLowerCase().trim();
        if (str.includes('mathura') || str.includes('vrindavan')) return 'mathura';
        if (str.includes('ayodhya') || str.includes('faizabad')) return 'ayodhya';
        if (str.includes('lucknow')) return 'lucknow';
        if (str.includes('varanasi') || str.includes('banaras') || str.includes('kashi') || str.includes('vns')) return 'banaras';
        if (str.includes('allahabad') || str.includes('prayagraj') || str.includes('sangam')) return 'allahabad';
        if (str.includes('mirzapur') || str.includes('vindhyachal') || str.includes('chunar')) return 'mirzapur';
        if (str.includes('sonbhadra') || str.includes('sonebhadra') || str.includes('robertsganj')) return 'sonbhadra';
        return 'banaras';
    };

    const startCityId = getStartCityId(formData.focusCity || pickupLoc);
    const startCityObj = ranked.find(c => c.id === startCityId) || {
        id: startCityId,
        name: DESTINATION_MASTER[startCityId]?.name || startCityId,
        tagline: DESTINATION_MASTER[startCityId]?.tagline || '',
        image: DESTINATION_MASTER[startCityId]?.image || '',
        images: DESTINATION_MASTER[startCityId]?.images || [],
        scores: { final: 96 },
        matchReasons: ['Direct Hub Start', 'Custom Attraction Anchor'],
        highlights: (DESTINATION_MASTER[startCityId]?.sights || []).slice(0, 3).map(s => s.place)
    };

    // Destinations that actually have sights matching the user's category preference
    const categoryMatchingCities = ranked.filter(c => destinationHasMatchingSights(c.id));
    const viableCities = categoryMatchingCities.length > 0 ? categoryMatchingCities : ranked;

    // Build the circuit:
    let circuitCities = [];
    let isPickupGatewayOnly = false;

    const isExtendedHub = startCityId === 'lucknow' || startCityId === 'ayodhya' || startCityId === 'mathura';

    if (isExtendedHub || destinationHasMatchingSights(startCityId) || formData.selectedPlace) {
        // Start directly in the user's selected/pickup city!
        if (totalDays === 1) {
            circuitCities = [startCityObj];
        } else if (totalDays === 2) {
            if (isExtendedHub) {
                const secondId = startCityId === 'lucknow' ? 'ayodhya' : startCityId === 'ayodhya' ? 'banaras' : 'lucknow';
                circuitCities = [startCityObj, { id: secondId, name: DESTINATION_MASTER[secondId].name }];
            } else {
                const nextCity = viableCities.find(c => c.id !== startCityId) || startCityObj;
                circuitCities = [startCityObj, nextCity];
            }
        } else if (totalDays <= 4) {
            if (isExtendedHub) {
                const secondId = startCityId === 'lucknow' ? 'ayodhya' : startCityId === 'ayodhya' ? 'banaras' : 'ayodhya';
                const thirdId = startCityId === 'lucknow' ? 'banaras' : startCityId === 'ayodhya' ? 'allahabad' : 'lucknow';
                circuitCities = [
                    startCityObj,
                    { id: secondId, name: DESTINATION_MASTER[secondId].name },
                    { id: thirdId, name: DESTINATION_MASTER[thirdId].name }
                ];
            } else {
                const others = viableCities.filter(c => c.id !== startCityId);
                circuitCities = [startCityObj, others[0] || startCityObj, others[1] || others[0] || startCityObj];
            }
        } else {
            const others = viableCities.filter(c => c.id !== startCityId);
            circuitCities = [startCityObj, ...others];
        }
    } else {
        // The pickup city is purely an arrival gateway hub (e.g. arrived at Varanasi Airport for Waterfalls)
        isPickupGatewayOnly = true;
        const primaryDest = viableCities[0] || startCityObj;
        const secondaryDest = viableCities[1] || primaryDest;
        const tertiaryDest = viableCities[2] || secondaryDest;

        if (totalDays <= 2) {
            circuitCities = [primaryDest, secondaryDest];
        } else if (totalDays <= 4) {
            circuitCities = [primaryDest, secondaryDest];
        } else {
            circuitCities = [primaryDest, secondaryDest, tertiaryDest];
        }
    }

    const uniqueCircuit = Array.from(new Set(circuitCities.map(c => c.id)))
        .map(id => ranked.find(c => c.id === id) || { id, name: DESTINATION_MASTER[id]?.name || id });

    const topCity = uniqueCircuit[0] || startCityObj;
    const routeCircuitNames = isPickupGatewayOnly 
        ? [DESTINATION_MASTER[startCityId]?.name.split(' ')[0], ...uniqueCircuit.map(c => c.name.split(' ')[0])]
        : uniqueCircuit.map(c => c.name.split(' ')[0]);
    const routeCircuitString = routeCircuitNames.join(' → ');

    // 3. Helper for Transport Transit Times & Distance
    const getTransitDetails = (fromCityId, toCityId) => {
        if (!toCityId || fromCityId === toCityId) {
            return {
                route: 'Local city transit & local sightseeing loop',
                distance: '15–25 km intra-city',
                distanceKm: 20,
                duration: transportType === 'cab' ? '20–30 mins' : transportType === 'train' ? '15 mins' : '45 mins',
                costPerPerson: transportType === 'cab' ? 250 : transportType === 'train' ? 80 : 50
            };
        }

        const intercityDistances = {
            'banaras_allahabad': { km: 125, cabHr: '2.2 hrs', trainHr: '1.5 hrs', busHr: '3 hrs', cabCost: 650, trainCost: 180, busCost: 140 },
            'allahabad_banaras': { km: 125, cabHr: '2.2 hrs', trainHr: '1.5 hrs', busHr: '3 hrs', cabCost: 650, trainCost: 180, busCost: 140 },
            'banaras_mirzapur': { km: 65, cabHr: '1.3 hrs', trainHr: '1 hr', busHr: '1.8 hrs', cabCost: 400, trainCost: 90, busCost: 80 },
            'mirzapur_banaras': { km: 65, cabHr: '1.3 hrs', trainHr: '1 hr', busHr: '1.8 hrs', cabCost: 400, trainCost: 90, busCost: 80 },
            'mirzapur_allahabad': { km: 90, cabHr: '1.8 hrs', trainHr: '1.2 hrs', busHr: '2.3 hrs', cabCost: 500, trainCost: 120, busCost: 100 },
            'allahabad_mirzapur': { km: 90, cabHr: '1.8 hrs', trainHr: '1.2 hrs', busHr: '2.3 hrs', cabCost: 500, trainCost: 120, busCost: 100 },
            'mirzapur_sonbhadra': { km: 75, cabHr: '1.8 hrs', trainHr: '2 hrs', busHr: '2.5 hrs', cabCost: 450, trainCost: 100, busCost: 90 },
            'sonbhadra_mirzapur': { km: 75, cabHr: '1.8 hrs', trainHr: '2 hrs', busHr: '2.5 hrs', cabCost: 450, trainCost: 100, busCost: 90 },
            'banaras_sonbhadra': { km: 110, cabHr: '2.5 hrs', trainHr: '2.5 hrs', busHr: '3.2 hrs', cabCost: 600, trainCost: 150, busCost: 120 },
            'sonbhadra_banaras': { km: 110, cabHr: '2.5 hrs', trainHr: '2.5 hrs', busHr: '3.2 hrs', cabCost: 600, trainCost: 150, busCost: 120 },
            'allahabad_sonbhadra': { km: 165, cabHr: '3.5 hrs', trainHr: '3.5 hrs', busHr: '4.5 hrs', cabCost: 850, trainCost: 220, busCost: 180 },
            'sonbhadra_allahabad': { km: 165, cabHr: '3.5 hrs', trainHr: '3.5 hrs', busHr: '4.5 hrs', cabCost: 850, trainCost: 220, busCost: 180 }
        };

        const key = `${fromCityId}_${toCityId}`;
        const match = intercityDistances[key] || { km: 80, cabHr: '1.8 hrs', trainHr: '1.5 hrs', busHr: '2.5 hrs', cabCost: 450, trainCost: 120, busCost: 100 };

        let timeStr = match.cabHr;
        let costVal = match.cabCost;
        let modeLabel = 'Private AC Cab / Self-Drive';

        if (transportType === 'train') {
            timeStr = match.trainHr;
            costVal = match.trainCost;
            modeLabel = 'Express Superfast Train';
        } else if (transportType === 'bus') {
            timeStr = match.busHr;
            costVal = match.busCost;
            modeLabel = 'Inter-City State/Private Bus';
        }

        return {
            route: `Transit: ${DESTINATION_MASTER[fromCityId]?.name.split(' ')[0]} → ${DESTINATION_MASTER[toCityId]?.name.split(' ')[0]} via ${modeLabel}`,
            distance: `${match.km} km highway transit`,
            distanceKm: match.km,
            duration: timeStr,
            costPerPerson: costVal
        };
    };

    // 4. Build Structured Day-by-Day Schedule with Global Deduplication
    const itineraryDays = [];
    let cumulativeCost = 0;

    // Global Trip Deduplication Trackers
    const visitedSightIds = new Set();
    const visitedPlaceNames = new Set();

    const isSightVisited = (sight) => {
        if (!sight) return true;
        const norm = (sight.place || '').toLowerCase().trim();
        return visitedSightIds.has(sight.id) || visitedPlaceNames.has(norm);
    };

    const markVisited = (sight) => {
        if (!sight) return;
        visitedSightIds.add(sight.id);
        const norm = (sight.place || '').toLowerCase().trim();
        visitedPlaceNames.add(norm);
    };

    // Distribute days across circuit
    for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
        // Determine which city is active on this day
        let cityIndex = 0;
        if (uniqueCircuit.length === 1) {
            cityIndex = 0;
        } else if (uniqueCircuit.length === 2) {
            cityIndex = dayNum <= Math.ceil(totalDays / 2) ? 0 : 1;
        } else if (uniqueCircuit.length === 3) {
            if (dayNum === 1) cityIndex = 0;
            else if (dayNum <= Math.ceil(totalDays * 0.6)) cityIndex = 1;
            else cityIndex = 2;
        } else {
            const fraction = (dayNum - 1) / totalDays;
            cityIndex = Math.min(uniqueCircuit.length - 1, Math.floor(fraction * uniqueCircuit.length));
        }

        const activeCityObj = uniqueCircuit[cityIndex] || uniqueCircuit[0];
        const activeCityId = activeCityObj.id;
        const cityData = DESTINATION_MASTER[activeCityId] || DESTINATION_MASTER.banaras;

        // Determine if this is an intercity transit day
        let prevCityId = activeCityId;
        let isTransitDay = false;

        if (dayNum === 1) {
            if (isPickupGatewayOnly && startCityId !== activeCityId) {
                isTransitDay = true;
                prevCityId = startCityId;
            } else {
                isTransitDay = false;
                prevCityId = activeCityId;
            }
        } else {
            prevCityId = itineraryDays[dayNum - 2]?.destinationId || activeCityId;
            isTransitDay = prevCityId !== activeCityId;
        }

        const transitInfo = getTransitDetails(prevCityId, activeCityId);
        const activityMultiplier = budgetTier === 'luxury' ? 1.6 : budgetTier === 'budget' ? 0.9 : 1.1;

        // Structured Activities Timeline - 100% Focused on Tourist Places
        const activities = [];

        if (isTransitDay) {
            const transitTitle = (dayNum === 1 && isPickupGatewayOnly)
                ? `Morning Arrival & Pickup at ${DESTINATION_MASTER[prevCityId]?.name.split(' ')[0]} → Scenic Drive to ${cityData.name.split(' ')[0]}`
                : transitInfo.route;

            const transitDesc = (dayNum === 1 && isPickupGatewayOnly)
                ? `Welcome to Eastern Uttar Pradesh! Morning pickup from ${DESTINATION_MASTER[prevCityId]?.name} (Airport / Railway Hub) followed by a scenic drive along the highway to ${cityData.name}. Enjoy rolling Vindhyan terrain, rural vistas, and river crossings as you head into the attraction valley.`
                : `Smooth scenic transit from ${DESTINATION_MASTER[prevCityId]?.name} to ${cityData.name}. Enjoy rolling Vindhyan terrain, rural vistas, and river crossings along Eastern UP highways.`;

            activities.push({
                id: `d${dayNum}_act_transit`,
                day: dayNum,
                destination: cityData.name,
                destinationId: activeCityId,
                place: `${DESTINATION_MASTER[prevCityId]?.name.split(' ')[0]} to ${cityData.name.split(' ')[0]} Scenic Highway`,
                category: 'transit',
                categoryLabel: 'Scenic Intercity Transit',
                icon: transportType === 'train' ? '🚆' : transportType === 'bus' ? '🚌' : '🚗',
                startTime: '08:30 AM',
                endTime: '10:30 AM',
                timeSlot: '08:30 AM – 10:30 AM',
                activity: transitTitle,
                description: transitDesc,
                estimatedDuration: transitInfo.duration,
                distance: transitInfo.distance,
                travelTime: transitInfo.duration,
                meal: null,
                stay: null,
                estimatedCost: Math.round(transitInfo.costPerPerson * people),
                image: cityData.image,
                images: cityData.images || [cityData.image],
                googleImagesUrl: getGoogleImagesUrl(`${cityData.name} Scenic Highway`, cityData.name),
                googleMapsUrl: getGoogleMapsPlaceUrl(cityData.name, 'Uttar Pradesh'),
                coordinates: cityData.coordinates,
                insiderTip: 'Keep your camera ready for scenic rocky escarpments and river viewpoints along the road.',
                tags: ['Scenic Transit', 'Intercity Drive', 'Eastern UP Route'],
                isUserPreferenceMatch: false,
                matchBadge: null
            });
        }

        // Gather unvisited candidate sights strictly from active city
        // 1. First priority: Unvisited sights matching user's selected category in active city
        let unvisitedCandidates = cityData.sights.filter(s => isInterestMatch(s.category) && !isSightVisited(s));

        // 2. Second priority: If active city ran out of matching sights, pick unvisited scenic/heritage sights from THIS SAME CITY
        if (unvisitedCandidates.length === 0) {
            unvisitedCandidates = cityData.sights.filter(s => !isSightVisited(s));
        }

        // 3. If user launched "Start My Trip" from a specific landmark card, prioritize that landmark first on Day 1
        if (dayNum === 1 && formData.selectedPlace && formData.selectedPlace.name) {
            const targetNorm = formData.selectedPlace.name.toLowerCase();
            const keywords = targetNorm.split(/[\s,&()]+/).filter(w => w.length > 3);
            const allUnvisitedInCity = cityData.sights.filter(s => !isSightVisited(s));
            const directMatch = allUnvisitedInCity.find(s => {
                const sn = s.place.toLowerCase();
                return sn.includes(targetNorm) || targetNorm.includes(sn) || keywords.some(k => sn.includes(k));
            });
            if (directMatch) {
                unvisitedCandidates = [directMatch, ...unvisitedCandidates.filter(s => s.id !== directMatch.id)];
            }
        }

        // Target number of sights for today:
        // Transit day: 2 high-quality unique attractions (plus morning highway transit)
        // Full day: 3 high-quality unique attractions (Morning, Afternoon, Evening)
        const targetSlotsCount = isTransitDay ? 2 : 3;
        const slotsTiming = isTransitDay ? [
            { start: '11:30 AM', end: '02:00 PM', label: 'Midday Scenic Excursion' },
            { start: '02:45 PM', end: '05:15 PM', label: 'Afternoon Nature / Heritage Wonder' }
        ] : [
            { start: '08:30 AM', end: '11:30 AM', label: 'Morning Exploration / Trek / Darshan' },
            { start: '12:30 PM', end: '03:30 PM', label: 'Midday Natural Wonder & Heritage Landmark' },
            { start: '04:30 PM', end: '07:00 PM', label: 'Evening Sunset Vista / Sacred Twilight Ritual' }
        ];

        for (let sIdx = 0; sIdx < targetSlotsCount; sIdx++) {
            if (unvisitedCandidates.length === 0) break; // Don't repeat if no unvisited sights remain!
            const s = unvisitedCandidates.shift();
            markVisited(s);

            const slot = slotsTiming[sIdx] || { start: '02:00 PM', end: '04:30 PM', label: 'Scenic Excursion' };
            const isMatch = isInterestMatch(s.category);

            activities.push({
                id: `d${dayNum}_act_${sIdx + 1}_${s.id}`,
                day: dayNum,
                destination: cityData.name,
                destinationId: activeCityId,
                place: s.place,
                category: s.category,
                categoryLabel: s.categoryLabel,
                icon: s.icon,
                startTime: slot.start,
                endTime: slot.end,
                timeSlot: `${slot.start} – ${slot.end}`,
                activity: s.activity,
                description: s.description,
                estimatedDuration: s.duration,
                distance: s.distFromBase,
                travelTime: transportType === 'cab' ? s.travelTimeCab : transportType === 'train' ? (s.travelTimeTrain !== '—' ? s.travelTimeTrain : s.travelTimeCab) : s.travelTimeBus,
                meal: null,
                stay: null,
                estimatedCost: Math.round(s.cost * activityMultiplier * people),
                image: s.image || cityData.image,
                images: s.images || (cityData.images || [cityData.image]),
                googleImagesUrl: s.googleImagesUrl || getGoogleImagesUrl(s.place, cityData.name),
                googleMapsUrl: getGoogleMapsPlaceUrl(s.place, cityData.name),
                coordinates: s.coordinates || cityData.coordinates,
                insiderTip: s.insiderTip,
                tags: s.tags,
                isUserPreferenceMatch: isMatch,
                matchBadge: isMatch ? `🌟 Priority: Matches your ${s.categoryLabel} preference` : null
            });
        }

        // Calculate Day Totals
        const dayEstimatedCost = activities.reduce((sum, act) => sum + (act.estimatedCost || 0), 0);
        cumulativeCost += dayEstimatedCost;

        const dayMainSight = activities.find(a => a.category !== 'transit') || activities[0];

        itineraryDays.push({
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            title: dayNum === 1 ? `Arrival & Immersion into ${cityData.name.split(' ')[0]}` : dayNum === totalDays ? `Grand Finale & Farewell from ${cityData.name.split(' ')[0]}` : `Deep Discovery of ${cityData.name.split(' ')[0]} Circuit`,
            theme: dayMainSight.categoryLabel,
            activities,
            schedule: activities,
            daySummary: {
                totalDistance: isTransitDay ? `${transitInfo.distanceKm + 20} km (including intercity transit)` : '20–30 km intra-city sightseeing loop',
                totalTravelTime: isTransitDay ? `${transitInfo.duration} transit + 1.5 hrs sightseeing` : '1.5–2 hrs sightseeing transit',
                estimatedDayCost: dayEstimatedCost,
                touristSpotsCovered: activities.filter(a => a.category !== 'transit').map(a => a.place)
            }
        });
    }

    // 5. Curated Food & Stay Catalog (Empty since focus is 100% on tourist attractions)
    const foodAndStay = {
        budgetTier,
        stays: [],
        foodSpots: []
    };

    // 6. Map & Route Data (Reusable by Map Module)
    const mapRoute = {
        startingLocation: pickupLoc,
        circuitSequence: routeCircuitNames,
        circuitWaypoints: uniqueCircuit.map((c, i) => {
            const data = DESTINATION_MASTER[c.id] || DESTINATION_MASTER.banaras;
            return {
                step: i + 1,
                city: data.name,
                cityId: c.id,
                coordinates: data.coordinates,
                image: data.image,
                tagline: data.tagline
            };
        }),
        totalCircuitDistanceKm: itineraryDays.reduce((acc, d) => acc + (d.daySummary.totalDistance.includes('km') ? parseInt(d.daySummary.totalDistance) || 30 : 30), 0)
    };

    // 7. AI Travel Guide Context (Reusable by AI Guide Module)
    const aiGuideContext = {
        systemContext: `Personalized ${totalDays}-Day UP Trip Plan for ${people} travelers (${formData.groupType || 'Travelers'}) traveling via ${transportType} on a ${budgetTier} budget. Circuit: ${routeCircuitString}. Interests: ${userInterests.join(', ')}.`,
        quickPrompts: [
            `What is the best time to attend the Ganga Aarti in Varanasi?`,
            `What are the must-eat breakfast dishes in ${topCity.name.split(' ')[0]}?`,
            `Are there any special clothing or photography guidelines for temples and waterfalls?`,
            `How should we plan our transit from ${routeCircuitNames[0] || 'Varanasi'} to ${routeCircuitNames[1] || 'Prayagraj'}?`
        ],
        culturalTips: [
            'Temple Etiquette: Remove footwear outside and dress in modest breathable cotton clothing.',
            'Waterfall Safety: Keep to designated viewing areas and wear rubber-soled footwear on rock trails.',
            'Bargaining: Friendly negotiation is common in silk bazaars and boat rentals; look for government GI tags.'
        ]
    };

    // 8. Overall Summary Metadata
    const groupLabels = {
        single: 'Solo Traveler',
        couple: 'Romantic Couple',
        friends: 'Friends Squad',
        family: 'Family Duo / Vacation'
    };

    const budgetLabels = {
        budget: 'Budget-Friendly (Pocket-Saver Sightseeing & Shared Transit)',
        moderate: 'Standard & Comfortable (Private AC Cab & Guided Tours)',
        luxury: 'Premium & Luxury (VIP Corridors, Luxury Boats & Concierge)'
    };

    const transportLabels = {
        cab: 'Private AC Cab / Self-Drive',
        train: 'Superfast Train / Rail Network',
        bus: 'Bus & Local Shared Autos'
    };

    const interestLabels = userInterests.map(id => {
        const found = INTEREST_OPTIONS.find(o => o.id === id);
        return found ? found.label : id;
    });

    const tripPlan = {
        id: 'tripplan_' + Date.now(),
        createdAt: new Date().toISOString(),
        summary: {
            travelers: people,
            travelersLabel: `${people} Traveler${people > 1 ? 's' : ''}`,
            groupType: formData.groupType || 'couple',
            groupTypeLabel: groupLabels[formData.groupType] || 'Travelers',
            duration: totalDays,
            durationDays: totalDays,
            durationLabel: `${totalDays} Day${totalDays > 1 ? 's' : ''} Circuit`,
            budget: budgetTier,
            budgetTier: budgetTier,
            budgetPerPerson: Math.round(cumulativeCost / people),
            budgetLabel: budgetLabels[budgetTier] || 'Comfortable',
            transport: transportType,
            transportLabel: transportLabels[transportType] || 'Private Cab',
            pickupLocation: pickupLoc,
            interests: userInterests,
            interestLabels,
            routeCircuit: routeCircuitNames,
            routeDisplay: routeCircuitString,
            recommendedDestinations: routeCircuitNames,
            routeCircuitString,
            estimatedTotalCost: {
                min: Math.round(cumulativeCost * 0.85),
                max: Math.round(cumulativeCost * 1.15),
                calculatedTotal: cumulativeCost,
                formatted: `₹${(Math.round(cumulativeCost * 0.85)).toLocaleString('en-IN')} – ₹${(Math.round(cumulativeCost * 1.15)).toLocaleString('en-IN')}`
            }
        },
        destinations: routeCircuitNames,
        rankedDestinations: ranked,
        itinerary: itineraryDays,
        foodAndStay: {
            ...foodAndStay,
            foods: foodAndStay.foodSpots
        },
        mapRoute: {
            ...mapRoute,
            stops: mapRoute.circuitWaypoints
        },
        aiGuideContext
    };

    // Save to localStorage safely
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('india_tourist_active_trip_plan', JSON.stringify(tripPlan));
        }
    } catch (e) {
        console.error('Error storing trip plan:', e);
    }

    return tripPlan;
};

export const getStoredTripPlan = () => {
    try {
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('india_tourist_active_trip_plan');
            if (item) return JSON.parse(item);
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};

/**
 * Enhanced buildAndSaveUserProfile: also triggers and attaches the central TripPlan
 */
export const buildAndSaveUserProfile = (formData) => {
    const tripPlan = generateTripPlan(formData);
    const rankedDestinations = evaluateUPDestinations(formData);
    const startCityId = tripPlan.itinerary[0]?.destinationId;
    const topDestination = rankedDestinations.find(c => c.id === startCityId) || rankedDestinations[0];

    const profile = {
        id: 'up_trip_' + Date.now(),
        createdAt: new Date().toISOString(),
        formData: { ...formData },
        topDestination,
        rankedDestinations,
        tripPlan,
        recommendationSummary: {
            primaryCity: topDestination.name,
            score: topDestination.scores.final,
            tagline: topDestination.tagline,
            highlights: topDestination.highlights,
            route: tripPlan.summary.routeCircuitString
        }
    };

    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('india_tourist_active_profile', JSON.stringify(profile));
            const history = getStoredProfileHistory();
            const updated = [profile, ...history.filter(p => p.id !== profile.id)].slice(0, 10);
            localStorage.setItem('india_tourist_profile_history', JSON.stringify(updated));
        }
    } catch (e) {
        console.error('Error saving profile:', e);
    }

    return profile;
};

export const getStoredUserProfile = () => {
    try {
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('india_tourist_active_profile');
            if (item) return JSON.parse(item);
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};

export const getStoredProfileHistory = () => {
    try {
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('india_tourist_profile_history');
            if (item) return JSON.parse(item);
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

/**
 * Backward-compatible helper for legacy callers
 */
export const generateComprehensiveItinerary = (primaryCity, allRanked, totalDays = 3, userInterests = []) => {
    const plan = generateTripPlan({
        days: totalDays,
        landscapes: userInterests,
        budget: 'moderate',
        transport: 'cab',
        people: 2
    });

    return plan.itinerary.map(d => {
        const morningAct = d.activities[0];
        const afternoonAct = d.activities[1] || d.activities[0];
        const eveningAct = d.activities[2] || d.activities[1] || d.activities[0];

        return {
            day: d.day,
            city: d.destination,
            cityId: d.destinationId,
            title: d.title,
            theme: d.theme,
            morning: {
                time: morningAct?.timeSlot || '08:30 AM – 11:30 AM',
                activity: morningAct?.activity || 'Morning Sightseeing Exploration',
                description: morningAct?.description || 'Explore scenic heritage and sacred landmarks.',
                sightHighlight: morningAct?.place || 'Historical Heritage Landmark'
            },
            afternoon: {
                time: afternoonAct?.timeSlot || '12:00 PM – 04:00 PM',
                activity: afternoonAct?.activity || 'Afternoon Attraction Visit',
                description: afternoonAct?.description || 'Visit iconic regional waterfalls, forts and temples.',
                sightHighlight: afternoonAct?.place || 'Natural Wonder & Scenic Vista'
            },
            evening: {
                time: eveningAct?.timeSlot || '05:00 PM – 07:30 PM',
                activity: eveningAct?.activity || 'Sunset & Cultural Experience',
                description: eveningAct?.description || 'Enjoy evening sunset viewpoints and spiritual river ceremonies.',
                sightHighlight: eveningAct?.place || 'Riverfront Sunset & Culture'
            },
            transit: {
                route: d.daySummary.totalDistance,
                distance: d.daySummary.totalTravelTime
            },
            circuitHighlight: `${d.destination.split(' ')[0]} Top Tourist Attractions`,
            packingTip: 'Slip-on footwear for temples & comfortable shoes for walking.'
        };
    });
};


