import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('sonebhadra_manifest.json', 'utf8'));

const placesData = [
    {
        slug: 'fossils-park',
        title: 'Sonbhadra Fossils Park (Salkhan)',
        location: 'Salkhan, Sonbhadra, Uttar Pradesh',
        badge: 'badge-nature',
        badgeText: 'Fossils & Geological Heritage',
        desc: 'Internationally acclaimed geological site featuring 1.4-billion-year-old petrified stromatolite tree colonies from the Precambrian era, older than Yellowstone and the Grand Canyon.'
    },
    {
        slug: 'vijaygarh-fort',
        title: 'Vijaygarh Fort',
        location: 'Robertsganj, Sonbhadra, Uttar Pradesh',
        badge: 'badge-historical',
        badgeText: 'Historical Mountain Fort',
        desc: 'Majestic 5th-century mountain citadel perched 400 feet atop a steep rocky hill, famous for perennial hilltop water tanks (Ram Sagar & Meera Sagar), cave inscriptions, and Chandrakanta legends.'
    },
    {
        slug: 'mukkha-fall',
        title: 'Mukkha Fall (Mukha Falls)',
        location: 'Belan Valley, Ghorawal, Sonbhadra',
        badge: 'badge-nature',
        badgeText: 'Scenic Waterfall Canyon',
        desc: 'Spectacular natural waterfall where the Belan River plunges over 100 feet of rocky red sandstone escarpments into a secluded jungle canyon and emerald natural pools.'
    },
    {
        slug: 'rihand-dam',
        title: 'Rihand Dam & Govind Ballabh Pant Sagar',
        location: 'Pipari, Sonbhadra, Uttar Pradesh',
        badge: 'badge-adventure',
        badgeText: 'Mega Dam & Inland Sea',
        desc: 'One of Asia\'s largest concrete gravity dams across the Rihand River, creating India\'s largest artificial lake (Govind Ballabh Pant Sagar) and generating vital hydroelectric power.'
    },
    {
        slug: 'agori-fort',
        title: 'Agori Fort',
        location: 'Chopan, Sonbhadra, Uttar Pradesh',
        badge: 'badge-historical',
        badgeText: 'Ancient River Citadel',
        desc: 'Mysterious ancient fort bordered on three sides by the Bijul, Rihand, and Son rivers, featuring ancient stone ramparts, royal gateways, and legendary secret passages.'
    },
    {
        slug: 'dhandharoul-dam',
        title: 'Dhandharoul Dam',
        location: 'Ghaghar River, Robertsganj, Sonbhadra',
        badge: 'badge-scenic',
        badgeText: 'Scenic Reservoir Lake',
        desc: 'Historic British-era masonry reservoir dam built in 1917 across the Ghaghar River, known for expansive waters, surrounding green forest hills, and tranquil picnic vistas.'
    },
    {
        slug: 'sun-eco-point',
        title: 'Sun Eco Point',
        location: 'Robertsganj Valley, Sonbhadra, Uttar Pradesh',
        badge: 'badge-scenic',
        badgeText: 'Panoramic Hilltop View',
        desc: 'Breathtaking high-altitude viewpoint offering panoramic vistas of winding hills, sunset over deep forested valleys, and the lush undulating Son river ridge.'
    },
    {
        slug: 'vaishnodevi-dala',
        title: 'Vaishnodevi Mandir Dala',
        location: 'Dala, Sonbhadra, Uttar Pradesh',
        badge: 'badge-religious',
        badgeText: 'Hillside Cave Shrine',
        desc: 'Famous hillside pilgrimage shrine modeled after Jammu\'s holy Mata Vaishno Devi temple, featuring an authentic cave tunnel (Gufa darshan) and peaceful mountain panoramas.'
    },
    {
        slug: 'renukeshwar-mahadev',
        title: 'Shri Renukeshwar Mahadev Mandir',
        location: 'Renukoot, Sonbhadra, Uttar Pradesh',
        badge: 'badge-religious',
        badgeText: 'Birla Shiva Temple',
        desc: 'Grand Birla temple in Renukoot dedicated to Lord Shiva, acclaimed for exquisite white marble carvings, serene landscaped courtyards, and spiritual evening aartis.'
    },
    {
        slug: 'jwalamukhi-temple',
        title: 'Jwalamukhi Temple',
        location: 'Shaktinagar, Sonbhadra, Uttar Pradesh',
        badge: 'badge-religious',
        badgeText: 'Sacred Shakti Shrine',
        desc: 'Revered Shakti shrine celebrating the eternal divine flame of Goddess Jwalamukhi, attracting pilgrims across Uttar Pradesh, Bihar, and Madhya Pradesh.'
    },
    {
        slug: 'mangleshwar-mahadev',
        title: 'Mangleshwar Mahadev Temple',
        location: 'Sonbhadra, Uttar Pradesh',
        badge: 'badge-religious',
        badgeText: 'Ancient Shiva Sanctuary',
        desc: 'Ancient holy Shiva temple with a natural stone lingam set under leafy tree canopies, drawing devout congregations during Mahashivratri and the holy month of Shravan.'
    },
    {
        slug: 'dongia-picnic-spot',
        title: 'Dongia Picnic Spot',
        location: 'Sonbhadra, Uttar Pradesh',
        badge: 'badge-scenic',
        badgeText: 'Riverside Nature Retreat',
        desc: 'Secluded river retreat featuring crystal-clear natural streams, smooth granite boulders, and shady woods ideal for family picnics and tranquil nature photography.'
    },
    {
        slug: 'khanta-picnic-spot',
        title: 'Khanta Picnic Spot',
        location: 'Sonbhadra, Uttar Pradesh',
        badge: 'badge-scenic',
        badgeText: 'Quiet Forest & Waters',
        desc: 'Charming nature haven bordered by rolling rocky crags and woodland paths, providing refreshing freshwater views and quiet solitude away from city crowds.'
    },
    {
        slug: 'lakhaniya-dari-waterfall',
        title: 'Lakhaniya Dari Waterfall',
        location: 'Sonbhadra / Mirzapur Ridge, Uttar Pradesh',
        badge: 'badge-nature',
        badgeText: 'Jungle Gorge Cascade',
        desc: 'Secluded rocky canyon cascade where clear mountain streams drop across rocky boulder terraces into natural swimming pools, surrounded by dense jungle flora.'
    },
    {
        slug: 'obra-dam',
        title: 'Obra Dam',
        location: 'Obra, Sonbhadra, Uttar Pradesh',
        badge: 'badge-adventure',
        badgeText: 'Hydro Dam & Bird Sanctuary',
        desc: 'Impressive dam on the Rihand River supplying vital power infrastructure while creating a tranquil reservoir lake frequented by exotic migratory birds in winter.'
    }
];

