import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaUserFriends,
    FaUsers,
    FaHeart,
    FaCloudSun,
    FaCloud,
    FaCloudRain,
    FaSpinner,
    FaStar,
    FaMapMarkerAlt,
    FaCheck,
    FaRedo,
    FaCheckCircle,
    FaCompass,
    FaLightbulb,
    FaCalendarAlt,
    FaSun,
    FaMoon,
    FaUtensils,
    FaHotel,
    FaCarSide,
    FaSuitcaseRolling,
    FaClock
} from 'react-icons/fa';
import { generateGeminiItinerary } from './services/geminiService';
import {
    INTEREST_OPTIONS,
    buildAndSaveUserProfile,
    evaluateUPDestinations,
    generateComprehensiveItinerary,
    generateTripPlan
} from './services/scoringService';
import TripPlan from './TripPlan';
import './TravelWizard.css';

const TravelWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const [activeResultView, setActiveResultView] = useState('trip_plan'); // 'trip_plan' | 'rankings'
    const [currentDay, setCurrentDay] = useState(0);
    const [vehicleProgress, setVehicleProgress] = useState(0);
    const [weatherData, setWeatherData] = useState({});
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // City Switcher & Visited Tracking State
    const [selectedCityIndex, setSelectedCityIndex] = useState(0);
    const [visitedCityIds, setVisitedCityIds] = useState([]);

    // 7-Day Daily Guide State
    const [activeGuideDay, setActiveGuideDay] = useState(0);
    const [showAllDaysMode, setShowAllDaysMode] = useState(false);
    const [dailyGuide, setDailyGuide] = useState([]);

    const totalSteps = 7;

    const [formData, setFormData] = useState({
        people: 2,
        groupType: 'couple',
        landscapes: ['waterfalls', 'spiritual'],
        budget: 'budget',
        transport: 'cab',
        days: 7,
        pickupLocation: 'Varanasi'
    });

    const [itinerary, setItinerary] = useState([]);

    const quickPickupCities = [
        'Varanasi',
        'Prayagraj (Allahabad)',
        'Mirzapur',
        'Sonbhadra',
        'Lucknow',
        'Delhi'
    ];

    // ==================== SMART DYNAMIC OPTIONS ====================

    // 1. Smart Group Types based on people count
    const getAvailableGroupTypes = () => {
        if (formData.people === 1) {
            return [
                {
                    id: 'single',
                    label: 'Solo Traveler',
                    icon: <FaUser />,
                    hint: 'Introspective freedom & self-discovery'
                }
            ];
        } else if (formData.people === 2) {
            return [
                {
                    id: 'couple',
                    label: 'Romantic Couple',
                    icon: <FaHeart />,
                    hint: 'Cozy getaways & scenic dining'
                },
                {
                    id: 'friends',
                    label: 'Travel Buddies (2 Friends)',
                    icon: <FaUserFriends />,
                    hint: 'Adventure & shared sightseeing'
                },
                {
                    id: 'family',
                    label: 'Family Duo (Parent & Child)',
                    icon: <FaUsers />,
                    hint: 'Comfort-first & wholesome'
                }
            ];
        } else {
            return [
                {
                    id: 'family',
                    label: 'Family Vacation',
                    icon: <FaUsers />,
                    hint: `Safe, comfortable & relaxed for ${formData.people} family members`
                },
                {
                    id: 'friends',
                    label: 'Friends Squad',
                    icon: <FaUserFriends />,
                    hint: `High-energy exploration with ${formData.people} friends`
                }
            ];
        }
    };

    // 2. Smart Transport Options based on party size
    const getAvailableTransportOptions = () => {
        if (formData.people === 1) {
            return [
                {
                    id: 'cab',
                    label: 'Solo Cab / Self-Drive',
                    icon: '🚗',
                    desc: 'Private AC car or self-drive flexibility'
                },
                {
                    id: 'train',
                    label: 'Train / Rail Network',
                    icon: '🚆',
                    desc: 'Fast, comfortable & economical solo train travel'
                },
                {
                    id: 'bus',
                    label: 'Bus / Public Transit',
                    icon: '🚌',
                    desc: 'Backpacker friendly budget transit & shared autos'
                }
            ];
        } else if (formData.people >= 5) {
            return [
                {
                    id: 'cab',
                    label: 'Private SUV / Tempo Traveller',
                    icon: '🚐',
                    desc: `Spacious AC vehicle with luggage room for all ${formData.people} travelers`
                },
                {
                    id: 'train',
                    label: 'Train Network (Group Booking)',
                    icon: '🚆',
                    desc: 'Reserved train compartments between Varanasi & Prayagraj'
                },
                {
                    id: 'bus',
                    label: 'Chartered Tourist Bus',
                    icon: '🚌',
                    desc: 'Economical group charter for large parties'
                }
            ];
        } else {
            return [
                {
                    id: 'cab',
                    label: 'Private AC Cab / Self-Drive',
                    icon: '🚗',
                    desc: 'Dedicated chauffeur for all waterfalls & temples'
                },
                {
                    id: 'train',
                    label: 'Train / Rail Network',
                    icon: '🚆',
                    desc: 'Connecting Varanasi, Prayagraj & Mirzapur'
                },
                {
                    id: 'bus',
                    label: 'Bus & Local Shared Autos',
                    icon: '🚌',
                    desc: 'Budget-friendly local transit'
                }
            ];
        }
    };

    // 3. Smart Dynamic Budget Calculation
    const getDynamicBudgetOptions = () => {
        const p = formData.people;
        const d = formData.days;

        const budgetMin = p * d * 1000;
        const budgetMax = p * d * 2200;
        const modMin = p * d * 2500;
        const modMax = p * d * 4800;
        const luxMin = p * d * 5500;

        return [
            {
                id: 'budget',
                label: 'Budget-Friendly',
                subtitle: '₹1,000 – ₹2,200 / person / day',
                icon: '🪙',
                totalEstimate: `Est. Total: ~₹${budgetMin.toLocaleString('en-IN')} – ₹${budgetMax.toLocaleString('en-IN')} for ${p} traveler${p > 1 ? 's' : ''}`,
                desc: 'Cozy homestays, famous street food trails, shared transit & pocket-saver spots.'
            },
            {
                id: 'moderate',
                label: 'Standard & Comfortable',
                subtitle: '₹2,500 – ₹4,800 / person / day',
                icon: '🌟',
                totalEstimate: `Est. Total: ~₹${modMin.toLocaleString('en-IN')} – ₹${modMax.toLocaleString('en-IN')} for ${p} traveler${p > 1 ? 's' : ''}`,
                desc: '3-Star hotels, private AC cab with chauffeur, guided tours & fine dining.'
            },
            {
                id: 'luxury',
                label: 'Premium & Luxury',
                subtitle: '₹5,500+ / person / day',
                icon: '👑',
                totalEstimate: `Est. Total: ~₹${luxMin.toLocaleString('en-IN')}+ for ${p} traveler${p > 1 ? 's' : ''}`,
                desc: 'Heritage riverfront havelis, luxury private boats, VIP temple darshan & concierge.'
            }
        ];
    };

    // 4. Smart Duration Badge
    const getDurationScopeText = () => {
        if (formData.days === 1) return '⚡ 1-Day Quick Flash Excursion';
        if (formData.days === 2) return '🌿 2-Day Weekend Deep Dive';
        if (formData.days <= 4) return '✨ 3–4 Days Ideal 2-City Circuit';
        return '🌟 5–7 Days Grand 4-City UP Expedition';
    };

    // Animate vehicle along route
    useEffect(() => {
        if (showResults && itinerary.length > 0) {
            const interval = setInterval(() => {
                setVehicleProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });

                const dayProgress = (vehicleProgress / 100) * (itinerary.length - 1);
                setCurrentDay(Math.floor(dayProgress));
            }, 100);

            return () => clearInterval(interval);
        }
    }, [showResults, itinerary, vehicleProgress]);

    // Fetch weather data
    useEffect(() => {
        if (showResults && itinerary.length > 0 && currentDay < itinerary.length) {
            const mockWeather = {
                temp: Math.floor(Math.random() * 10) + 26,
                condition: ['sunny', 'cloudy', 'sunny'][Math.floor(Math.random() * 3)],
                humidity: Math.floor(Math.random() * 20) + 55
            };
            setWeatherData(prev => ({
                ...prev,
                [currentDay]: mockWeather
            }));
        }
    }, [currentDay, itinerary, showResults]);

    // Smart People Change: auto-adjusts groupType if invalid
    const handlePeopleChange = (delta) => {
        setFormData(prev => {
            const nextPeople = Math.max(1, Math.min(20, prev.people + delta));
            let nextGroupType = prev.groupType;

            if (nextPeople === 1) {
                nextGroupType = 'single';
            } else if (nextPeople === 2) {
                if (prev.groupType === 'single') {
                    nextGroupType = 'couple';
                }
            } else if (nextPeople >= 3) {
                if (prev.groupType === 'single' || prev.groupType === 'couple') {
                    nextGroupType = 'family';
                }
            }

            return {
                ...prev,
                people: nextPeople,
                groupType: nextGroupType
            };
        });
    };

    const handleGroupTypeSelect = (type) => {
        setFormData(prev => ({ ...prev, groupType: type }));
    };

    const handleLandscapeToggle = (landscapeId) => {
        setFormData(prev => {
            const isSelected = prev.landscapes.includes(landscapeId);
            return {
                ...prev,
                landscapes: isSelected
                    ? prev.landscapes.filter(l => l !== landscapeId)
                    : [...prev.landscapes, landscapeId]
            };
        });
    };

    const handleBudgetSelect = (budgetId) => {
        setFormData(prev => ({ ...prev, budget: budgetId }));
    };

    const handleTransportSelect = (transportId) => {
        setFormData(prev => ({ ...prev, transport: transportId }));
    };

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        const profile = buildAndSaveUserProfile(formData);
        setUserProfile(profile);
        setSelectedCityIndex(0);
        setVisitedCityIds([]);
        setActiveGuideDay(0);

        const topCity = profile.topDestination;
        const allRanked = profile.rankedDestinations;

        // Generate Master 1 to 7 Day Comprehensive Guide
        const fullPlan = generateComprehensiveItinerary(topCity, allRanked, formData.days, formData.landscapes);
        setDailyGuide(fullPlan);

        // Simple overview for sidebar and SVG route
        const simpleDays = fullPlan.map(d => ({
            day: d.day,
            destination: `${d.city} - ${d.title}`,
            activity: d.morning.activity
        }));
        setItinerary(simpleDays);
        setShowResults(true);
        setIsLoading(false);
    };

    // Switch active destination to any ranked city
    const handleSelectCity = (index) => {
        if (!userProfile) return;
        setSelectedCityIndex(index);
        const activeCity = userProfile.rankedDestinations[index];

        const fullPlan = generateComprehensiveItinerary(activeCity, userProfile.rankedDestinations, formData.days, formData.landscapes);
        setDailyGuide(fullPlan);
        setActiveGuideDay(0);

        const simpleDays = fullPlan.map(d => ({
            day: d.day,
            destination: `${d.city} - ${d.title}`,
            activity: d.morning.activity
        }));
        setItinerary(simpleDays);
        setVehicleProgress(0);
        setCurrentDay(0);
    };

    // Toggle already visited place
    const handleToggleVisited = (cityId) => {
        if (!userProfile) return;
        const isVisited = visitedCityIds.includes(cityId);
        let nextVisited;

        if (isVisited) {
            nextVisited = visitedCityIds.filter(id => id !== cityId);
        } else {
            nextVisited = [...visitedCityIds, cityId];
        }
        setVisitedCityIds(nextVisited);

        if (!isVisited) {
            const nextUnvisitedIndex = userProfile.rankedDestinations.findIndex(
                (d) => !nextVisited.includes(d.id)
            );
            if (nextUnvisitedIndex !== -1) {
                handleSelectCity(nextUnvisitedIndex);
            }
        }
    };

    const canProceed = () => {
        return (
            formData.people >= 1 &&
            Boolean(formData.groupType) &&
            formData.landscapes.length > 0 &&
            Boolean(formData.budget) &&
            Boolean(formData.transport) &&
            formData.days >= 1 &&
            formData.pickupLocation.trim().length > 0
        );
    };

    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'sunny': return <FaCloudSun style={{ color: '#FBC02D' }} />;
            case 'cloudy': return <FaCloud style={{ color: '#78909C' }} />;
            case 'rainy': return <FaCloudRain style={{ color: '#4FC3F7' }} />;
            default: return <FaCloudSun />;
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: 40 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -40 }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.35
    };

    if (isLoading) {
        return (
            <div className="wizard-container loading-container">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="loading-icon"
                >
                    <FaSpinner size={50} color="#597E52" />
                </motion.div>
                <h2>Crafting Your {formData.days}-Day Travel Guide & Circuit...</h2>
                <p>Curating morning, afternoon, evening slots & regional highlights for UP ✨</p>
            </div>
        );
    }

    if (showResults && userProfile) {
        const ranked = userProfile.rankedDestinations;
        const activeDest = ranked[selectedCityIndex] || ranked[0];
        const isCurrentCityVisited = visitedCityIds.includes(activeDest.id);
        const currentActiveGuide = dailyGuide[activeGuideDay] || dailyGuide[0];

        return (
            <div className="results-container">
                {/* Result Top Navigation Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1400px',
                    margin: '0 auto 18px auto',
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.88)',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(89, 126, 82, 0.15)'
                }}>
                    <Link to="/home.html" style={{ textDecoration: 'none', color: '#597E52', fontWeight: 700, fontSize: '1.15rem' }}>
                        🌿 India Tourist
                    </Link>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link
                            to="/trip-plan"
                            style={{
                                textDecoration: 'none',
                                background: '#597E52',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '8px 18px',
                                borderRadius: '100px',
                                fontWeight: 700,
                                fontSize: '0.88rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <FaCalendarAlt /> View My Personalized Trip Plan
                        </Link>
                        <button
                            onClick={() => {
                                setShowResults(false);
                                setStep(totalSteps);
                            }}
                            style={{
                                background: 'rgba(89, 126, 82, 0.12)',
                                color: '#597E52',
                                border: 'none',
                                padding: '8px 18px',
                                borderRadius: '100px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                            title="Return 1 step back to edit your questionnaire"
                        >
                            ← Back (Return 1 Step)
                        </button>
                        <button
                            onClick={() => {
                                setShowResults(false);
                                setVehicleProgress(0);
                                setCurrentDay(0);
                            }}
                            style={{
                                background: '#597E52',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '10px 22px',
                                borderRadius: '100px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 15px rgba(89, 126, 82, 0.4)'
                            }}
                        >
                            <FaRedo /> ✏️ Edit Route Preferences
                        </button>
                    </div>
                </div>

                {/* View Switcher Pill Strip */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    maxWidth: '1400px',
                    margin: '0 auto 24px auto',
                    flexWrap: 'wrap'
                }}>
                    <button
                        type="button"
                        onClick={() => setActiveResultView('trip_plan')}
                        style={{
                            padding: '12px 26px',
                            borderRadius: '100px',
                            border: '1px solid ' + (activeResultView === 'trip_plan' ? '#597E52' : 'rgba(89, 126, 82, 0.2)'),
                            background: activeResultView === 'trip_plan' ? '#597E52' : '#FFFFFF',
                            color: activeResultView === 'trip_plan' ? '#FFFFFF' : '#2C352D',
                            fontWeight: 800,
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: activeResultView === 'trip_plan' ? '0 6px 18px rgba(89, 126, 82, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <FaCalendarAlt /> 🗺️ Your Personalized Trip Plan & Blueprint
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveResultView('rankings')}
                        style={{
                            padding: '12px 26px',
                            borderRadius: '100px',
                            border: '1px solid ' + (activeResultView === 'rankings' ? '#597E52' : 'rgba(89, 126, 82, 0.2)'),
                            background: activeResultView === 'rankings' ? '#597E52' : '#FFFFFF',
                            color: activeResultView === 'rankings' ? '#FFFFFF' : '#2C352D',
                            fontWeight: 800,
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: activeResultView === 'rankings' ? '0 6px 18px rgba(89, 126, 82, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <FaCompass /> 🏆 Destination Rankings & Multi-Factor Scores
                    </button>
                </div>

                {/* VIEW 1: COMPLETE PERSONALIZED TRIP PLAN */}
                {activeResultView === 'trip_plan' && (
                    <TripPlan tripPlanData={userProfile.tripPlan} />
                )}

                {/* VIEW 2: MULTI-FACTOR DESTINATION COMPARISON & RANKINGS */}
                {activeResultView === 'rankings' && (
                    <>
                        {/* 🎯 Interactive Destination Switcher Bar */}
                        <div className="destination-switcher-container">
                            <div className="switcher-heading-row">
                                <span className="switcher-heading">
                                    <FaCompass /> Compare & Switch Recommended UP Destinations:
                                </span>
                                <span style={{ fontSize: '0.82rem', color: '#7A8C7C' }}>
                                    Click any destination below to view its tailored itinerary
                                </span>
                            </div>

                    <div className="destination-switcher-grid">
                        {ranked.map((city, idx) => {
                            const isVisited = visitedCityIds.includes(city.id);
                            const isActive = idx === selectedCityIndex;

                            return (
                                <div
                                    key={city.id}
                                    className={`switcher-city-card ${isActive ? 'active' : ''} ${isVisited ? 'visited' : ''}`}
                                    onClick={() => handleSelectCity(idx)}
                                >
                                    <div className="switcher-card-top">
                                        <span className="switcher-rank-badge">
                                            {idx === 0 ? '🏆 #1 Top Match' : idx === 1 ? '✨ #2 Alternative' : idx === 2 ? '🌟 #3 Alternative' : '📍 #4 Alternative'}
                                        </span>
                                        <span className="switcher-score-badge">
                                            {city.scores.final}%
                                        </span>
                                    </div>
                                    <div className="switcher-city-name">
                                        {city.name}
                                    </div>
                                    {isVisited ? (
                                        <div className="switcher-visited-tag">
                                            <FaCheckCircle style={{ color: '#2E7D32' }} /> Already Visited
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '0.75rem', color: isActive ? '#2E7D32' : '#7A8C7C', fontWeight: 600 }}>
                                            {isActive ? '● Currently Selected' : 'Click to View'}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Visited Notification Banner */}
                {selectedCityIndex > 0 && visitedCityIds.includes(ranked[0].id) && (
                    <motion.div
                        className="visited-info-banner"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FaCheckCircle />
                        <span>
                            You've already visited <strong>{ranked[0].name}</strong>. Showing your #{selectedCityIndex + 1} best recommendation: <strong>{activeDest.name}</strong>!
                        </span>
                    </motion.div>
                )}

                {/* 🏆 Active Recommended Destination Showcase */}
                <motion.div
                    key={activeDest.id}
                    className="recommendation-showcase-box"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <div className="rec-title-row">
                            <span className="rec-badge">
                                {selectedCityIndex === 0 ? '🏆 #1 BEST MATCH' : `✨ #${selectedCityIndex + 1} RECOMMENDED DESTINATION`}
                            </span>
                            <span style={{ fontSize: '0.9rem', color: '#7A8C7C', fontWeight: 500 }}>
                                {activeDest.name} • Uttar Pradesh
                            </span>
                        </div>
                        <h2 className="rec-dest-name">{activeDest.name}</h2>
                        <p className="rec-tagline">"{activeDest.tagline}"</p>

                        <div className="rec-reasons-list">
                            {activeDest.matchReasons.map((reason, idx) => (
                                <span key={idx} className="rec-reason-tag">✓ {reason}</span>
                            ))}
                        </div>

                        {/* Already Visited Toggle Button */}
                        <div>
                            <button
                                type="button"
                                className={`already-visited-btn ${isCurrentCityVisited ? 'is-visited' : ''}`}
                                onClick={() => handleToggleVisited(activeDest.id)}
                            >
                                {isCurrentCityVisited ? (
                                    <>
                                        <FaCheckCircle style={{ color: '#2E7D32' }} /> Marked as Already Visited (Click to unmark)
                                    </>
                                ) : (
                                    <>
                                        <FaCheck /> I have already visited {activeDest.name.split(' ')[0]} → Switch to next best
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="rec-score-bubble">
                        <span className="rec-score-value">{activeDest.scores.final}%</span>
                        <span className="rec-score-label">Match Score</span>
                    </div>
                </motion.div>

                {/* ==================== 7-DAY COMPREHENSIVE DAILY GUIDE ==================== */}
                <section className="daily-guide-section">
                    <div className="daily-guide-header">
                        <div>
                            <h2 className="daily-guide-title">
                                <FaCalendarAlt style={{ color: '#597E52' }} />
                                Complete {formData.days}-Day Daily Travel Blueprint & Guide
                            </h2>
                            <p className="activities-subheading">
                                Morning, Afternoon, Evening schedules, local food trails, stay zones & transit for {activeDest.name} Circuit
                            </p>
                        </div>
                        <button
                            className="view-toggle-btn"
                            onClick={() => setShowAllDaysMode(!showAllDaysMode)}
                        >
                            {showAllDaysMode ? '⊞ Focus on Selected Day' : `📜 View All ${dailyGuide.length} Days Blueprint`}
                        </button>
                    </div>

                    {/* Day Selection Strip */}
                    <div className="day-selector-strip">
                        {dailyGuide.map((dayItem, idx) => (
                            <button
                                key={dayItem.day}
                                type="button"
                                className={`day-selector-pill ${idx === activeGuideDay ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveGuideDay(idx);
                                    setShowAllDaysMode(false);
                                }}
                            >
                                <span className="pill-day-num">Day {dayItem.day}</span>
                                <span className="pill-city-name">{dayItem.city.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>

                    {/* Render Either Single Active Day Card OR All Days */}
                    {showAllDaysMode ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {dailyGuide.map((guideItem) => (
                                <div key={guideItem.day} className="detailed-day-card">
                                    <div className="detailed-day-header">
                                        <div>
                                            <span className="day-badge-large">DAY {guideItem.day} • {guideItem.city}</span>
                                            <h3 className="detailed-day-title">{guideItem.title}</h3>
                                            <p className="detailed-day-theme">Theme: {guideItem.theme}</p>
                                        </div>
                                    </div>

                                    {/* 3-Column Time Slots */}
                                    <div className="time-slots-grid">
                                        <div className="time-slot-card morning">
                                            <div className="slot-header">
                                                <span className="slot-label"><FaSun /> Morning Slot</span>
                                                <span className="slot-time">{guideItem.morning.time}</span>
                                            </div>
                                            <h4 className="slot-activity-title">{guideItem.morning.activity}</h4>
                                            <p className="slot-desc">{guideItem.morning.description}</p>
                                            <div className="slot-food-box">
                                                <FaUtensils style={{ flexShrink: 0, marginTop: '2px' }} />
                                                <span><strong>Breakfast Pick:</strong> {guideItem.morning.foodTip}</span>
                                            </div>
                                        </div>

                                        <div className="time-slot-card afternoon">
                                            <div className="slot-header">
                                                <span className="slot-label"><FaClock /> Afternoon Slot</span>
                                                <span className="slot-time">{guideItem.afternoon.time}</span>
                                            </div>
                                            <h4 className="slot-activity-title">{guideItem.afternoon.activity}</h4>
                                            <p className="slot-desc">{guideItem.afternoon.description}</p>
                                            <div className="slot-food-box" style={{ borderLeftColor: '#E65100', background: '#FBE9E7', color: '#4E342E' }}>
                                                <FaUtensils style={{ flexShrink: 0, marginTop: '2px' }} />
                                                <span><strong>Lunch Pick:</strong> {guideItem.afternoon.foodTip}</span>
                                            </div>
                                        </div>

                                        <div className="time-slot-card evening">
                                            <div className="slot-header">
                                                <span className="slot-label"><FaMoon /> Evening Slot</span>
                                                <span className="slot-time">{guideItem.evening.time}</span>
                                            </div>
                                            <h4 className="slot-activity-title">{guideItem.evening.activity}</h4>
                                            <p className="slot-desc">{guideItem.evening.description}</p>
                                            <div className="slot-food-box" style={{ borderLeftColor: '#5C6BC0', background: '#EDE7F6', color: '#311B92' }}>
                                                <FaUtensils style={{ flexShrink: 0, marginTop: '2px' }} />
                                                <span><strong>Dinner / Sweet:</strong> {guideItem.evening.foodTip}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logistics Strip */}
                                    <div className="day-logistics-grid">
                                        <div className="logistic-item">
                                            <span className="logistic-icon"><FaHotel style={{ color: '#2E7D32' }} /></span>
                                            <div>
                                                <div className="logistic-title">Overnight Stay</div>
                                                <div className="logistic-detail">{guideItem.stay.recommendation}</div>
                                            </div>
                                        </div>
                                        <div className="logistic-item">
                                            <span className="logistic-icon"><FaCarSide style={{ color: '#0277BD' }} /></span>
                                            <div>
                                                <div className="logistic-title">Transit Route</div>
                                                <div className="logistic-detail">{guideItem.transit.route} ({guideItem.transit.distance})</div>
                                            </div>
                                        </div>
                                        <div className="logistic-item">
                                            <span className="logistic-icon"><FaSuitcaseRolling style={{ color: '#F57C00' }} /></span>
                                            <div>
                                                <div className="logistic-title">Daily Tip</div>
                                                <div className="logistic-detail">{guideItem.packingTip}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        currentActiveGuide && (
                            <motion.div
                                key={currentActiveGuide.day}
                                className="detailed-day-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="detailed-day-header">
                                    <div>
                                        <span className="day-badge-large">DAY {currentActiveGuide.day} OF {dailyGuide.length} • {currentActiveGuide.city}</span>
                                        <h3 className="detailed-day-title">{currentActiveGuide.title}</h3>
                                        <p className="detailed-day-theme">Theme: {currentActiveGuide.theme}</p>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#7A8C7C', fontWeight: 600 }}>
                                        Step {currentActiveGuide.day} of {dailyGuide.length} in Your Circuit
                                    </div>
                                </div>

                                {/* 3-Column Time Slots */}
                                <div className="time-slots-grid">
                                    <div className="time-slot-card morning">
                                        <div className="slot-header">
                                            <span className="slot-label"><FaSun /> Morning (Dawn to Noon)</span>
                                            <span className="slot-time">{currentActiveGuide.morning.time}</span>
                                        </div>
                                        <h4 className="slot-activity-title">{currentActiveGuide.morning.activity}</h4>
                                        <p className="slot-desc">{currentActiveGuide.morning.description}</p>
                                        <div className="slot-food-box">
                                            <FaUtensils style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <span><strong>Breakfast Pick:</strong> {currentActiveGuide.morning.foodTip}</span>
                                        </div>
                                    </div>

                                    <div className="time-slot-card afternoon">
                                        <div className="slot-header">
                                            <span className="slot-label"><FaClock /> Afternoon (1 PM to 5 PM)</span>
                                            <span className="slot-time">{currentActiveGuide.afternoon.time}</span>
                                        </div>
                                        <h4 className="slot-activity-title">{currentActiveGuide.afternoon.activity}</h4>
                                        <p className="slot-desc">{currentActiveGuide.afternoon.description}</p>
                                        <div className="slot-food-box" style={{ borderLeftColor: '#E65100', background: '#FBE9E7', color: '#4E342E' }}>
                                            <FaUtensils style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <span><strong>Lunch Pick:</strong> {currentActiveGuide.afternoon.foodTip}</span>
                                        </div>
                                    </div>

                                    <div className="time-slot-card evening">
                                        <div className="slot-header">
                                            <span className="slot-label"><FaMoon /> Evening & Twilight</span>
                                            <span className="slot-time">{currentActiveGuide.evening.time}</span>
                                        </div>
                                        <h4 className="slot-activity-title">{currentActiveGuide.evening.activity}</h4>
                                        <p className="slot-desc">{currentActiveGuide.evening.description}</p>
                                        <div className="slot-food-box" style={{ borderLeftColor: '#5C6BC0', background: '#EDE7F6', color: '#311B92' }}>
                                            <FaUtensils style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <span><strong>Dinner / Sweet:</strong> {currentActiveGuide.evening.foodTip}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Logistics Strip */}
                                <div className="day-logistics-grid">
                                    <div className="logistic-item">
                                        <span className="logistic-icon"><FaHotel style={{ color: '#2E7D32' }} /></span>
                                        <div>
                                            <div className="logistic-title">Recommended Stay</div>
                                            <div className="logistic-detail">{currentActiveGuide.stay.recommendation}</div>
                                        </div>
                                    </div>
                                    <div className="logistic-item">
                                        <span className="logistic-icon"><FaCarSide style={{ color: '#0277BD' }} /></span>
                                        <div>
                                            <div className="logistic-title">Transit Route</div>
                                            <div className="logistic-detail">{currentActiveGuide.transit.route} ({currentActiveGuide.transit.distance})</div>
                                        </div>
                                    </div>
                                    <div className="logistic-item">
                                        <span className="logistic-icon"><FaSuitcaseRolling style={{ color: '#F57C00' }} /></span>
                                        <div>
                                            <div className="logistic-title">Daily Tip</div>
                                            <div className="logistic-detail">{currentActiveGuide.packingTip}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )}
                </section>

                {/* 🎯 Curated Experiences in Destination Matching User Preferences */}
                <motion.section
                    key={`act_${activeDest.id}`}
                    className="activities-showcase-section"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    <div className="activities-header-row">
                        <div>
                            <h2 className="activities-header-title">
                                <span>🎯</span> Top Experiences in {activeDest.name}
                            </h2>
                            <p className="activities-subheading">
                                Personalized to your selected interests ({formData.landscapes.map(l => l.replace('_', ' ')).join(', ')})
                            </p>
                        </div>
                        <span style={{
                            padding: '6px 14px',
                            background: '#E8F5E9',
                            color: '#2E7D32',
                            borderRadius: '100px',
                            fontSize: '0.85rem',
                            fontWeight: 700
                        }}>
                            ✨ {activeDest.curatedActivities?.filter(a => a.isUserPreferenceMatch).length || 0} Priority Matches
                        </span>
                    </div>

                    <div className="activities-grid">
                        {activeDest.curatedActivities?.map((activity) => (
                            <motion.div
                                key={activity.id}
                                className={`activity-card ${activity.isUserPreferenceMatch ? 'preference-match' : ''}`}
                                whileHover={{ scale: 1.02 }}
                            >
                                {activity.isUserPreferenceMatch && (
                                    <div className="activity-pref-badge">
                                        <FaStar /> {activity.matchBadge || 'Matches Your Selected Preference'}
                                    </div>
                                )}

                                <div className="activity-top-row">
                                    <div className="activity-icon-wrap">
                                        {activity.icon}
                                    </div>
                                    <div>
                                        <h3 className="activity-title">{activity.title}</h3>
                                    </div>
                                </div>

                                <div className="activity-meta-pills">
                                    <span className="activity-pill">⏱️ {activity.duration}</span>
                                    <span className="activity-pill">🕒 {activity.bestTime}</span>
                                    <span className="activity-pill">🏷️ {activity.categoryLabel}</span>
                                </div>

                                <p className="activity-desc">{activity.description}</p>

                                {activity.insiderTip && (
                                    <div className="activity-tip-box">
                                        <FaLightbulb style={{ color: '#F57F17', flexShrink: 0, marginTop: '2px' }} />
                                        <span><strong>Insider Tip:</strong> {activity.insiderTip}</span>
                                    </div>
                                )}

                                <div className="activity-tags-row">
                                    {activity.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="activity-tag-chip">#{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <div className="results-header">
                    <h1>Journey Overview & Route Simulation</h1>
                    <p>Starting from {formData.pickupLocation} • {formData.people} Travelers ({formData.groupType})</p>
                </div>

                <div className="results-content">
                    {/* Day-by-Day Sidebar */}
                    <div className="itinerary-sidebar">
                        <h2>Circuit Stops Summary</h2>
                        {itinerary.map((day, index) => (
                            <motion.div
                                key={day.day}
                                className={`itinerary-day ${index === currentDay ? 'active' : ''} ${index < currentDay ? 'completed' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveGuideDay(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="day-number">Day {day.day}</div>
                                <div className="day-info">
                                    <div className="day-destination">{day.destination}</div>
                                    <div className="day-activity">{day.activity}</div>

                                    {/* Weather Display */}
                                    {weatherData[index] && index === currentDay && (
                                        <motion.div
                                            className="day-weather"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {getWeatherIcon(weatherData[index].condition)}
                                            <span>{weatherData[index].temp}°C</span>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Route Visualization */}
                    <div className="route-visualization">
                        <div className="route-map">
                            <svg width="100%" height="500" viewBox="0 0 800 500">
                                {/* Route Path */}
                                <motion.path
                                    d="M 120,150 Q 280,80 420,160 T 680,220 Q 580,380 420,410 T 180,420"
                                    fill="none"
                                    stroke="#597E52"
                                    strokeWidth="4"
                                    strokeDasharray="10,5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: vehicleProgress / 100 }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Destination Markers */}
                                {itinerary.map((day, index) => {
                                    const positions = [
                                        { x: 120, y: 150 },
                                        { x: 320, y: 100 },
                                        { x: 520, y: 180 },
                                        { x: 680, y: 220 },
                                        { x: 550, y: 380 },
                                        { x: 350, y: 410 },
                                        { x: 180, y: 420 }
                                    ];
                                    const pos = positions[index] || positions[positions.length - 1];

                                    return (
                                        <g key={index}>
                                            <motion.circle
                                                cx={pos.x}
                                                cy={pos.y}
                                                r={index <= currentDay ? "12" : "8"}
                                                fill={index === currentDay ? "#E89A5D" : index < currentDay ? "#597E52" : "#D7CCC8"}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: index * 0.2 }}
                                            />
                                            <text
                                                x={pos.x}
                                                y={pos.y - 20}
                                                textAnchor="middle"
                                                fill="#5D4037"
                                                fontSize="13"
                                                fontWeight="bold"
                                            >
                                                Day {day.day}: {day.destination.split(' - ')[0]}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Animated Vehicle (Car) */}
                                <motion.g
                                    initial={{ x: 120, y: 150 }}
                                    animate={{
                                        x: 120 + (vehicleProgress / 100) * 560,
                                        y: 150 + Math.sin((vehicleProgress / 100) * Math.PI * 2) * 140
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <circle cx="0" cy="0" r="20" fill="#2C352D" />
                                    <text
                                        x="0"
                                        y="5"
                                        textAnchor="middle"
                                        fill="#FFF"
                                        fontSize="20"
                                    >
                                        🚗
                                    </text>
                                </motion.g>
                            </svg>
                        </div>

                        <div className="route-progress">
                            <div className="progress-text">Journey Simulation: {Math.round(vehicleProgress)}%</div>
                            <div className="progress-bar-results">
                                <motion.div
                                    className="progress-fill-results"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${vehicleProgress}%` }}
                                />
                            </div>
                        </div>

                        <button
                            className="back-to-form"
                            onClick={() => {
                                setShowResults(false);
                                setVehicleProgress(0);
                                setCurrentDay(0);
                            }}
                        >
                            ✏️ Edit Route Preferences / Plan Another Trip ✨
                        </button>
                    </div>
                </div>
                    </>
                )}
            </div>
        );
    }

    const availableGroupTypes = getAvailableGroupTypes();
    const availableTransport = getAvailableTransportOptions();
    const dynamicBudgets = getDynamicBudgetOptions();

    const selectedBudgetObj = dynamicBudgets.find(b => b.id === formData.budget) || dynamicBudgets[0];
    const selectedTransportObj = availableTransport.find(t => t.id === formData.transport) || availableTransport[0];

    return (
        <div className="wizard-container" style={{ background: '#FDFCF8' }}>
            {/* Top Navigation Strip */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 32px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(89, 126, 82, 0.15)',
                position: 'sticky',
                top: 0,
                zIndex: 90
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                window.location.href = '/home.html';
                            }
                        }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#F0F4EF',
                            color: '#597E52',
                            border: '1px solid rgba(89, 126, 82, 0.25)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontFamily: 'Outfit, sans-serif'
                        }}
                        title="Return 1 step back"
                    >
                        ← Back
                    </button>
                    <Link to="/home.html" style={{ textDecoration: 'none', color: '#597E52', fontWeight: 700, fontSize: '1.15rem' }}>
                        🌿 India Tourist • UP Circuit Planner
                    </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#7A8C7C', fontWeight: 600 }}>
                        Varanasi • Mirzapur • Sonbhadra • Prayagraj
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setFormData({
                                people: 2,
                                groupType: 'couple',
                                landscapes: ['waterfalls', 'spiritual'],
                                budget: 'budget',
                                transport: 'cab',
                                days: 4,
                                pickupLocation: 'Varanasi'
                            });
                        }}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(122, 140, 124, 0.3)',
                            color: '#7A8C7C',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                        title="Reset all fields to default"
                    >
                        ↺ Reset
                    </button>
                </div>
            </div>

            {/* Main Single Page Planner */}
            <div className="single-page-wizard">
                {/* Hero Card */}
                <div className="planner-hero-card">
                    <span className="planner-badge">🗺️ All-In-One Route Planner</span>
                    <h1 className="planner-title">Plan Your Perfect Route</h1>
                    <p className="planner-subtitle">
                        Configure your travel party, duration, interests, and budget on this single page. Generate a comprehensive multi-city circuit with live route maps, stays, and day-by-day itineraries in seconds.
                    </p>
                </div>

                <div className="single-page-sections-grid">
                    {/* SECTION 1: TRAVELERS & GROUP TYPE */}
                    <div className="planner-section">
                        <div className="section-header-row">
                            <div className="section-header-title">
                                <span className="section-num-pill">1</span>
                                👥 Travelers & Group Composition
                            </div>
                            <span className="section-header-hint">
                                {formData.people === 1 ? '👤 Solo traveler' : formData.people === 2 ? '👥 2 travelers' : `👨‍👩‍👧‍👦 Group of ${formData.people} travelers`}
                            </span>
                        </div>

                        <div className="two-col-layout">
                            {/* People Counter */}
                            <div className="col-block">
                                <label className="col-block-label">Number of People Traveling:</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div className="single-page-counter">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="counter-btn"
                                            style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}
                                            onClick={() => handlePeopleChange(-1)}
                                            type="button"
                                        >
                                            −
                                        </motion.button>
                                        <div
                                            className="counter-display"
                                            style={{ fontSize: '3rem', minWidth: '70px', textAlign: 'center' }}
                                        >
                                            {formData.people}
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="counter-btn"
                                            style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}
                                            onClick={() => handlePeopleChange(1)}
                                            type="button"
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: '#7A8C7C', fontWeight: 500 }}>
                                        {formData.people === 1 ? 'Solo explorer' : formData.people === 2 ? 'Couple or 2 friends' : `${formData.people} person party`}
                                    </span>
                                </div>
                            </div>

                            {/* Group Type Selection */}
                            <div className="col-block">
                                <label className="col-block-label">Who is traveling with you?</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                                    {availableGroupTypes.map((type) => (
                                        <div
                                            key={type.id}
                                            className={`group-card ${formData.groupType === type.id ? 'selected' : ''}`}
                                            onClick={() => handleGroupTypeSelect(type.id)}
                                            style={{ padding: '16px 12px', textAlign: 'center', borderRadius: '14px' }}
                                        >
                                            <div className="card-icon" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{type.icon}</div>
                                            <div className="card-label" style={{ fontSize: '0.95rem', fontWeight: 700 }}>{type.label}</div>
                                            {type.hint && <div className="card-hint" style={{ fontSize: '0.75rem', marginTop: '4px' }}>{type.hint}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: DURATION & STARTING LOCATION */}
                    <div className="planner-section">
                        <div className="section-header-row">
                            <div className="section-header-title">
                                <span className="section-num-pill">2</span>
                                📅 Trip Duration & Starting Point
                            </div>
                            <span className="section-header-hint">
                                {getDurationScopeText()}
                            </span>
                        </div>

                        <div className="two-col-layout">
                            {/* Duration Slider */}
                            <div className="col-block">
                                <label className="col-block-label">
                                    Trip Length: <strong style={{ color: '#597E52', marginLeft: '6px' }}>{formData.days} Day{formData.days > 1 ? 's' : ''}</strong>
                                </label>
                                <div className="slider-container" style={{ margin: '8px 0', padding: '16px 20px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(89, 126, 82, 0.15)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#597E52' }}>
                                            {formData.days} Days Itinerary
                                        </span>
                                        <span style={{ fontSize: '0.82rem', background: 'rgba(89, 126, 82, 0.1)', color: '#597E52', padding: '3px 10px', borderRadius: '50px', fontWeight: 600 }}>
                                            {getDurationScopeText()}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="7"
                                        value={formData.days}
                                        onChange={(e) => setFormData(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                                        className="day-slider"
                                        style={{ width: '100%', accentColor: '#597E52' }}
                                    />
                                    <div className="slider-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#7A8C7C', marginTop: '6px' }}>
                                        <span>1 Day (Flash)</span>
                                        <span>4 Days (Circuit)</span>
                                        <span>7 Days (Full Grand Tour)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Starting Point */}
                            <div className="col-block">
                                <label className="col-block-label">Starting / Pickup Location:</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter starting city (e.g. Varanasi, Prayagraj, Mirzapur)"
                                        value={formData.pickupLocation}
                                        onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                                        className="location-input"
                                        style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(89, 126, 82, 0.3)', fontSize: '1rem', background: '#FFFFFF' }}
                                    />
                                </div>
                                <div className="pickup-pills-row" style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {quickPickupCities.map((city, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            className={`pickup-pill ${formData.pickupLocation === city ? 'active' : ''}`}
                                            onClick={() => setFormData(prev => ({ ...prev, pickupLocation: city }))}
                                            style={{ cursor: 'pointer', fontSize: '0.84rem' }}
                                        >
                                            <FaMapMarkerAlt style={{ marginRight: '4px' }} /> {city}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: KEY INTERESTS & EXPERIENCES */}
                    <div className="planner-section">
                        <div className="section-header-row">
                            <div className="section-header-title">
                                <span className="section-num-pill">3</span>
                                🌿 Key Interests & Experiences
                            </div>
                            <span className="section-header-hint">
                                {formData.landscapes.length} experience{formData.landscapes.length !== 1 ? 's' : ''} selected
                            </span>
                        </div>

                        <p style={{ color: '#7A8C7C', fontSize: '0.92rem', marginBottom: '18px' }}>
                            Select the types of places and activities you want highlighted in your daily schedule:
                        </p>

                        <div className="landscape-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: 0 }}>
                            {INTEREST_OPTIONS.map((item) => (
                                <div
                                    key={item.id}
                                    className={`landscape-card ${formData.landscapes.includes(item.id) ? 'selected' : ''}`}
                                    onClick={() => handleLandscapeToggle(item.id)}
                                    style={{
                                        '--landscape-color': item.color,
                                        padding: '18px 14px',
                                        borderRadius: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div className="landscape-icon" style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.icon}</div>
                                    <div className="landscape-label" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 4: BUDGET & TRAVEL STYLE */}
                    <div className="planner-section">
                        <div className="section-header-row">
                            <div className="section-header-title">
                                <span className="section-num-pill">4</span>
                                💰 Trip Budget Style
                            </div>
                            <span className="section-header-hint">
                                Calculated for {formData.people} traveler{formData.people > 1 ? 's' : ''} across {formData.days} day{formData.days > 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="budget-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: 0 }}>
                            {dynamicBudgets.map((b) => (
                                <div
                                    key={b.id}
                                    className={`budget-card ${formData.budget === b.id ? 'selected' : ''}`}
                                    onClick={() => handleBudgetSelect(b.id)}
                                    style={{ padding: '24px 20px', borderRadius: '16px', cursor: 'pointer' }}
                                >
                                    <div className="budget-icon" style={{ fontSize: '2rem', marginBottom: '10px' }}>{b.icon}</div>
                                    <div className="budget-title" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{b.label}</div>
                                    <div className="budget-subtitle" style={{ fontSize: '0.85rem', color: '#7A8C7C', marginBottom: '10px' }}>{b.subtitle}</div>
                                    <div className="budget-estimate-pill" style={{ fontSize: '0.9rem', fontWeight: 700, padding: '4px 12px' }}>
                                        {b.totalEstimate}
                                    </div>
                                    <p className="budget-desc" style={{ fontSize: '0.86rem', marginTop: '10px', color: '#7A8C7C' }}>{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 5: PREFERRED TRANSPORT */}
                    <div className="planner-section">
                        <div className="section-header-row">
                            <div className="section-header-title">
                                <span className="section-num-pill">5</span>
                                🚗 Preferred Transportation
                            </div>
                            <span className="section-header-hint">
                                Intercity transit connecting your circuit
                            </span>
                        </div>

                        <div className="transport-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginTop: 0 }}>
                            {availableTransport.map((t) => (
                                <div
                                    key={t.id}
                                    className={`transport-card ${formData.transport === t.id ? 'selected' : ''}`}
                                    onClick={() => handleTransportSelect(t.id)}
                                    style={{ padding: '22px 18px', borderRadius: '16px', cursor: 'pointer' }}
                                >
                                    <div className="transport-icon" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{t.icon}</div>
                                    <div className="transport-title" style={{ fontSize: '1.15rem', fontWeight: 800 }}>{t.label}</div>
                                    <p className="transport-desc" style={{ fontSize: '0.86rem', marginTop: '8px', color: '#7A8C7C' }}>{t.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STICKY LIVE SUMMARY & GENERATE ACTION CTA BAR */}
                <div className="planner-cta-bar">
                    <div className="cta-summary-left">
                        <div className="cta-summary-title">
                            <span>✨ Your Planned Circuit:</span>
                            <span style={{ color: '#E89A5D' }}>{formData.days} Days from {formData.pickupLocation}</span>
                        </div>
                        <div className="cta-summary-tags">
                            <span className="cta-summary-pill">👥 {formData.people} {formData.people > 1 ? 'Travelers' : 'Traveler'}</span>
                            <span className="cta-summary-pill">📅 {formData.days} Days</span>
                            <span className="cta-summary-pill">📍 {formData.pickupLocation}</span>
                            <span className="cta-summary-pill">{selectedBudgetObj.label}</span>
                            <span className="cta-summary-pill">{selectedTransportObj.label}</span>
                            <span className="cta-summary-pill">🌿 {formData.landscapes.length} Interests</span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            className="generate-route-btn"
                            onClick={handleSubmit}
                            disabled={!canProceed() || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="spin-icon" /> Crafting Blueprint...
                                </>
                            ) : (
                                <>
                                    <span>🚀 Generate My Perfect Route & Itinerary</span>
                                    <span>🗺️</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelWizard;
