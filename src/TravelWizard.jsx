import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaMountain,
    FaUmbrellaBeach,
    FaTree,
    FaHiking,
    FaSun,
    FaPrayingHands,
    FaUser,
    FaUserFriends,
    FaUsers,
    FaHeart,
    FaBus,
    FaCloud,
    FaCloudSun,
    FaCloudRain,
    FaSpinner
} from 'react-icons/fa';
import { generateGeminiItinerary } from './services/geminiService';
import './TravelWizard.css';

const TravelWizard = () => {
    const [step, setStep] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const [currentDay, setCurrentDay] = useState(0);
    const [vehicleProgress, setVehicleProgress] = useState(0);
    const [weatherData, setWeatherData] = useState({});

    const [formData, setFormData] = useState({
        people: 2,
        groupType: '',
        landscapes: [],
        days: 7,
        pickupLocation: ''
    });

    const [itinerary, setItinerary] = useState([]);

    const totalSteps = 5;

    const groupTypes = [
        { id: 'single', label: 'Single', icon: <FaUser /> },
        { id: 'couple', label: 'Couple', icon: <FaHeart /> },
        { id: 'family', label: 'Family', icon: <FaUsers /> },
        { id: 'friends', label: 'Friends', icon: <FaUserFriends /> }
    ];

    const landscapes = [
        { id: 'spiritual', label: 'Spiritual', icon: <FaPrayingHands />, color: '#8D6E63' }, // Earthy Brown
        { id: 'mountain', label: 'Mountain', icon: <FaMountain />, color: '#5D4037' }, // Dark Wood
        { id: 'beach', label: 'Beach', icon: <FaUmbrellaBeach />, color: '#00897B' }, // Teal
        { id: 'forest', label: 'Forest', icon: <FaTree />, color: '#33691E' }, // Deep Green
        { id: 'adventure', label: 'Adventure', icon: <FaHiking />, color: '#BF360C' }, // Burnt Orange
        { id: 'desert', label: 'Desert', icon: <FaSun />, color: '#FBC02D' }  // Muted Gold
    ];

    // Mock destinations database
    const destinations = {
        spiritual: ['Varanasi', 'Ayodhya', 'Haridwar', 'Puri'],
        mountain: ['Manali', 'Shimla', 'Darjeeling', 'Leh'],
        beach: ['Goa', 'Andaman', 'Kovalam', 'Gokarna'],
        forest: ['Coorg', 'Sundarbans', 'Jim Corbett', 'Wayanad'],
        adventure: ['Rishikesh', 'Ladakh', 'Spiti Valley', 'Bir Billing'],
        desert: ['Jaisalmer', 'Pushkar', 'Rann of Kutch', 'Bikaner']
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

                // Update current day based on progress
                const dayProgress = (vehicleProgress / 100) * (itinerary.length - 1);
                setCurrentDay(Math.floor(dayProgress));
            }, 100);

            return () => clearInterval(interval);
        }
    }, [showResults, itinerary, vehicleProgress]);

    // Fetch weather data (mock implementation)
    useEffect(() => {
        if (showResults && itinerary.length > 0 && currentDay < itinerary.length) {
            // Mock weather data - in production, use OpenWeatherMap API
            const mockWeather = {
                temp: Math.floor(Math.random() * 15) + 20,
                condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
                humidity: Math.floor(Math.random() * 30) + 50
            };
            setWeatherData(prev => ({
                ...prev,
                [currentDay]: mockWeather
            }));
        }
    }, [currentDay, itinerary, showResults]);

    const generateItinerary = () => {
        const selectedDestinations = [];

        // Get destinations based on landscapes
        formData.landscapes.forEach(landscape => {
            if (destinations[landscape]) {
                selectedDestinations.push(...destinations[landscape].slice(0, 2));
            }
        });

        // Generate day-by-day itinerary
        const days = [];
        const numDestinations = Math.min(formData.days, selectedDestinations.length);

        for (let i = 0; i < numDestinations; i++) {
            days.push({
                day: i + 1,
                destination: selectedDestinations[i] || 'Exploring',
                activity: i === 0 ? 'Arrival & Check-in'
                    : i === numDestinations - 1 ? 'Departure'
                        : 'Exploration & Sightseeing'
            });
        }

        setItinerary(days);
    };

    const handlePeopleChange = (delta) => {
        setFormData(prev => ({
            ...prev,
            people: Math.max(1, Math.min(20, prev.people + delta))
        }));
    };

    const handleGroupTypeSelect = (type) => {
        setFormData(prev => ({ ...prev, groupType: type }));
    };

    const handleLandscapeToggle = (landscape) => {
        setFormData(prev => {
            const isSelected = prev.landscapes.includes(landscape);
            return {
                ...prev,
                landscapes: isSelected
                    ? prev.landscapes.filter(l => l !== landscape)
                    : [...prev.landscapes, landscape]
            };
        });
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

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // Try to generate itinerary using Gemini
            const aiItinerary = await generateGeminiItinerary(formData);
            setItinerary(aiItinerary);
            setShowResults(true);
        } catch (error) {
            console.error("Failed to generate itinerary:", error);
            // Fallback to mock generation if AI fails (e.g., no key) or show alert
            alert("Could not generate AI itinerary. Please check your API key. Falling back to basic mode.");
            generateItinerary(); // Fallback to local
            setShowResults(true);
        } finally {
            setIsLoading(false);
        }
    };


    const canProceed = () => {
        switch (step) {
            case 1: return formData.people >= 1;
            case 2: return formData.groupType !== '';
            case 3: return formData.landscapes.length > 0;
            case 4: return formData.days >= 1;
            case 5: return formData.pickupLocation.trim() !== '';
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
        initial: { opacity: 0, x: 50 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -50 }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.4
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
                <h2>Weaving your journey...</h2>
                <p>Aligning the stars and paths for you ✨</p>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="results-container">
                <div className="results-header">
                    <h1>Your{formData.days}-Day Journey</h1>
                    <p>From {formData.pickupLocation} with {formData.people} travelers</p>
                </div>

                <div className="results-content">
                    {/* Day-by-Day Sidebar */}
                    <div className="itinerary-sidebar">
                        <h2>Day-by-Day Itinerary</h2>
                        {itinerary.map((day, index) => (
                            <motion.div
                                key={day.day}
                                className={`itinerary-day ${index === currentDay ? 'active' : ''} ${index < currentDay ? 'completed' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
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
                                    d="M 100,100 Q 250,50 400,100 T 700,200 Q 650,350 500,400 T 200,450"
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
                                        { x: 100, y: 100 },
                                        { x: 300, y: 80 },
                                        { x: 500, y: 150 },
                                        { x: 650, y: 250 },
                                        { x: 550, y: 380 },
                                        { x: 350, y: 420 },
                                        { x: 200, y: 450 }
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
                                                fontSize="14"
                                                fontWeight="bold"
                                            >
                                                {day.destination}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Animated Vehicle (Bus) */}
                                <motion.g
                                    initial={{ x: 100, y: 100 }}
                                    animate={{
                                        x: 100 + (vehicleProgress / 100) * 600,
                                        y: 100 + Math.sin((vehicleProgress / 100) * Math.PI * 2) * 150
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
                                        🚌
                                    </text>
                                </motion.g>
                            </svg>
                        </div>

                        <div className="route-progress">
                            <div className="progress-text">Journey Progress: {Math.round(vehicleProgress)}%</div>
                            <div className="progress-bar-results">
                                <motion.div
                                    className="progress-fill-results"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${vehicleProgress}%` }}
                                />
                            </div>
                        </div>

                        <button className="back-to-form" onClick={() => {
                            setShowResults(false);
                            setVehicleProgress(0);
                            setCurrentDay(0);
                            setStep(1);
                        }}>
                            Plan Another Trip
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wizard-container">
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
                        </motion.div>
                    )}

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
                            <div className="card-grid">
                                {groupTypes.map((type, index) => (
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
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

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
                            <h1 className="question-title">What landscapes interest you?</h1>
                            <p className="subtitle">Select one or more</p>
                            <div className="landscape-grid">
                                {landscapes.map((landscape, index) => (
                                    <motion.div
                                        key={landscape.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.08 }}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`landscape-card ${formData.landscapes.includes(landscape.id) ? 'selected' : ''}`}
                                        onClick={() => handleLandscapeToggle(landscape.id)}
                                        style={{ '--landscape-color': landscape.color }}
                                    >
                                        <div className="landscape-icon">{landscape.icon}</div>
                                        <div className="landscape-label">{landscape.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

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
                            <h1 className="question-title">How many days is your trip?</h1>
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
                                    max="30"
                                    value={formData.days}
                                    onChange={(e) => setFormData(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                                    className="day-slider"
                                />
                                <div className="slider-labels">
                                    <span>1 day</span>
                                    <span>30 days</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

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
                            <h1 className="question-title">Where should we pick you up?</h1>
                            <div className="input-container">
                                <motion.input
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    type="text"
                                    placeholder="Enter your city (e.g., Delhi, Mumbai)"
                                    value={formData.pickupLocation}
                                    onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                                    className="location-input"
                                    autoFocus
                                />
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
                    {step === totalSteps ? 'Generate Journey 🗺️' : 'Next'} →
                </motion.button>
            </div>
        </div>
    );
};

export default TravelWizard;