// Build cards HTML
let cardsHtml = '';
placesData.forEach((p, idx) => {
    const m = manifest.find(item => item.slug === p.slug);
    const images = m ? m.images : [`/sonebhadra/${p.slug}/${p.slug}-1.jpg`];
    const cardId = `card-${p.slug}`;
    const mainImgId = `${cardId}-main-img`;
    const photoCount = images.length;

    let thumbsHtml = '';
    images.forEach((img, i) => {
        const activeClass = i === 0 ? 'place-thumb active' : 'place-thumb';
        thumbsHtml += `                    <img src="${img}" alt="${p.title} ${i + 1}" class="${activeClass}" onclick="switchCardImage('${cardId}', this.src, this)">\n`;
    });

    cardsHtml += `
            <!-- Card ${idx + 1}: ${p.title} -->
            <div class="place-card" id="${cardId}">
                <div class="place-card-image">
                    <img id="${mainImgId}" src="${images[0]}" alt="${p.title}" loading="lazy">
                    <div class="place-card-overlay">
                        <div class="place-card-title">
                            ${p.title}
                            <span class="photo-count-pill">📷 ${photoCount} Photos</span>
                        </div>
                        <div class="place-card-location">${p.location}</div>
                        <div>
                            <span class="place-card-badge ${p.badge}">${p.badgeText}</span>
                        </div>
                        <p class="place-card-desc">
                            ${p.desc}
                        </p>
                    </div>
                </div>
                <div class="place-thumbnails">
${thumbsHtml}                </div>
            </div>
`;
});

