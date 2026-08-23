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
    generateComprehensiveItinerary
} from './services/scoringService';
import './TravelWizard.css';

const TravelWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showResults, setShowResults] = useState(false);
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
        switch (step) {
            case 1: return formData.people >= 1;
            case 2: return Boolean(formData.groupType);
            case 3: return formData.landscapes.length > 0;
            case 4: return Boolean(formData.budget);
            case 5: return Boolean(formData.transport);
            case 6: return formData.days >= 1;
            case 7: return formData.pickupLocation.trim().length > 0;
            default: return true;
        }
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
                    margin: '0 auto 24px auto',
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.85)',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(89, 126, 82, 0.15)'
                }}>
                    <Link to="/home.html" style={{ textDecoration: 'none', color: '#597E52', fontWeight: 700, fontSize: '1.15rem' }}>
                        🌿 India Tourist
                    </Link>
                    <button
                        onClick={() => {
                            setShowResults(false);
                            setVehicleProgress(0);
                            setCurrentDay(0);
                            setStep(1);
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
                    >
                        <FaRedo /> Plan Another Trip
                    </button>
                </div>

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
                                setStep(1);
                            }}
                        >
                            Plan Another Trip ✨
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const availableGroupTypes = getAvailableGroupTypes();
    const availableTransport = getAvailableTransportOptions();
    const dynamicBudgets = getDynamicBudgetOptions();

    return (
        <div className="wizard-container">
            {/* Top Navigation Strip */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 30px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(89, 126, 82, 0.1)'
            }}>
                <Link to="/home.html" style={{ textDecoration: 'none', color: '#597E52', fontWeight: 700, fontSize: '1.1rem' }}>
                    🌿 India Tourist • UP Explorer
                </Link>
                <span style={{ fontSize: '0.85rem', color: '#7A8C7C', fontWeight: 500 }}>
                    Mirzapur • Allahabad • Banaras • Sonbhadra
                </span>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar-container">
                <div className="progress-bar">
                    <motion.div
                        className="progress-fill"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="progress-text">Step {step} of {totalSteps}</div>
            </div>

            {/* Question Content */}
            <div className="wizard-content">
                <AnimatePresence mode="wait">
                    {/* STEP 1: PEOPLE */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            transition={pageTransition}
                            className="step-container"
                        >
                            <h1 className="question-title">How many people are traveling?</h1>
                            <div className="people-counter">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="counter-btn"
                                    onClick={() => handlePeopleChange(-1)}
                                >
                                    −
                                </motion.button>
                                <motion.div
                                    className="counter-display"
                                    key={formData.people}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {formData.people}
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="counter-btn"
                                    onClick={() => handlePeopleChange(1)}
                                >
                                    +
                                </motion.button>
                            </div>
                            <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#7A8C7C', fontWeight: 500 }}>
                                {formData.people === 1 ? '👤 Solo traveler selected' : formData.people === 2 ? '👥 Duo travel selected' : `👨‍👩‍👧‍👦 Group of ${formData.people} travelers`}
                            </p>
                        </motion.div>
                    )}

                    {/* STEP 2: GROUP TYPE */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            transition={pageTransition}
                            className="step-container"
                        >
                            <h1 className="question-title">What type of group are you?</h1>
                            <p className="subtitle">
                                {formData.people === 1 ? 'Showing options tailored for 1 person' : `Filtered for ${formData.people} travelers`}
                            </p>
                            <div className="card-grid">
                                {availableGroupTypes.map((type, index) => (
                                    <motion.div
                                        key={type.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`group-card ${formData.groupType === type.id ? 'selected' : ''}`}
                                        onClick={() => handleGroupTypeSelect(type.id)}
                                    >
                                        <div className="card-icon">{type.icon}</div>
                                        <div className="card-label">{type.label}</div>
                                        {type.hint && <div className="card-hint">{type.hint}</div>}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: INTERESTS */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            transition={pageTransition}
                            className="step-container"
                        >
                            <h1 className="question-title">What interests you most?</h1>
                            <p className="subtitle">Select one or more key experiences</p>
                            <div className="landscape-grid">
                                {INTEREST_OPTIONS.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.08 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`landscape-card ${formData.landscapes.includes(item.id) ? 'selected' : ''}`}
                                        onClick={() => handleLandscapeToggle(item.id)}
                                        style={{ '--landscape-color': item.color }}
                                    >
                                        <div className="landscape-icon">{item.icon}</div>
                                        <div className="landscape-label">{item.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: BUDGET STYLE */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            transition={pageTransition}
                            className="step-container"
                        >
                            <h1 className="question-title">What is your trip budget style?</h1>
                            <p className="subtitle">
                                Dynamically calculated for {formData.people} traveler{formData.people > 1 ? 's' : ''} across {formData.days} days
                            </p>
                            <div className="budget-grid">
                                {dynamicBudgets.map((b, index) => (
                                    <motion.div
                                        key={b.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className={`budget-card ${formData.budget === b.id ? 'selected' : ''}`}
                                        onClick={() => handleBudgetSelect(b.id)}
                                    >
                                        <div className="budget-icon">{b.icon}</div>
                                        <div className="budget-title">{b.label}</div>
                                        <div className="budget-subtitle">{b.subtitle}</div>
                                        <div className="budget-estimate-pill">
                                            {b.totalEstimate}
                                        </div>
                                        <p className="budget-desc">{b.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: PREFERRED TRANSPORT */}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            transition={pageTransition}
                            className="step-container"
                        >
                            <h1 className="question-title">How do you prefer to travel?</h1>
                            <p className="subtitle">
                                {formData.people >= 5 ? `Recommended options for group of ${formData.people} travelers` : 'Transit matching across city connections and nature trails'}
                            </p>
                            <div className="transport-grid">
                                {availableTransport.map((t, index) => (
                                    <motion.div
                                        key={t.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className={`transport-card ${formData.transport === t.id ? 'selected' : ''}`}
                                        onClick={() => handleTransportSelect(t.id)}
                                    >
                                        <div className="transport-icon">{t.icon}</div>
                                        <div className="transport-title">{t.label}</div>
                                        <p className="transport-desc">{t.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: DURATION */}
                    {step === 6 && (
                        <motion.div
                            key="step6"
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            transition={pageTransition}
                            className="step-container"
                        >
                            <h1 className="question-title">How many days is your trip?</h1>
                            <p className="subtitle">{getDurationScopeText()}</p>
                            <div className="slider-container">
                                <motion.div
                                    className="day-display"
                                    key={formData.days}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <span className="day-number">{formData.days}</span>
                                    <span className="day-label">days</span>
                                </motion.div>
                                <input
                                    type="range"
                                    min="1"
                                    max="7"
                                    value={formData.days}
                                    onChange={(e) => setFormData(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                                    className="day-slider"
                                />
                                <div className="slider-labels">
                                    <span>1 Day Trip</span>
                                    <span>7 Days Circuit</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 7: PICKUP / STARTING LOCATION */}
                    {step === 7 && (
                        <motion.div
                            key="step7"
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            transition={pageTransition}
                            className="step-container"
                        >
                            <h1 className="question-title">Where should we start your trip?</h1>
                            <p className="subtitle">Select your starting city or enter custom location</p>
                            <div className="input-container">
                                <motion.input
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    type="text"
                                    placeholder="Enter starting city (e.g. Varanasi, Prayagraj)"
                                    value={formData.pickupLocation}
                                    onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                                    className="location-input"
                                    autoFocus
                                />
                            </div>

                            <div className="pickup-pills-row">
                                {quickPickupCities.map((city, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`pickup-pill ${formData.pickupLocation === city ? 'active' : ''}`}
                                        onClick={() => setFormData(prev => ({ ...prev, pickupLocation: city }))}
                                    >
                                        <FaMapMarkerAlt style={{ marginRight: '4px' }} /> {city}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="wizard-navigation">
                {step > 1 && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="nav-btn back-btn"
                        onClick={handleBack}
                    >
                        ← Back
                    </motion.button>
                )}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`nav-btn next-btn ${!canProceed() ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={!canProceed()}
                >
                    {step === totalSteps ? 'Find Best Destination & Itinerary 🗺️' : 'Next'} →
                </motion.button>
            </div>
        </div>
    );
};

export default TravelWizard;
