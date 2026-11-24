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
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1600100397608-f010f443a9f0?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
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
        image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80'
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
                image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
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
            '/sonebhadra/vijaygarh-fort/vijaygarh-fort-1.jpg',
            '/sonebhadra/mukkha-fall/mukkha-fall-1.jpg',
            '/sonebhadra/rihand-dam/rihand-dam-1.jpg',
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
 * Master Trip Plan Generator: Constructs the central "Trip Plan Object"
 * which serves as the single source of truth for:
 * 1. Itinerary
 * 2. Map & Route
 * 3. Food & Stay
 * 4. AI Travel Guide
 */
export const generateTripPlan = (formData, customRanked = null) => {
    const ranked = customRanked || evaluateUPDestinations(formData);
    const topCity = ranked[0];
    const totalDays = Math.max(1, Math.min(14, Number(formData.days) || 3));
    const people = Math.max(1, Number(formData.people) || 2);
    const budgetTier = formData.budget || 'moderate';
    const transportType = formData.transport || 'cab';
    const userInterests = formData.landscapes || ['spiritual'];
    const pickupLoc = formData.pickupLocation || 'Varanasi';

    // 1. Determine Circuit Route across top destinations based on totalDays
    let circuitCities = [];
    if (totalDays === 1) {
        circuitCities = [topCity];
    } else if (totalDays === 2) {
        circuitCities = [topCity, ranked[1] || topCity];
    } else if (totalDays <= 4) {
        circuitCities = [topCity, ranked[1] || topCity, ranked[2] || topCity];
    } else {
        circuitCities = [topCity, ranked[1], ranked[2], ranked[3] || ranked[0]].filter(Boolean);
    }

    // Deduplicate while preserving order, ensuring we have at least 1 city
    const uniqueCircuit = Array.from(new Set(circuitCities.map(c => c.id)))
        .map(id => ranked.find(c => c.id === id));

    const routeCircuitNames = uniqueCircuit.map(c => c.name.split(' ')[0]);
    const routeCircuitString = routeCircuitNames.join(' → ');

    // 2. City Details & Place Master Catalog
    const DESTINATION_MASTER = {
        banaras: {
            name: 'Banaras (Varanasi)',
            tagline: 'Eternal Ghats, Sacred Temples & Classical Heritage',
            image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
            images: [
                'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80'
            ],
            googleImagesUrl: getGoogleImagesUrl('Varanasi Ghats and Temples', 'Banaras'),
            coordinates: { lat: 25.3176, lng: 82.9739 },
            hotels: {
                budget: { name: 'Kashi Heritage Guesthouse (Assi Ghat)', type: 'Homestay / Guesthouse', pricePerNight: 1200, address: 'Assi Ghat Road, Shivala, Varanasi', rating: 4.4, amenities: ['Free Wi-Fi', 'Rooftop River View', 'Satvik Breakfast'], coordinates: { lat: 25.2890, lng: 83.0060 } },
                moderate: { name: 'Hotel Surya Kaiser Palace (Cantt)', type: '3-Star Heritage Hotel', pricePerNight: 3200, address: 'The Mall Road, Cantonment, Varanasi', rating: 4.6, amenities: ['Pool & Spa', 'AC Deluxe Rooms', 'Multi-Cuisine Dining'], coordinates: { lat: 25.3340, lng: 82.9860 } },
                luxury: { name: 'BrijRama Palace / Taj Nadesar Palace', type: '5-Star Luxury Heritage Palace', pricePerNight: 9500, address: 'Darbhanga Ghat / Nadesar, Varanasi', rating: 4.9, amenities: ['Private River Chauffeur', 'Royal Dining', 'VIP Corridor Access'], coordinates: { lat: 25.3045, lng: 83.0115 } }
            },
            culinarySpots: [
                { name: 'Ram Bhandar (Thatheri Gali)', specialty: 'Authentic Poori-Bhaji & Jalebi with Hing Aloo', mealType: 'Breakfast', avgCost: 120, coordinates: { lat: 25.3135, lng: 83.0075 } },
                { name: 'Keshari Restaurant (Godowlia)', specialty: 'Classic Banarasi Pure Ghee Satvik Thali & Malai Kofta', mealType: 'Lunch', avgCost: 280, coordinates: { lat: 25.3090, lng: 83.0065 } },
                { name: 'Blue Lassi Shop (Manikarnika)', specialty: '30+ Varieties of Thick Cream Lassi in Clay Kulhads', mealType: 'Snack/Dessert', avgCost: 90, coordinates: { lat: 25.3110, lng: 83.0130 } },
                { name: 'Pizzeria Vaatika Cafe (Assi Ghat)', specialty: 'Apple Pie & Woodfired Thin-Crust Pizza by the Ganges', mealType: 'Dinner', avgCost: 450, coordinates: { lat: 25.2885, lng: 83.0070 } },
                { name: 'Keshav Tambool Bhandar', specialty: 'Legendary Royal Banarasi Meetha Paan with Gulkand & Silver Vark', mealType: 'Digestif', avgCost: 50, coordinates: { lat: 25.3075, lng: 83.0040 } }
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
                    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1600100397608-f010f443a9f0?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Banarasi Silk Weaving Street Food Chowk', 'Varanasi'),
                    coordinates: { lat: 25.3120, lng: 83.0080 },
                    insiderTip: 'Buy directly from certified weaver cooperatives to ensure authentic pure silk zari work.',
                    tags: ['Silk Weaving', 'Handloom', 'Ancient Bazaars']
                }
            ]
        },
        allahabad: {
            name: 'Allahabad (Prayagraj)',
            tagline: 'Sacred Triveni Sangam, Grand Forts & Cultural Legacy',
            image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
            images: [
                'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80'
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
            image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
            images: [
                'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80'
            ],
            googleImagesUrl: getGoogleImagesUrl('Wyndham Falls Chunar Fort Vindhyachal', 'Mirzapur'),
            coordinates: { lat: 25.1337, lng: 82.5644 },
            hotels: {
                budget: { name: 'Vindhyachal Tourist Guesthouse', type: 'Budget Guesthouse', pricePerNight: 950, address: 'Temple Road, Vindhyachal, Mirzapur', rating: 4.2, amenities: ['Clean Rooms', 'Temple Proximity', 'Vegetarian Meals'], coordinates: { lat: 25.1630, lng: 82.5090 } },
                moderate: { name: 'The Galaxy Hotel / Vindhya Retreat', type: '3-Star Comfort Hotel', pricePerNight: 2400, address: 'Station Road / Vindhyachal Hills, Mirzapur', rating: 4.4, amenities: ['AC Deluxe Rooms', 'Nature Views', 'In-House Dining'], coordinates: { lat: 25.1470, lng: 82.5710 } },
                luxury: { name: 'Chunar Ganga Cliff Eco-Resort', type: 'Heritage Nature Resort', pricePerNight: 5200, address: 'Chunar Cliff View, Mirzapur', rating: 4.7, amenities: ['River Panorama', 'Private Waterfall Trek Guide', 'Organic Dining'], coordinates: { lat: 25.1240, lng: 82.8710 } }
            },
            culinarySpots: [
                { name: 'Vindhyachal Mandir Chowk', specialty: 'Fresh Desi Ghee Pedas, Poori-Sabzi & Kheer', mealType: 'Breakfast', avgCost: 110, coordinates: { lat: 25.1655, lng: 82.5150 } },
                { name: 'Chunar Fort Road Dhaba', specialty: 'Authentic UP Litti Chokha with Desi Ghee & Green Chutney', mealType: 'Lunch', avgCost: 140, coordinates: { lat: 25.1290, lng: 82.8730 } },
                { name: 'Mirzapur Clock Tower Food Lane', specialty: 'Crispy Samosas, Jalebis & Rabri in Clay Cups', mealType: 'Snack/Dessert', avgCost: 75, coordinates: { lat: 25.1510, lng: 82.5690 } },
                { name: 'Vindhya Greens Restaurant', specialty: 'Dal Tadka, Shahi Paneer, Garlic Naan & Gulab Jamun', mealType: 'Dinner', avgCost: 350, coordinates: { lat: 25.1420, lng: 82.5650 } }
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
                    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Wyndham Falls Mirzapur Waterfalls', 'Mirzapur'),
                    coordinates: { lat: 25.0744, lng: 82.5831 },
                    insiderTip: 'Wear sports shoes with firm rubber grip on wet rocks; carry drinking water.',
                    tags: ['Waterfall Trek', 'Natural Pools', 'Scenic Gorge']
                },
                {
                    id: 'm_sirsi',
                    place: 'Sirsi Dam & Reservoir Lake',
                    category: 'waterfalls',
                    categoryLabel: 'Waterfalls & Nature',
                    icon: '🌊',
                    activity: 'Sirsi Dam Reservoir Lake & Foaming Water Cascades',
                    description: 'Sprawling water reservoir nestled in rolling green hills where overflow waters create dramatic foaming rapids and quiet scenic viewpoints.',
                    duration: '2 hrs',
                    distFromBase: '38 km',
                    travelTimeCab: '50 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '1.2 hrs',
                    cost: 50,
                    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'
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
                    image: 'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1599831104325-5e7c3b259740?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Maa Vindhyavasini Temple Ashtabhuja', 'Vindhyachal Mirzapur'),
                    coordinates: { lat: 25.1667, lng: 82.5167 },
                    insiderTip: 'Use the newly built Vindhya Corridor for fast and smooth darshan without long queues.',
                    tags: ['Shaktipeeth', 'Ropeway', 'Hilltop Shrine']
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
                    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Chunar Fort Ganga View', 'Mirzapur'),
                    coordinates: { lat: 25.1278, lng: 82.8767 },
                    insiderTip: 'Sunset over the curving Ganga from the fort ramparts is a photographer’s dream.',
                    tags: ['Sher Shah Suri', 'Cliff Fort', 'Ganga Panorama']
                },
                {
                    id: 'm_tanda',
                    place: 'Tanda Falls & Forest Trail',
                    category: 'adventure',
                    categoryLabel: 'Adventure & Nature Treks',
                    icon: '🧗',
                    activity: 'Tanda Falls Stepping Terraces & Bird Watching Walk',
                    description: 'Tranquil natural stepped waterfall surrounded by scrub forests and migratory birds, perfect for a refreshing afternoon stroll.',
                    duration: '1.5 hrs',
                    distFromBase: '12 km',
                    travelTimeCab: '20 mins',
                    travelTimeTrain: '—',
                    travelTimeBus: '35 mins',
                    cost: 50,
                    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'
                    ],
                    googleImagesUrl: getGoogleImagesUrl('Tanda Falls Mirzapur', 'Mirzapur'),
                    coordinates: { lat: 25.0920, lng: 82.5980 },
                    insiderTip: 'Carry a light pair of binoculars to spot kingfishers and painted storks.',
                    tags: ['Forest Walk', 'Bird Watching', 'Stepped Waterfall']
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
                    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
                    images: [
                        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
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
                { name: 'Robertsganj Chowk Dhaba', specialty: 'Hot Poori-Sabzi, Fresh Curd & Jalebi', mealType: 'Breakfast', avgCost: 90, coordinates: { lat: 24.6880, lng: 83.0660 } },
                { name: 'Belan Valley Tribal Kitchen', specialty: 'Roasted Bhutta (Corn), Desi Aloo Chokha & Arhar Dal', mealType: 'Lunch', avgCost: 130, coordinates: { lat: 24.6150, lng: 83.0450 } },
                { name: 'Rihand Lakefront Eateries', specialty: 'Crispy Hot Samosas & Masala Chai at Sunset', mealType: 'Snack/Tea', avgCost: 60, coordinates: { lat: 24.2100, lng: 83.0290 } },
                { name: 'Son Valley Dining Hall', specialty: 'Local River Fish Curry or Paneer Butter Masala with Fresh Rotis', mealType: 'Dinner', avgCost: 320, coordinates: { lat: 24.6830, lng: 83.0620 } }
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
                }
            ]
        }
    };

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

    // 4. Build Structured Day-by-Day Schedule
    const itineraryDays = [];
    let cumulativeCost = 0;

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

        const prevCityId = dayNum > 1 ? (itineraryDays[dayNum - 2]?.destinationId || activeCityId) : activeCityId;
        const isTransitDay = prevCityId !== activeCityId;
        const transitInfo = getTransitDetails(prevCityId, activeCityId);

        // Pick Hotel & Meals according to Budget Tier
        const hotelInfo = cityData.hotels[budgetTier] || cityData.hotels.moderate;
        const breakfastSpot = cityData.culinarySpots.find(s => s.mealType.includes('Breakfast')) || cityData.culinarySpots[0];
        const lunchSpot = cityData.culinarySpots.find(s => s.mealType.includes('Lunch')) || cityData.culinarySpots[1];
        const dinnerSpot = cityData.culinarySpots.find(s => s.mealType.includes('Dinner')) || cityData.culinarySpots[3];
        const snackSpot = cityData.culinarySpots.find(s => s.mealType.includes('Snack') || s.mealType.includes('Dessert')) || cityData.culinarySpots[2];

        // Sights Prioritization based on User Interests
        const allSights = cityData.sights.map(s => {
            const isMatch = userInterests.includes(s.category);
            return {
                ...s,
                isUserPreferenceMatch: isMatch,
                matchBadge: isMatch ? `🌟 Priority: Matches your ${s.categoryLabel} preference` : null
            };
        }).sort((a, b) => (b.isUserPreferenceMatch ? 1 : 0) - (a.isUserPreferenceMatch ? 1 : 0));

        // Assign 2 to 3 main sights for the day
        const sightIndexOffset = ((dayNum - 1) * 2) % allSights.length;
        const morningSight = allSights[sightIndexOffset] || allSights[0];
        const afternoonSight = allSights[(sightIndexOffset + 1) % allSights.length] || allSights[1] || allSights[0];
        const eveningSight = allSights[(sightIndexOffset + 2) % allSights.length] || allSights[0];

        // Multipliers for budget tier on meals & activities
        const mealMultiplier = budgetTier === 'luxury' ? 2.2 : budgetTier === 'budget' ? 0.8 : 1.2;
        const activityMultiplier = budgetTier === 'luxury' ? 1.8 : budgetTier === 'budget' ? 0.9 : 1.1;

        // Structured Activities Timeline
        const activities = [];

        // 1. Morning Breakfast & Start
        activities.push({
            id: `d${dayNum}_act_1_breakfast`,
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            place: breakfastSpot.name,
            category: 'meal',
            categoryLabel: 'Culinary & Breakfast',
            icon: '☕',
            startTime: '08:00 AM',
            endTime: '09:00 AM',
            timeSlot: '08:00 AM – 09:00 AM',
            activity: `Morning Breakfast at ${breakfastSpot.name}`,
            description: `Start your day with ${breakfastSpot.specialty}. Freshly prepared local flavors to energize your morning excursion.`,
            estimatedDuration: '1 hr',
            distance: '1–2 km',
            travelTime: transportType === 'cab' ? '5 mins via Cab' : '10 mins walk/transit',
            meal: {
                type: 'Breakfast',
                place: breakfastSpot.name,
                recommendation: breakfastSpot.specialty,
                estimatedCostPerPerson: Math.round(breakfastSpot.avgCost * mealMultiplier)
            },
            stay: null,
            estimatedCost: Math.round(breakfastSpot.avgCost * mealMultiplier * people),
            image: cityData.image,
            images: cityData.images || [cityData.image],
            googleImagesUrl: getGoogleImagesUrl(breakfastSpot.name, cityData.name),
            googleMapsUrl: getGoogleMapsPlaceUrl(breakfastSpot.name, cityData.name),
            coordinates: breakfastSpot.coordinates || cityData.coordinates,
            insiderTip: 'Pair with piping hot masala chai served in an authentic earthen kulhad.',
            tags: ['Breakfast', 'Local Flavors', 'Morning Start'],
            isUserPreferenceMatch: userInterests.includes('culinary') || userInterests.includes('ghats_culture'),
            matchBadge: userInterests.includes('ghats_culture') ? '🌟 Authentic Food Trail' : null
        });

        // 2. If Transit Day: Intercity Transit Block
        if (isTransitDay) {
            activities.push({
                id: `d${dayNum}_act_transit`,
                day: dayNum,
                destination: cityData.name,
                destinationId: activeCityId,
                place: `${DESTINATION_MASTER[prevCityId]?.name.split(' ')[0]} to ${cityData.name.split(' ')[0]} Highway`,
                category: 'transit',
                categoryLabel: 'Scenic Transit & Check-In',
                icon: transportType === 'train' ? '🚆' : transportType === 'bus' ? '🚌' : '🚗',
                startTime: '09:15 AM',
                endTime: '11:00 AM',
                timeSlot: '09:15 AM – 11:00 AM',
                activity: transitInfo.route,
                description: `Smooth scenic connection from ${DESTINATION_MASTER[prevCityId]?.name} to ${cityData.name}. Relax as the landscape transitions along Eastern UP highways.`,
                estimatedDuration: transitInfo.duration,
                distance: transitInfo.distance,
                travelTime: transitInfo.duration,
                meal: null,
                stay: {
                    type: 'Hotel Check-in & Fresh up',
                    name: hotelInfo.name,
                    category: hotelInfo.type,
                    estimatedCost: hotelInfo.pricePerNight,
                    coordinates: hotelInfo.coordinates || cityData.coordinates
                },
                estimatedCost: Math.round(transitInfo.costPerPerson * people),
                image: cityData.image,
                images: cityData.images || [cityData.image],
                googleImagesUrl: getGoogleImagesUrl(`${cityData.name} Highway and Hotels`, cityData.name),
                googleMapsUrl: getGoogleMapsPlaceUrl(hotelInfo.name, cityData.name),
                coordinates: hotelInfo.coordinates || cityData.coordinates,
                insiderTip: 'Keep ID cards ready for swift hotel check-in upon arrival.',
                tags: ['Transit', 'Scenic Drive', 'Intercity'],
                isUserPreferenceMatch: false,
                matchBadge: null
            });
        }

        // 3. Morning Highlight Attraction
        const morningStartTime = isTransitDay ? '11:15 AM' : '09:15 AM';
        const morningEndTime = isTransitDay ? '01:00 PM' : '12:30 PM';
        activities.push({
            id: `d${dayNum}_act_2_morning_sight`,
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            place: morningSight.place,
            category: morningSight.category,
            categoryLabel: morningSight.categoryLabel,
            icon: morningSight.icon,
            startTime: morningStartTime,
            endTime: morningEndTime,
            timeSlot: `${morningStartTime} – ${morningEndTime}`,
            activity: morningSight.activity,
            description: morningSight.description,
            estimatedDuration: morningSight.duration,
            distance: morningSight.distFromBase,
            travelTime: transportType === 'cab' ? morningSight.travelTimeCab : transportType === 'train' ? (morningSight.travelTimeTrain !== '—' ? morningSight.travelTimeTrain : morningSight.travelTimeCab) : morningSight.travelTimeBus,
            meal: null,
            stay: null,
            estimatedCost: Math.round(morningSight.cost * activityMultiplier * people),
            image: morningSight.image || cityData.image,
            images: morningSight.images || (cityData.images || [cityData.image]),
            googleImagesUrl: morningSight.googleImagesUrl || getGoogleImagesUrl(morningSight.place, cityData.name),
            googleMapsUrl: getGoogleMapsPlaceUrl(morningSight.place, cityData.name),
            coordinates: morningSight.coordinates || cityData.coordinates,
            insiderTip: morningSight.insiderTip,
            tags: morningSight.tags,
            isUserPreferenceMatch: morningSight.isUserPreferenceMatch,
            matchBadge: morningSight.matchBadge
        });

        // 4. Midday Authentic Lunch
        activities.push({
            id: `d${dayNum}_act_3_lunch`,
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            place: lunchSpot.name,
            category: 'meal',
            categoryLabel: 'Culinary & Lunch',
            icon: '🍲',
            startTime: '01:00 PM',
            endTime: '02:15 PM',
            timeSlot: '01:00 PM – 02:15 PM',
            activity: `Traditional Lunch at ${lunchSpot.name}`,
            description: `Savor authentic regional cuisine featuring ${lunchSpot.specialty}. Specially selected for clean, rich flavors suited to your ${budgetTier} travel style.`,
            estimatedDuration: '1.25 hrs',
            distance: '2–3 km',
            travelTime: '10 mins via local transit',
            meal: {
                type: 'Lunch',
                place: lunchSpot.name,
                recommendation: lunchSpot.specialty,
                estimatedCostPerPerson: Math.round(lunchSpot.avgCost * mealMultiplier),
                coordinates: lunchSpot.coordinates || cityData.coordinates
            },
            stay: null,
            estimatedCost: Math.round(lunchSpot.avgCost * mealMultiplier * people),
            image: cityData.image,
            images: cityData.images || [cityData.image],
            googleImagesUrl: getGoogleImagesUrl(lunchSpot.name, cityData.name),
            googleMapsUrl: getGoogleMapsPlaceUrl(lunchSpot.name, cityData.name),
            coordinates: lunchSpot.coordinates || cityData.coordinates,
            insiderTip: 'Try the house special Thali with seasonal curries and crisp hot breads.',
            tags: ['Lunch', 'Traditional Thali', 'Culinary Delight'],
            isUserPreferenceMatch: userInterests.includes('culinary'),
            matchBadge: null
        });

        // 5. Afternoon Highlight Attraction
        activities.push({
            id: `d${dayNum}_act_4_afternoon_sight`,
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            place: afternoonSight.place,
            category: afternoonSight.category,
            categoryLabel: afternoonSight.categoryLabel,
            icon: afternoonSight.icon,
            startTime: '02:30 PM',
            endTime: '05:00 PM',
            timeSlot: '02:30 PM – 05:00 PM',
            activity: afternoonSight.activity,
            description: afternoonSight.description,
            estimatedDuration: afternoonSight.duration,
            distance: afternoonSight.distFromBase,
            travelTime: transportType === 'cab' ? afternoonSight.travelTimeCab : transportType === 'train' ? (afternoonSight.travelTimeTrain !== '—' ? afternoonSight.travelTimeTrain : afternoonSight.travelTimeCab) : afternoonSight.travelTimeBus,
            meal: null,
            stay: null,
            estimatedCost: Math.round(afternoonSight.cost * activityMultiplier * people),
            image: afternoonSight.image || cityData.image,
            images: afternoonSight.images || (cityData.images || [cityData.image]),
            googleImagesUrl: afternoonSight.googleImagesUrl || getGoogleImagesUrl(afternoonSight.place, cityData.name),
            googleMapsUrl: getGoogleMapsPlaceUrl(afternoonSight.place, cityData.name),
            coordinates: afternoonSight.coordinates || cityData.coordinates,
            insiderTip: afternoonSight.insiderTip,
            tags: afternoonSight.tags,
            isUserPreferenceMatch: afternoonSight.isUserPreferenceMatch,
            matchBadge: afternoonSight.matchBadge
        });

        // 6. Evening Spectacle / Aarti / Sunset / Culture
        activities.push({
            id: `d${dayNum}_act_5_evening_sight`,
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            place: eveningSight.place,
            category: eveningSight.category,
            categoryLabel: eveningSight.categoryLabel,
            icon: eveningSight.icon,
            startTime: '05:30 PM',
            endTime: '07:30 PM',
            timeSlot: '05:30 PM – 07:30 PM',
            activity: eveningSight.activity,
            description: eveningSight.description,
            estimatedDuration: eveningSight.duration,
            distance: eveningSight.distFromBase,
            travelTime: '15 mins via local transit',
            meal: {
                type: 'Evening Snack',
                place: snackSpot.name,
                recommendation: snackSpot.specialty,
                estimatedCostPerPerson: Math.round(snackSpot.avgCost * mealMultiplier),
                coordinates: snackSpot.coordinates || cityData.coordinates
            },
            stay: null,
            estimatedCost: Math.round(eveningSight.cost * activityMultiplier * people) + Math.round(snackSpot.avgCost * mealMultiplier * people),
            image: eveningSight.image || cityData.image,
            images: eveningSight.images || (cityData.images || [cityData.image]),
            googleImagesUrl: eveningSight.googleImagesUrl || getGoogleImagesUrl(eveningSight.place, cityData.name),
            googleMapsUrl: getGoogleMapsPlaceUrl(eveningSight.place, cityData.name),
            coordinates: eveningSight.coordinates || cityData.coordinates,
            insiderTip: eveningSight.insiderTip,
            tags: eveningSight.tags,
            isUserPreferenceMatch: eveningSight.isUserPreferenceMatch,
            matchBadge: eveningSight.matchBadge
        });

        // 7. Dinner & Hotel Overnight Stay
        activities.push({
            id: `d${dayNum}_act_6_dinner_hotel`,
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            place: dinnerSpot.name,
            category: 'stay',
            categoryLabel: 'Dinner & Overnight Stay',
            icon: '🏨',
            startTime: '08:00 PM',
            endTime: '10:00 PM',
            timeSlot: '08:00 PM – 10:00 PM',
            activity: `Dinner at ${dinnerSpot.name} & Rest at ${hotelInfo.name}`,
            description: `Conclude Day ${dayNum} with a relaxing dinner tasting ${dinnerSpot.specialty}, followed by restful stay at ${hotelInfo.name} (${hotelInfo.type}).`,
            estimatedDuration: '2 hrs',
            distance: '2–4 km',
            travelTime: '10 mins',
            meal: {
                type: 'Dinner',
                place: dinnerSpot.name,
                recommendation: dinnerSpot.specialty,
                estimatedCostPerPerson: Math.round(dinnerSpot.avgCost * mealMultiplier),
                coordinates: dinnerSpot.coordinates || cityData.coordinates
            },
            stay: {
                type: 'Overnight Stay',
                name: hotelInfo.name,
                category: hotelInfo.type,
                address: hotelInfo.address,
                rating: hotelInfo.rating,
                amenities: hotelInfo.amenities,
                estimatedCost: hotelInfo.pricePerNight,
                coordinates: hotelInfo.coordinates || cityData.coordinates
            },
            estimatedCost: Math.round(dinnerSpot.avgCost * mealMultiplier * people) + hotelInfo.pricePerNight,
            image: cityData.image,
            images: cityData.images || [cityData.image],
            googleImagesUrl: getGoogleImagesUrl(hotelInfo.name, cityData.name),
            googleMapsUrl: getGoogleMapsPlaceUrl(hotelInfo.name, cityData.name),
            coordinates: hotelInfo.coordinates || cityData.coordinates,
            insiderTip: 'Inquire with hotel reception for next morning’s recommended departure slot.',
            tags: ['Dinner', 'Overnight Stay', 'Rest'],
            isUserPreferenceMatch: false,
            matchBadge: null
        });

        // Calculate Day Totals
        const dayEstimatedCost = activities.reduce((sum, act) => sum + (act.estimatedCost || 0), 0);
        cumulativeCost += dayEstimatedCost;

        itineraryDays.push({
            day: dayNum,
            destination: cityData.name,
            destinationId: activeCityId,
            title: dayNum === 1 ? `Arrival & Immersion into ${cityData.name.split(' ')[0]}` : dayNum === totalDays ? `Grand Finale & Farewell from ${cityData.name.split(' ')[0]}` : `Deep Discovery of ${cityData.name.split(' ')[0]} Circuit`,
            theme: morningSight.categoryLabel,
            hotel: hotelInfo,
            activities,
            schedule: activities,
            daySummary: {
                totalDistance: isTransitDay ? `${transitInfo.distanceKm + 25} km (including intercity)` : '28–35 km intra-city',
                totalTravelTime: isTransitDay ? `${transitInfo.duration} transit + 1 hr local` : '1.5 hrs local transit',
                estimatedDayCost: dayEstimatedCost,
                mealsIncluded: ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner'],
                primaryStay: hotelInfo.name
            }
        });
    }

    // 5. Curated Food & Stay Catalog (Reusable by Food & Stay Module)
    const foodAndStay = {
        budgetTier,
        stays: uniqueCircuit.map(c => {
            const data = DESTINATION_MASTER[c.id] || DESTINATION_MASTER.banaras;
            return {
                city: data.name,
                cityId: c.id,
                recommendedHotel: data.hotels[budgetTier] || data.hotels.moderate,
                allOptions: data.hotels
            };
        }),
        foodSpots: uniqueCircuit.flatMap(c => {
            const data = DESTINATION_MASTER[c.id] || DESTINATION_MASTER.banaras;
            return data.culinarySpots.map(spot => ({
                ...spot,
                city: data.name,
                cityId: c.id
            }));
        })
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
        budget: 'Budget-Friendly (Homestays & Street Flavors)',
        moderate: 'Standard & Comfortable (3-Star & Guided Tours)',
        luxury: 'Premium & Luxury (Heritage Haveli & Chauffeur)'
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
    const rankedDestinations = evaluateUPDestinations(formData);
    const topDestination = rankedDestinations[0];
    const tripPlan = generateTripPlan(formData);

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

    return plan.itinerary.map(d => ({
        day: d.day,
        city: d.destination,
        cityId: d.destinationId,
        title: d.title,
        theme: d.theme,
        morning: {
            time: d.activities[0]?.timeSlot || '08:00 AM – 12:00 PM',
            activity: d.activities[1]?.activity || d.activities[0]?.activity,
            description: d.activities[1]?.description || d.activities[0]?.description,
            foodTip: d.activities[0]?.meal?.recommendation || 'Local specialty'
        },
        afternoon: {
            time: d.activities[3]?.timeSlot || '01:00 PM – 05:00 PM',
            activity: d.activities[3]?.activity || d.activities[2]?.activity,
            description: d.activities[3]?.description || d.activities[2]?.description,
            foodTip: d.activities[2]?.meal?.recommendation || 'Lunch'
        },
        evening: {
            time: d.activities[4]?.timeSlot || '05:30 PM – 08:30 PM',
            activity: d.activities[4]?.activity || d.activities[3]?.activity,
            description: d.activities[4]?.description || d.activities[3]?.description,
            foodTip: d.activities[5]?.meal?.recommendation || 'Dinner'
        },
        stay: {
            type: d.hotel.type,
            recommendation: `${d.hotel.name} (${d.hotel.type})`
        },
        transit: {
            route: d.daySummary.totalDistance,
            distance: d.daySummary.totalTravelTime
        },
        packingTip: 'Slip-on footwear for temples & comfortable shoes for walking.'
    }));
};