const fullHtml = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explore Sonebhadra - 1.4 Billion-Year-Old Fossils, Waterfalls, Forts & Mighty Dams | India Tourist</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/footer.css">
    <style>
        /* ========== Sonebhadra District Dark-Theme Cards (Mirzapur Style) ========== */
        .sonebhadra-page {
            background-color: #1A1C1A;
            color: #E0E7DF;
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
        }

        .sonebhadra-page header {
            background-color: #1A1C1A;
            box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .sonebhadra-page .nav-links a {
            color: #E0E7DF;
        }

        .sonebhadra-page .nav-links a:hover {
            color: #E89A5D;
        }

        /* Back Button Container */
        .back-nav-container {
            max-width: 1200px;
            margin: 15px auto 5px auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
        }

        .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #2C352D;
            color: #E89A5D;
            border: 1px solid rgba(232, 154, 93, 0.35);
            padding: 9px 18px;
            border-radius: 8px;
            font-size: 0.92rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.25s ease;
            font-family: 'Poppins', sans-serif;
        }

        .back-btn:hover {
            background: #E89A5D;
            color: #1A1C1A;
            border-color: #E89A5D;
            transform: translateX(-3px);
            box-shadow: 0 4px 15px rgba(232, 154, 93, 0.3);
        }

        .floating-back-btn {
            position: fixed;
            bottom: 28px;
            left: 28px;
            z-index: 999;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #2C352D;
            color: #E0E7DF;
            border: 1.5px solid #597E52;
            padding: 12px 22px;
            border-radius: 50px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
            transition: all 0.25s ease;
            font-family: 'Poppins', sans-serif;
        }

        .floating-back-btn:hover {
            background: #597E52;
            color: #FFFFFF;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(89, 126, 82, 0.6);
        }

        /* Hero Banner */
        .sonebhadra-hero {
            position: relative;
            width: 100%;
            height: 460px;
            overflow: hidden;
        }

        .sonebhadra-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.55);
        }

        .sonebhadra-hero-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 50px 40px;
            background: linear-gradient(to top, rgba(26, 28, 26, 0.95), transparent);
            text-align: center;
        }

        .sonebhadra-hero-overlay .hero-tag {
            color: #E89A5D;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        .sonebhadra-hero-overlay h1 {
            font-size: 3.5rem;
            font-weight: 700;
            color: #FDFCF8;
            margin-bottom: 8px;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .sonebhadra-hero-overlay p {
            font-size: 1.2rem;
            color: #A0AFA5;
        }

        /* About Box */
        .sonebhadra-about {
            max-width: 1100px;
            margin: 40px auto;
            padding: 30px 35px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 16px;
            border-left: 4px solid #E89A5D;
        }

        .sonebhadra-about h2 {
            font-size: 1.8rem;
            color: #FDFCF8;
            margin-bottom: 15px;
        }

        .sonebhadra-about p {
            color: #A0AFA5;
            line-height: 1.8;
            font-size: 1.05rem;
            margin-bottom: 12px;
        }

        /* Quick Facts Strip */
        .quick-facts {
            max-width: 1100px;
            margin: 0 auto 40px auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            padding: 0 20px;
        }

        .fact-card {
            background: #2C352D;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: transform 0.25s ease;
        }

        .fact-card:hover {
            transform: translateY(-3px);
            border-color: rgba(232, 154, 93, 0.3);
        }

        .fact-icon {
            font-size: 2rem;
            margin-bottom: 8px;
        }

        .fact-label {
            font-size: 0.8rem;
            color: #A0AFA5;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }

        .fact-value {
            font-size: 1.05rem;
            font-weight: 600;
            color: #FDFCF8;
        }

        /* Section Header */
        .places-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px 60px 20px;
        }

        .places-section-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .places-section-header h2 {
            font-size: 2.2rem;
            color: #FDFCF8;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .places-section-header p {
            color: #A0AFA5;
            font-size: 1.05rem;
        }

        /* Place Cards Grid */
        .place-cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 22px;
        }

        @media (max-width: 768px) {
            .place-cards-grid {
                grid-template-columns: 1fr;
            }
        }

        .place-card {
            background: #2C352D;
            border-radius: 16px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            position: relative;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            padding-bottom: 12px;
        }

        .place-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 14px 40px rgba(0, 0, 0, 0.5);
        }

        .place-card-image {
            position: relative;
            width: 100%;
            height: 330px;
            overflow: hidden;
            padding: 12px 12px 0 12px;
            border-radius: 16px 16px 0 0;
            box-sizing: border-box;
        }

        .place-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), filter 0.35s ease;
            display: block;
        }

        .place-card-image:hover img {
            transform: scale(1.05);
            filter: brightness(0.45);
        }

        /* Hover Text Overlay - Hidden by default, appears ONLY when mouse hovers on image */
        .place-card-overlay {
            position: absolute;
            top: 12px;
            left: 12px;
            right: 12px;
            bottom: 0;
            border-radius: 12px;
            padding: 22px 20px;
            background: linear-gradient(to top, rgba(14, 18, 14, 0.96) 0%, rgba(20, 26, 20, 0.82) 58%, rgba(0, 0, 0, 0.2) 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            opacity: 0;
            visibility: hidden;
            transform: translateY(18px);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.35s ease;
            backdrop-filter: blur(2px);
            pointer-events: none;
            z-index: 5;
            box-sizing: border-box;
        }

        /* Visible ONLY when mouse hovers over the image */
        .place-card-image:hover .place-card-overlay {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .place-card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #FDFCF8;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 6px;
        }

        .place-card-location {
            font-size: 0.86rem;
            color: #E89A5D;
            font-weight: 500;
            margin-bottom: 8px;
        }

        .place-card-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 5px;
            font-size: 0.78rem;
            font-weight: 600;
            margin-bottom: 10px;
            width: fit-content;
        }

        .badge-religious {
            background: rgba(232, 154, 93, 0.25);
            color: #E89A5D;
            border: 1px solid rgba(232, 154, 93, 0.4);
        }

        .badge-historical {
            background: rgba(198, 169, 105, 0.25);
            color: #E5C37A;
            border: 1px solid rgba(198, 169, 105, 0.4);
        }

        .badge-nature {
            background: rgba(89, 126, 82, 0.3);
            color: #8FD883;
            border: 1px solid rgba(89, 126, 82, 0.45);
        }

        .badge-adventure {
            background: rgba(78, 164, 212, 0.25);
            color: #72D2F5;
            border: 1px solid rgba(78, 164, 212, 0.4);
        }

        .badge-scenic {
            background: rgba(255, 183, 77, 0.25);
            color: #FFB74D;
            border: 1px solid rgba(255, 183, 77, 0.4);
        }

        .place-card-desc {
            font-size: 0.91rem;
            color: #E0E7DF;
            line-height: 1.5;
            margin: 0;
        }

        .photo-count-pill {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.75rem;
            color: #A0AFA5;
            background: rgba(255, 255, 255, 0.08);
            padding: 2px 8px;
            border-radius: 12px;
            margin-left: 8px;
            font-weight: 500;
        }

        /* Place Photo Thumbnails Gallery Strip */
        .place-thumbnails {
            display: flex;
            gap: 6px;
            padding: 10px 14px 0 14px;
            overflow-x: auto;
            scrollbar-width: thin;
        }

        .place-thumbnails::-webkit-scrollbar {
            height: 4px;
        }

        .place-thumbnails::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
        }

        .place-thumb {
            width: 48px;
            height: 48px;
            border-radius: 6px;
            object-fit: cover;
            cursor: pointer;
            border: 2px solid transparent;
            opacity: 0.65;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }

        .place-thumb:hover,
        .place-thumb.active {
            opacity: 1;
            border-color: #E89A5D;
            transform: scale(1.06);
        }

        /* Travel Info Grid */
        .travel-info-section {
            max-width: 1100px;
            margin: 30px auto 60px auto;
            padding: 0 20px;
        }

        .travel-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
        }

        .info-card {
            background: #2C352D;
            border-radius: 14px;
            padding: 28px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .info-card h3 {
            font-size: 1.3rem;
            color: #E89A5D;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .info-card p,
        .info-card li {
            color: #A0AFA5;
            line-height: 1.7;
            font-size: 0.95rem;
        }

        .info-card ul {
            padding-left: 20px;
        }

        .info-card li {
            margin-bottom: 8px;
        }
    </style>
</head>

<body class="sonebhadra-page">

    <header>
        <div class="logo">India Tourist</div>
        <nav>
            <ul class="nav-links">
                <li><a href="home.html">Home</a></li>
                <li><a href="/wizard">Plan Route</a></li>
                <li><a href="/profile">My Profile</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="packages.html">Packages</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    </header>

    <!-- Back Button to return 1 step -->
    <div class="back-nav-container">
        <button onclick="goBack()" class="back-btn" title="Return 1 step back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>← Return 1 Step Back</span>
        </button>
    </div>

    <!-- Floating Back Button for Quick Access -->
    <button onclick="goBack()" class="floating-back-btn" title="Return 1 step back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>← Back</span>
    </button>

    <!-- Hero Banner -->
    <section class="sonebhadra-hero">
        <img src="/sonebhadra/fossils-park/fossils-park-1.jpg" alt="Sonbhadra Fossils & Reservoirs">
        <div class="sonebhadra-hero-overlay">
            <div class="hero-tag">Uttar Pradesh • Energy Capital of India</div>
            <h1>Sonebhadra</h1>
            <p>1.4-Billion-Year-Old Fossils, Prehistoric Cave Art, Waterfalls & Mighty Dams</p>
        </div>
    </section>

    <!-- About Section -->
    <div class="sonebhadra-about">
        <h2>About Sonebhadra (Sonbhadra)</h2>
        <p>
            Sonebhadra is India's second-largest district in Uttar Pradesh and the only district in the nation that borders four states: Bihar, Jharkhand, Chhattisgarh, and Madhya Pradesh. Known as the <strong>"Energy Capital of India"</strong> for its colossal hydroelectric and thermal installations, it is equally a treasure trove of global prehistory, pristine tribal nature, and rich mythical folklore.
        </p>
        <p>
            Here lies the world-renowned <strong>Salkhan Fossil Park</strong>, preserving petrified algal stromatolites over 1.4 billion years old. Adventurers can explore the dramatic <strong>Vijaygarh Fort</strong> from Devaki Nandan Khatri's beloved novel <em>Chandrakanta</em>, stand beside the roaring <strong>Mukkha Falls</strong>, gaze over Asia's largest artificial reservoir at <strong>Rihand Dam</strong>, and witness sacred hillside shrines like <strong>Vaishnodevi Mandir Dala</strong> and the ancient <strong>Agori Fort</strong>.
        </p>
    </div>

    <!-- Quick Facts -->
    <div class="quick-facts">
        <div class="fact-card">
            <div class="fact-icon">📍</div>
            <div class="fact-label">Location</div>
            <div class="fact-value">Southernmost UP (4-State Border)</div>
        </div>
        <div class="fact-card">
            <div class="fact-icon">🪵</div>
            <div class="fact-label">Ancient Fossils</div>
            <div class="fact-value">1.4 Billion Yrs Old (Salkhan)</div>
        </div>
        <div class="fact-card">
            <div class="fact-icon">⚡</div>
            <div class="fact-label">Known As</div>
            <div class="fact-value">Energy Capital of India</div>
        </div>
        <div class="fact-card">
            <div class="fact-icon">🌡️</div>
            <div class="fact-label">Best Season</div>
            <div class="fact-value">October – March</div>
        </div>
    </div>

    <!-- Place Cards Section -->
    <section class="places-section">
        <div class="places-section-header">
            <h2>Top Places to Explore in Sonebhadra</h2>
            <p>Hover over any image to reveal rich details, history and photography</p>
        </div>

        <div class="place-cards-grid">
${cardsHtml}
        </div>
    </section>

    <!-- Travel Info Section -->
    <section class="travel-info-section">
        <div class="travel-info-grid">
            <div class="info-card">
                <h3>🚗 How to Reach Sonebhadra</h3>
                <p>
                    <strong>By Air:</strong> Nearest airport is Lal Bahadur Shastri International Airport in Varanasi (~110 km to Robertsganj).<br>
                    <strong>By Train:</strong> Major railway stations include <em>Robertsganj (Sonbhadra - SBDR)</em> and <em>Chopan (CPU)</em> with frequent train connectivity from Varanasi, Prayagraj, and Delhi.<br>
                    <strong>By Road:</strong> Excellent national highway connectivity via NH 39 (Varanasi – Robertsganj – Renukoot) with express state buses and private taxis available 24/7.
                </p>
            </div>
            <div class="info-card">
                <h3>🍲 Local Flavors & Specialties</h3>
                <p>
                    Indulge in authentic Eastern UP delicacies:
                </p>
                <ul>
                    <li><strong>Baati Chokha:</strong> Clay oven-baked wheat balls filled with spiced sattu served with fire-roasted brinjal and tomato chokha.</li>
                    <li><strong>Son Valley Mahua Delicacies:</strong> Seasonal traditional sweets prepared with pure desi ghee and wild forest honey.</li>
                    <li><strong>Robertsganj Peda:</strong> Famous slow-cooked milk khoya sweets renowned across the Vindhyan highway circuit.</li>
                </ul>
            </div>
            <div class="info-card">
                <h3>✨ Insider Travel Tips</h3>
                <ul>
                    <li><strong>Geology Enthusiasts:</strong> Visit Salkhan Fossil Park in morning daylight for clear photography of concentric stromatolite tree rings.</li>
                    <li><strong>Vijaygarh Trek:</strong> Wear comfortable trekking shoes; the stone stairs take about 45–60 minutes to reach the fortress ramparts.</li>
                    <li><strong>Rihand Sunset:</strong> Reach Govind Ballabh Pant Sagar reservoir by 5:00 PM for scenic sunset vistas across the vast inland sea.</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section company-info">
                    <h3 class="footer-logo">India Tourist</h3>
                    <p class="company-tagline">Making your journeys seamless, memorable, and safe.</p>
                </div>
                <div class="footer-section quick-links">
                    <h4 class="footer-title">Quick Links</h4>
                    <ul class="footer-menu">
                        <li><a href="home.html">Home</a></li>
                        <li><a href="/wizard">Plan Route</a></li>
                        <li><a href="mirzapur.html">Mirzapur Guide</a></li>
                        <li><a href="sonebhadra.html">Sonebhadra Guide</a></li>
                        <li><a href="varanasi.html">Varanasi</a></li>
                    </ul>
                </div>
                <div class="footer-section connect-section">
                    <h4 class="footer-title">Connect With Us</h4>
                    <div class="social-icons">
                        <a href="https://instagram.com" class="social-icon" target="_blank" title="Instagram"><span>📷</span></a>
                        <a href="https://youtube.com" class="social-icon" target="_blank" title="YouTube"><span>▶</span></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <div class="copyright">© 2026 India Tourist. All Rights Reserved.</div>
                </div>
            </div>
        </div>
    </footer>

    <script>
        function goBack() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "home.html";
            }
        }

        function switchCardImage(cardId, newSrc, thumbBtn) {
            const mainImg = document.getElementById(cardId + '-main-img');
            if (mainImg) {
                mainImg.style.opacity = '0.35';
                mainImg.style.transition = 'opacity 0.2s ease';
                setTimeout(() => {
                    mainImg.src = newSrc;
                    mainImg.style.opacity = '1';
                }, 150);
            }
            if (thumbBtn && thumbBtn.parentElement) {
                const thumbs = thumbBtn.parentElement.querySelectorAll('.place-thumb');
                thumbs.forEach(t => t.classList.remove('active'));
                thumbBtn.classList.add('active');
            }
        }
    </script>
</body>

</html>
`;

fs.writeFileSync('public/sonebhadra.html', fullHtml);
fs.writeFileSync('build/sonebhadra.html', fullHtml);

// Also create sonbhadra.html redirect/alias so both work
const aliasHtml = `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=sonebhadra.html" />
    <title>Redirecting to Sonebhadra Guide...</title>
</head>
<body>
    <script>window.location.href = "sonebhadra.html";</script>
</body>
</html>`;
fs.writeFileSync('public/sonbhadra.html', aliasHtml);
fs.writeFileSync('build/sonbhadra.html', aliasHtml);

console.log('Successfully generated public/sonebhadra.html and build/sonebhadra.html (and aliases)!');
