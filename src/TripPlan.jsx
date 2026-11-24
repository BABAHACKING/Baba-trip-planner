import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaCalendarAlt,
    FaMapMarkedAlt,
    FaUtensils,
    FaRobot,
    FaHotel,
    FaCar,
    FaClock,
    FaMapPin,
    FaWallet,
    FaUsers,
    FaStar,
    FaLightbulb,
    FaRedo,
    FaChevronDown,
    FaChevronUp,
    FaRoute,
    FaCompressAlt,
    FaExpandAlt,
    FaCompass,
    FaGoogle,
    FaDirections
} from 'react-icons/fa';
import {
    getStoredTripPlan,
    getStoredUserProfile,
    generateTripPlan
} from './services/scoringService';
import TripMap from './TripMap';
import './TripPlan.css';

const TripPlan = ({ tripPlanData = null }) => {
    const navigate = useNavigate();
    const [tripPlan, setTripPlan] = useState(tripPlanData);
    const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'map' | 'food_stay' | 'ai_guide'
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [showAllDays, setShowAllDays] = useState(false);
    const [expandedActivities, setExpandedActivities] = useState({});
    const [focusedPlaceOnMap, setFocusedPlaceOnMap] = useState(null);
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponses, setAiResponses] = useState([
        {
            role: 'assistant',
            text: 'Namaste! 🙏 I am your AI Travel Guide for your Eastern Uttar Pradesh journey. Ask me anything about timings, temple guidelines, food recommendations, or local secrets!'
        }
    ]);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [isLoadingPlan, setIsLoadingPlan] = useState(true);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState({});
    const [lightboxData, setLightboxData] = useState(null);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxData || !lightboxData.isOpen) return;
            if (e.key === 'Escape') {
                setLightboxData(null);
            } else if (e.key === 'ArrowLeft') {
                setLightboxData(prev => ({
                    ...prev,
                    activeIndex: (prev.activeIndex - 1 + prev.images.length) % prev.images.length
                }));
            } else if (e.key === 'ArrowRight') {
                setLightboxData(prev => ({
                    ...prev,
                    activeIndex: (prev.activeIndex + 1) % prev.images.length
                }));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxData]);

    useEffect(() => {
        if (!tripPlan) {
            const storedPlan = getStoredTripPlan();
            if (storedPlan) {
                setTripPlan(storedPlan);
            } else {
                const storedProfile = getStoredUserProfile();
                if (storedProfile && storedProfile.formData) {
                    const generated = generateTripPlan(storedProfile.formData);
                    setTripPlan(generated);
                }
            }
        }
        setIsLoadingPlan(false);
    }, [tripPlan]);

    // Expand all activities by default on day switch
    useEffect(() => {
        if (tripPlan && tripPlan.itinerary) {
            const initialExpanded = {};
            tripPlan.itinerary.forEach((d) => {
                d.activities.forEach((act) => {
                    initialExpanded[act.id] = true;
                });
            });
            setExpandedActivities(initialExpanded);
        }
    }, [tripPlan]);

    const toggleActivityExpand = (actId) => {
        setExpandedActivities((prev) => ({
            ...prev,
            [actId]: !prev[actId]
        }));
    };

    const toggleExpandAllInDay = (dayObj) => {
        const allExpanded = dayObj.activities.every((act) => expandedActivities[act.id]);
        const next = { ...expandedActivities };
        dayObj.activities.forEach((act) => {
            next[act.id] = !allExpanded;
        });
        setExpandedActivities(next);
    };

    const handleViewOnMap = (placeName = null, dayNumber = 1) => {
        setActiveTab('map');
        if (dayNumber && dayNumber >= 1) {
            setActiveDayIndex(dayNumber - 1);
        }
        setFocusedPlaceOnMap(placeName);
        setTimeout(() => {
            const mapElem = document.getElementById('trip-map-section');
            if (mapElem) {
                mapElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 380, behavior: 'smooth' });
            }
        }, 80);
    };

    const handleAskAiGuide = (placeName) => {
        const prompt = `What are the best insider tips and optimal times to visit ${placeName}?`;
        setActiveTab('ai_guide');
        handleSendAiQuery(prompt);
    };

    const handleSendAiQuery = (customPrompt = null) => {
        const queryText = customPrompt || aiQuery;
        if (!queryText.trim()) return;

        const newChat = [...aiResponses, { role: 'user', text: queryText }];
        setAiResponses(newChat);
        if (!customPrompt) setAiQuery('');
        setIsAiLoading(true);

        setTimeout(() => {
            let reply = `Here are personalized recommendations for your trip to ${tripPlan?.summary?.routeCircuitString || 'Eastern UP'}:\n\n`;
            const lower = queryText.toLowerCase();

            if (lower.includes('aarti') || lower.includes('dashashwamedh')) {
                reply += `✨ **Dashashwamedh Ganga Aarti Tips**:\n- Arrive at Dashashwamedh Ghat by 5:30 PM (or book a wooden rowboat in advance by 5:15 PM).\n- Best viewpoint: From the river facing the 7 brass podiums.\n- Winter timing: 6:00 PM – 7:15 PM; Summer timing: 6:45 PM – 8:00 PM.`;
            } else if (lower.includes('breakfast') || lower.includes('food') || lower.includes('eat')) {
                reply += `🍲 **Must-Try Culinary Picks**:\n- **Varanasi**: Ram Bhandar (Poori-Bhaji & Jalebi), Blue Lassi, Keshari Satvik Thali.\n- **Prayagraj**: Netram Pure Ghee Kachori, Hari Ram Samosas, Dehati Rasgulle.\n- **Mirzapur**: Chunar Litti Chokha, Vindhyachal Pure Ghee Pedas.`;
            } else if (lower.includes('temple') || lower.includes('dress') || lower.includes('guidelines') || lower.includes('clothes')) {
                reply += `🙏 **Temple & Cultural Guidelines**:\n- Modest dress is recommended (shoulders and knees covered).\n- Slip-on footwear is best since shoes are removed outside temple gates.\n- Electronics/leather belts are prohibited inside the inner sanctum of Kashi Vishwanath; lockers are available at the corridor gates.`;
            } else if (lower.includes('waterfall') || lower.includes('wyndham') || lower.includes('sirsi')) {
                reply += `🌊 **Waterfalls & Hiking Tips**:\n- Best season: Post-monsoon through spring (August to March).\n- Wear shoes with firm rubber grip as the sandstone rocks can be slippery.\n- Carry drinking water and snacks. Avoid swimming in deep reservoir zones.`;
            } else {
                reply += `🧭 Based on your ${tripPlan?.summary?.durationDays || 3}-day ${tripPlan?.summary?.budget || 'budget'} itinerary across ${tripPlan?.summary?.routeCircuitString}:\n- All activities are planned geographically to minimize travel time.\n- Private cabs offer door-to-door convenience for hills and waterfalls, while battery e-rickshaws are ideal in Varanasi and Prayagraj streets.`;
            }

            setAiResponses([...newChat, { role: 'assistant', text: reply }]);
            setIsAiLoading(false);
        }, 600);
    };

    if (!tripPlan) {
        if (isLoadingPlan) {
            return (
                <div className="trip-plan-loading">
                    <div className="trip-plan-spinner">🌿</div>
                    <h2>Loading Your Personalized Trip Plan...</h2>
                    <p>Curating your day-by-day itinerary, stay, meals & transit route ✨</p>
                </div>
            );
        }

        return (
            <div className="trip-plan-loading">
                <div className="trip-plan-spinner">🧭</div>
                <h2>No active trip plan found.</h2>
                <p>Answer a few quick travel preferences to generate your personalized itinerary.</p>
                <button onClick={() => navigate('/wizard')} className="trip-plan-btn primary" style={{ marginTop: '16px' }}>
                    <FaCompass /> Plan a New Trip
                </button>
            </div>
        );
    }

    const { summary, itinerary, foodAndStay, mapRoute, aiGuideContext } = tripPlan;
    const currentDay = itinerary[activeDayIndex] || itinerary[0];

    return (
        <div className="trip-plan-wrapper">
            {/* Top Header Navbar */}
            <header className="trip-plan-header-nav">
                <div className="nav-brand">
                    <Link to="/home.html" className="brand-link">
                        🌿 <span>India Tourist</span> • UP Circuit
                    </Link>
                </div>
                <div className="nav-actions">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="trip-plan-nav-btn secondary"
                        title="Return 1 step back"
                        style={{ cursor: 'pointer', border: 'none' }}
                    >
                        ← Return 1 Step
                    </button>
                    <Link to="/wizard" className="trip-plan-nav-btn secondary">
                        <FaRedo /> Edit Questionnaire
                    </Link>
                    <Link to="/profile" className="trip-plan-nav-btn outline">
                        <FaUsers /> Profile
                    </Link>
                </div>
            </header>

            <main className="trip-plan-container">
                {/* 1. Trip Plan Hero & Summary Badges */}
                <motion.section
                    className="trip-plan-hero-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    <div className="hero-badge-strip">
                        <span className="hero-main-badge">✨ Your Personalized Trip Plan</span>
                        <span className="hero-id-badge">ID: {tripPlan.id.replace('tripplan_', '#UP-')}</span>
                    </div>

                    <h1 className="hero-title">
                        {summary.durationDays}-Day Curated Journey through Eastern Uttar Pradesh
                    </h1>

                    {/* Summary Parameters Strip */}
                    <div className="summary-chips-grid">
                        <div className="summary-chip">
                            <span className="chip-icon"><FaUsers style={{ color: '#597E52' }} /></span>
                            <div className="chip-text">
                                <span className="chip-label">Travelers</span>
                                <span className="chip-val">{summary.travelersLabel} ({summary.groupTypeLabel})</span>
                            </div>
                        </div>

                        <div className="summary-chip">
                            <span className="chip-icon"><FaCalendarAlt style={{ color: '#0277BD' }} /></span>
                            <div className="chip-text">
                                <span className="chip-label">Duration</span>
                                <span className="chip-val">{summary.durationLabel}</span>
                            </div>
                        </div>

                        <div className="summary-chip">
                            <span className="chip-icon"><FaWallet style={{ color: '#F57C00' }} /></span>
                            <div className="chip-text">
                                <span className="chip-label">Trip Budget</span>
                                <span className="chip-val">{summary.budgetLabel.split(' (')[0]}</span>
                            </div>
                        </div>

                        <div className="summary-chip">
                            <span className="chip-icon"><FaCar style={{ color: '#6A1B9A' }} /></span>
                            <div className="chip-text">
                                <span className="chip-label">Transport</span>
                                <span className="chip-val">{summary.transportLabel}</span>
                            </div>
                        </div>
                    </div>

                    {/* Route & Interests Banner */}
                    <div className="route-interests-banner">
                        <div className="route-banner-item">
                            <span className="route-label"><FaRoute /> Recommended Route:</span>
                            <span className="route-circuit-val">{summary.routeCircuitString}</span>
                        </div>
                        <div className="interests-banner-item">
                            <span className="interests-label">Interests:</span>
                            <div className="interests-pills-list">
                                {summary.interestLabels.map((lbl, i) => (
                                    <span key={i} className="interest-pill-chip">✦ {lbl}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Estimated Total Cost Pill */}
                    <div className="hero-cost-footer">
                        <div className="cost-info-group">
                            <span className="cost-label">Est. Total Investment ({summary.travelers} Travelers):</span>
                            <span className="cost-amount">{summary.estimatedTotalCost.formatted}</span>
                        </div>
                        <span className="cost-breakdown-hint">
                            Includes Stay ({summary.budget}), Dining, Sightseeing, & Regional Transit
                        </span>
                    </div>
                </motion.section>

                {/* 2. Sub-module Navigation Tabs */}
                <nav className="trip-plan-subnav">
                    <button
                        type="button"
                        className={`subnav-tab ${activeTab === 'itinerary' ? 'active' : ''}`}
                        onClick={() => setActiveTab('itinerary')}
                    >
                        <FaCalendarAlt />
                        <span>Day-by-Day Itinerary</span>
                    </button>

                    <button
                        type="button"
                        className={`subnav-tab ${activeTab === 'map' ? 'active' : ''}`}
                        onClick={() => setActiveTab('map')}
                    >
                        <FaMapMarkedAlt />
                        <span>Map & Route</span>
                    </button>

                    <button
                        type="button"
                        className={`subnav-tab ${activeTab === 'food_stay' ? 'active' : ''}`}
                        onClick={() => setActiveTab('food_stay')}
                    >
                        <FaUtensils />
                        <span>Food & Stay</span>
                    </button>

                    <button
                        type="button"
                        className={`subnav-tab ${activeTab === 'ai_guide' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ai_guide')}
                    >
                        <FaRobot />
                        <span>AI Travel Guide</span>
                    </button>
                </nav>

                {/* ============================================================ */}
                {/* 3. TAB 1: DAY-BY-DAY ITINERARY */}
                {/* ============================================================ */}
                {activeTab === 'itinerary' && (
                    <motion.div
                        key="tab-itinerary"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="itinerary-tab-content"
                    >
                        {/* Day Selector Strip */}
                        <div className="itinerary-day-selector-bar">
                            <div className="day-pills-row">
                                {itinerary.map((d, idx) => (
                                    <button
                                        key={d.day}
                                        type="button"
                                        className={`itinerary-day-pill ${idx === activeDayIndex && !showAllDays ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveDayIndex(idx);
                                            setShowAllDays(false);
                                        }}
                                    >
                                        <span className="pill-day-number">Day {d.day}</span>
                                        <span className="pill-destination-name">{d.destination.split(' ')[0]}</span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="view-mode-toggle-btn"
                                onClick={() => setShowAllDays(!showAllDays)}
                            >
                                {showAllDays ? <FaCompressAlt /> : <FaExpandAlt />}
                                <span>{showAllDays ? 'Focus Single Day' : `View All ${itinerary.length} Days`}</span>
                            </button>
                        </div>

                        {/* List of Day Cards */}
                        <div className="itinerary-days-container">
                            {(showAllDays ? itinerary : [currentDay]).map((dayObj) => (
                                <article key={dayObj.day} className="day-itinerary-card">
                                    {/* Day Header */}
                                    <div className="day-card-header">
                                        <div className="day-header-left">
                                            <span className="day-counter-badge">
                                                DAY {dayObj.day} OF {itinerary.length} • {dayObj.destination}
                                            </span>
                                            <h2 className="day-main-title">{dayObj.title}</h2>
                                            <p className="day-theme-line">
                                                <strong>Primary Focus:</strong> {dayObj.theme}
                                            </p>
                                        </div>

                                        <div className="day-header-right">
                                            <button
                                                type="button"
                                                className="day-collapse-toggle-btn"
                                                onClick={() => toggleExpandAllInDay(dayObj)}
                                            >
                                                {dayObj.activities.every(act => expandedActivities[act.id]) ? 'Collapse Day' : 'Expand Day'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Day Logistics Summary Bar */}
                                    <div className="day-quick-stats-row">
                                        <div className="quick-stat-item">
                                            <FaHotel className="stat-icon-hotel" />
                                            <div>
                                                <span className="stat-label">Stay</span>
                                                <span className="stat-val">{dayObj.hotel.name}</span>
                                            </div>
                                        </div>
                                        <div className="quick-stat-item">
                                            <FaCar className="stat-icon-transit" />
                                            <div>
                                                <span className="stat-label">Daily Transit</span>
                                                <span className="stat-val">{dayObj.daySummary.totalDistance} ({dayObj.daySummary.totalTravelTime})</span>
                                            </div>
                                        </div>
                                        <div className="quick-stat-item">
                                            <FaWallet className="stat-icon-cost" />
                                            <div>
                                                <span className="stat-label">Est. Day Cost</span>
                                                <span className="stat-val">₹{dayObj.daySummary.estimatedDayCost.toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Structured Activity Timeline */}
                                    <div className="activity-timeline">
                                        {dayObj.activities.map((act, actIdx) => {
                                            const isExpanded = expandedActivities[act.id] !== false;
                                            return (
                                                <div key={act.id} className={`activity-timeline-item ${act.category}`}>
                                                    {/* Timeline Node */}
                                                    <div className="timeline-node">
                                                        <span className="node-icon">{act.icon}</span>
                                                        {actIdx < dayObj.activities.length - 1 && <span className="node-line" />}
                                                    </div>

                                                    {/* Activity Card Body */}
                                                    <div className="activity-content-box">
                                                        {/* Activity Header Row */}
                                                        <div className="activity-card-header" onClick={() => toggleActivityExpand(act.id)}>
                                                            <div className="act-header-left">
                                                                <div className="act-time-slot">
                                                                    <FaClock /> {act.timeSlot}
                                                                </div>
                                                                <h3 className="act-title">{act.activity}</h3>
                                                                <div className="act-location-line">
                                                                    <span className="act-loc-text">
                                                                        <FaMapPin /> {act.place} • {act.destination.split(' ')[0]}
                                                                    </span>
                                                                    <a
                                                                        href={act.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(act.place + ' ' + act.destination + ' Uttar Pradesh')}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="act-google-img-link"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        title={`View real live Google Images of ${act.place}`}
                                                                    >
                                                                        <FaGoogle /> Real Google Images ↗
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="act-header-right">
                                                                <span className={`act-category-pill ${act.category}`}>
                                                                    {act.categoryLabel}
                                                                </span>
                                                                <button type="button" className="act-accordion-btn">
                                                                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Collapsible Details */}
                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                    className="activity-details-collapsible"
                                                                >
                                                                    {act.isUserPreferenceMatch && (
                                                                        <div className="act-preference-match-banner">
                                                                            <FaStar /> {act.matchBadge || 'Matched to your selected interest'}
                                                                        </div>
                                                                    )}

                                                                    <p className="act-description">{act.description}</p>

                                                                    {/* Multi-Photo Real Gallery & Meta Grid */}
                                                                    {(() => {
                                                                        const actImages = (act.images && act.images.length > 0)
                                                                            ? act.images
                                                                            : (act.image ? [act.image] : []);
                                                                        const activePhotoIdx = selectedPhotoIndex[act.id] || 0;
                                                                        const currentPhoto = actImages[activePhotoIdx] || act.image || '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';

                                                                        return (
                                                                            <div className="act-visual-meta-grid">
                                                                                {actImages.length > 0 && (
                                                                                    <div className="place-photo-gallery-card">
                                                                                        <div
                                                                                            className="gallery-main-preview"
                                                                                            onClick={() => setLightboxData({
                                                                                                isOpen: true,
                                                                                                images: actImages,
                                                                                                activeIndex: activePhotoIdx,
                                                                                                placeName: act.place,
                                                                                                destination: act.destination,
                                                                                                googleImagesUrl: act.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(act.place + ' ' + act.destination + ' Uttar Pradesh')}`
                                                                                            })}
                                                                                            title="Click to open Fullscreen High-Res Photo Gallery"
                                                                                        >
                                                                                            <img
                                                                                                src={currentPhoto}
                                                                                                alt={`${act.place} - Real Photo ${activePhotoIdx + 1}`}
                                                                                                onError={(e) => {
                                                                                                    e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';
                                                                                                }}
                                                                                            />
                                                                                            <div className="gallery-badge-overlay">
                                                                                                <span className="gallery-count-badge">📸 {actImages.length} Real Photos</span>
                                                                                                <span className="gallery-expand-hint">Click to enlarge ⛶</span>
                                                                                            </div>
                                                                                            <span className="act-image-caption">
                                                                                                {act.place} • Photo {activePhotoIdx + 1} of {actImages.length}
                                                                                            </span>
                                                                                        </div>

                                                                                        {actImages.length > 1 && (
                                                                                            <div className="place-gallery-thumbs">
                                                                                                {actImages.map((imgSrc, imgIdx) => (
                                                                                                    <button
                                                                                                        key={imgIdx}
                                                                                                        type="button"
                                                                                                        className={`place-thumb-btn ${activePhotoIdx === imgIdx ? 'active' : ''}`}
                                                                                                        onClick={(e) => {
                                                                                                            e.stopPropagation();
                                                                                                            setSelectedPhotoIndex(prev => ({
                                                                                                                ...prev,
                                                                                                                [act.id]: imgIdx
                                                                                                            }));
                                                                                                        }}
                                                                                                        title={`Switch to photo ${imgIdx + 1} of ${act.place}`}
                                                                                                    >
                                                                                                        <img
                                                                                                            src={imgSrc}
                                                                                                            alt={`${act.place} thumbnail ${imgIdx + 1}`}
                                                                                                            onError={(e) => {
                                                                                                                e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';
                                                                                                            }}
                                                                                                        />
                                                                                                    </button>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                )}

                                                                                <div className="act-meta-details-col">
                                                                                    <div className="meta-pill-item">
                                                                                        <span className="meta-label">⏱️ Duration:</span>
                                                                                        <span className="meta-val">{act.estimatedDuration}</span>
                                                                                    </div>
                                                                                    <div className="meta-pill-item">
                                                                                        <span className="meta-label">📍 Distance:</span>
                                                                                        <span className="meta-val">{act.distance}</span>
                                                                                    </div>
                                                                                    <div className="meta-pill-item">
                                                                                        <span className="meta-label">🚗 Transit Time:</span>
                                                                                        <span className="meta-val">{act.travelTime}</span>
                                                                                    </div>
                                                                                    <div className="meta-pill-item">
                                                                                        <span className="meta-label">🪙 Est. Cost:</span>
                                                                                        <span className="meta-val">₹{act.estimatedCost.toLocaleString('en-IN')} (for {summary.travelers})</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })()}

                                                                    {/* Meal Indicator Box */}
                                                                    {act.meal && (
                                                                        <div className="indicator-box meal-box">
                                                                            <div className="indicator-header">
                                                                                <FaUtensils />
                                                                                <span><strong>{act.meal.type} Specialty:</strong> {act.meal.recommendation}</span>
                                                                            </div>
                                                                            <span className="indicator-sub">
                                                                                At {act.meal.place} (~₹{act.meal.estimatedCostPerPerson}/person)
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {/* Stay Indicator Box */}
                                                                    {act.stay && (
                                                                        <div className="indicator-box stay-box">
                                                                            <div className="indicator-header">
                                                                                <FaHotel />
                                                                                <span><strong>{act.stay.type}:</strong> {act.stay.name}</span>
                                                                            </div>
                                                                            <span className="indicator-sub">
                                                                                {act.stay.category} {act.stay.rating ? `• ⭐ ${act.stay.rating}` : ''} {act.stay.address ? `• ${act.stay.address}` : ''}
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {/* Insider Tip Box */}
                                                                    {act.insiderTip && (
                                                                        <div className="act-insider-tip">
                                                                            <FaLightbulb />
                                                                            <span><strong>Insider Tip:</strong> {act.insiderTip}</span>
                                                                        </div>
                                                                    )}

                                                                    {/* Interactive Action Buttons */}
                                                                    <div className="act-actions-row">
                                                                        <button
                                                                            type="button"
                                                                            className="act-btn map-btn"
                                                                            onClick={() => handleViewOnMap(act.place, dayObj.day)}
                                                                        >
                                                                            <FaMapMarkedAlt /> View on Map
                                                                        </button>
                                                                        <a
                                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.place + ', Uttar Pradesh')}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="act-btn gmaps-btn"
                                                                            title="Open location on Google Maps"
                                                                        >
                                                                            <FaGoogle /> Google Maps ↗
                                                                        </a>
                                                                        <button
                                                                            type="button"
                                                                            className="act-btn ai-btn"
                                                                            onClick={() => handleAskAiGuide(act.place)}
                                                                        >
                                                                            <FaRobot /> Ask AI Guide
                                                                        </button>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ============================================================ */}
                {/* 4. TAB 2: MAP & ROUTE */}
                {/* ============================================================ */}
                {activeTab === 'map' && (
                    <motion.div
                        key="tab-map"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="map-tab-content"
                    >
                        <TripMap
                            tripPlan={tripPlan}
                            initialDayIndex={activeDayIndex}
                            focusedPlace={focusedPlaceOnMap}
                            onResetFocus={() => setFocusedPlaceOnMap(null)}
                        />
                    </motion.div>
                )}

                {/* ============================================================ */}
                {/* 5. TAB 3: FOOD & STAY */}
                {/* ============================================================ */}
                {activeTab === 'food_stay' && (
                    <motion.div
                        key="tab-food-stay"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="food-stay-tab-content"
                    >
                        <div className="tab-header-box">
                            <h2><FaHotel /> Accommodations & <FaUtensils /> Culinary Specialties</h2>
                            <p>Handpicked for your <strong>{summary.budgetLabel}</strong> travel tier across your circuit</p>
                        </div>

                        {/* Stays Section */}
                        <section className="food-stay-section">
                            <h3 className="section-title"><FaHotel /> Recommended Stays by Destination</h3>
                            <div className="stays-grid">
                                {foodAndStay.stays.map((st) => (
                                    <div key={st.cityId} className="stay-recommendation-card">
                                        <div className="stay-card-top">
                                            <span className="stay-city-badge">{st.city}</span>
                                            <span className="stay-rating-badge">⭐ {st.recommendedHotel.rating}</span>
                                        </div>
                                        <h4 className="stay-hotel-name">{st.recommendedHotel.name}</h4>
                                        <p className="stay-type-line">{st.recommendedHotel.type}</p>
                                        <p className="stay-address-line"><FaMapPin /> {st.recommendedHotel.address}</p>

                                        <div className="stay-amenities-row">
                                            {st.recommendedHotel.amenities.map((am, i) => (
                                                <span key={i} className="amenity-pill">✓ {am}</span>
                                            ))}
                                        </div>

                                        <div className="stay-card-bottom">
                                            <span className="stay-price">₹{st.recommendedHotel.pricePerNight.toLocaleString('en-IN')} <small>/ night</small></span>
                                            <span className="stay-tier-pill">{foodAndStay.budgetTier} Pick</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Culinary Spots Section */}
                        <section className="food-stay-section">
                            <h3 className="section-title"><FaUtensils /> Iconic Culinary Trails & Local Specialties</h3>
                            <div className="culinary-grid">
                                {foodAndStay.foodSpots.map((spot, idx) => (
                                    <div key={idx} className="culinary-card">
                                        <div className="culinary-card-top">
                                            <span className="culinary-city-pill">{spot.city.split(' ')[0]}</span>
                                            <span className="culinary-meal-type">{spot.mealType}</span>
                                        </div>
                                        <h4 className="culinary-spot-name">{spot.name}</h4>
                                        <p className="culinary-specialty"><strong>Must Try:</strong> {spot.specialty}</p>
                                        <div className="culinary-cost-line">
                                            <span>Est. ~₹{spot.avgCost} per person</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}

                {/* ============================================================ */}
                {/* 6. TAB 4: AI TRAVEL GUIDE */}
                {/* ============================================================ */}
                {activeTab === 'ai_guide' && (
                    <motion.div
                        key="tab-ai-guide"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ai-guide-tab-content"
                    >
                        <div className="tab-header-box">
                            <h2><FaRobot /> AI Travel Guide Assistant</h2>
                            <p>Instant answers on ghat timings, dress codes, seasonal tips, and hidden gems for {summary.routeCircuitString}</p>
                        </div>

                        {/* Quick Prompts Strip */}
                        <div className="ai-prompts-strip">
                            <span className="prompts-heading">💡 Quick Inquiries:</span>
                            <div className="prompts-list">
                                {aiGuideContext.quickPrompts.map((p, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="quick-prompt-btn"
                                        onClick={() => handleSendAiQuery(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chat Messages Window */}
                        <div className="ai-chat-window">
                            {aiResponses.map((msg, idx) => (
                                <div key={idx} className={`chat-message-bubble ${msg.role}`}>
                                    <div className="bubble-avatar">
                                        {msg.role === 'assistant' ? '🤖' : '👤'}
                                    </div>
                                    <div className="bubble-content">
                                        <div className="bubble-sender">{msg.role === 'assistant' ? 'AI Guide' : 'You'}</div>
                                        <p className="bubble-text">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isAiLoading && (
                                <div className="chat-message-bubble assistant">
                                    <div className="bubble-avatar">🤖</div>
                                    <div className="bubble-content">
                                        <p className="bubble-text">Consulting travel guide... 🌿</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Box */}
                        <form
                            className="ai-chat-input-bar"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendAiQuery();
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Ask about temple guidelines, best photo spots, local sweets..."
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                className="ai-text-input"
                            />
                            <button type="submit" className="ai-send-btn">
                                Ask Guide
                            </button>
                        </form>
                    </motion.div>
                )}
            </main>

            {/* ============================================================ */}
            {/* FULLSCREEN REAL PHOTO LIGHTBOX MODAL */}
            {/* ============================================================ */}
            {lightboxData && lightboxData.isOpen && (
                <div className="trip-lightbox-overlay" onClick={() => setLightboxData(null)}>
                    <div className="trip-lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <div className="lightbox-header">
                            <div className="lightbox-title-group">
                                <span className="lightbox-count-badge">
                                    📸 Photo {lightboxData.activeIndex + 1} of {lightboxData.images.length}
                                </span>
                                <h3>{lightboxData.placeName}</h3>
                                <span className="lightbox-dest-name">{lightboxData.destination}</span>
                            </div>
                            <div className="lightbox-header-actions">
                                {lightboxData.googleImagesUrl && (
                                    <a
                                        href={lightboxData.googleImagesUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lightbox-google-btn"
                                        title={`Search live Google Images for ${lightboxData.placeName}`}
                                    >
                                        <FaGoogle /> Real Google Images ↗
                                    </a>
                                )}
                                <button
                                    type="button"
                                    className="lightbox-close-btn"
                                    onClick={() => setLightboxData(null)}
                                    aria-label="Close Lightbox"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="lightbox-main-stage">
                            <button
                                type="button"
                                className="lightbox-nav-arrow prev"
                                onClick={() => setLightboxData(prev => ({
                                    ...prev,
                                    activeIndex: (prev.activeIndex - 1 + prev.images.length) % prev.images.length
                                }))}
                                aria-label="Previous photo"
                            >
                                ‹
                            </button>

                            <div className="lightbox-image-wrapper">
                                <img
                                    src={lightboxData.images[lightboxData.activeIndex]}
                                    alt={`${lightboxData.placeName} photo ${lightboxData.activeIndex + 1}`}
                                    onError={(e) => {
                                        e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';
                                    }}
                                />
                            </div>

                            <button
                                type="button"
                                className="lightbox-nav-arrow next"
                                onClick={() => setLightboxData(prev => ({
                                    ...prev,
                                    activeIndex: (prev.activeIndex + 1) % prev.images.length
                                }))}
                                aria-label="Next photo"
                            >
                                ›
                            </button>
                        </div>

                        <div className="lightbox-thumbs-strip">
                            {lightboxData.images.map((thumbUrl, tIdx) => (
                                <button
                                    key={tIdx}
                                    type="button"
                                    className={`lightbox-thumb-item ${lightboxData.activeIndex === tIdx ? 'active' : ''}`}
                                    onClick={() => setLightboxData(prev => ({ ...prev, activeIndex: tIdx }))}
                                    title={`View photo ${tIdx + 1}`}
                                >
                                    <img
                                        src={thumbUrl}
                                        alt={`Thumbnail ${tIdx + 1}`}
                                        onError={(e) => {
                                            e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripPlan;
