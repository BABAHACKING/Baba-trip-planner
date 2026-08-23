import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaMapMarkedAlt,
    FaCompass,
    FaRedo,
    FaTrashAlt,
    FaCalendarAlt,
    FaUsers,
    FaMapPin,
    FaWallet,
    FaCar,
    FaCheckCircle,
    FaStar
} from 'react-icons/fa';
import {
    getStoredUserProfile,
    getStoredProfileHistory,
    UP_CITIES
} from './services/scoringService';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const active = getStoredUserProfile();
        const storedHistory = getStoredProfileHistory();
        setProfile(active);
        setHistory(storedHistory);
    }, []);

    const handleDeleteHistory = (id, e) => {
        e.stopPropagation();
        const updated = history.filter(p => p.id !== id);
        setHistory(updated);
        try {
            localStorage.setItem('india_tourist_profile_history', JSON.stringify(updated));
            if (profile && profile.id === id) {
                if (updated.length > 0) {
                    setProfile(updated[0]);
                    localStorage.setItem('india_tourist_active_profile', JSON.stringify(updated[0]));
                } else {
                    setProfile(null);
                    localStorage.removeItem('india_tourist_active_profile');
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLoadSnapshot = (item) => {
        setProfile(item);
        try {
            localStorage.setItem('india_tourist_active_profile', JSON.stringify(item));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="profile-page-wrapper">
            {/* Top Navbar */}
            <header className="profile-navbar">
                <Link to="/home.html" className="profile-logo">
                    <span>🌿</span> India Tourist • Traveler Profile
                </Link>
                <div className="profile-nav-links">
                    <Link to="/home.html" className="profile-nav-btn secondary">
                        Home
                    </Link>
                    <Link to="/wizard" className="profile-nav-btn primary">
                        <FaRedo /> New Trip Recommendation
                    </Link>
                </div>
            </header>

            <main className="profile-main-container">
                {!profile ? (
                    <motion.div
                        className="no-profile-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="no-profile-icon">🧭</div>
                        <h2>No Saved Travel Profile Yet</h2>
                        <p>Complete our Travel Questionnaire to discover your best-matched destination across <strong>Mirzapur, Allahabad, Banaras & Sonbhadra</strong>.</p>
                        <div className="no-profile-actions">
                            <button onClick={() => navigate('/wizard')} className="profile-nav-btn primary">
                                <FaCompass /> Start Trip Planner
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Profile Summary Card */}
                        <motion.section
                            className="persona-hero-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="persona-hero-grid">
                                <div className="persona-avatar-box">
                                    🏛️
                                </div>
                                <div className="persona-details-box">
                                    <h1>
                                        Your UP Traveler Profile
                                        <span className="persona-badge">
                                            Top Pick: {profile.topDestination.name}
                                        </span>
                                    </h1>
                                    <p className="persona-quote">
                                        "Tailored for {profile.formData.people} travelers seeking {profile.formData.landscapes.join(' & ')} experiences."
                                    </p>
                                    <div className="persona-traits-row">
                                        {profile.formData.landscapes.map((l, idx) => (
                                            <span key={idx} className="trait-chip">✦ {l.replace('_', ' ')}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="persona-summary-stats">
                                    <div className="stat-item">
                                        <span className="stat-label"><FaUsers /> Group:</span>
                                        <span className="stat-value">{profile.formData.people} ({profile.formData.groupType})</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label"><FaWallet /> Budget:</span>
                                        <span className="stat-value">{profile.formData.budget}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label"><FaCalendarAlt /> Duration:</span>
                                        <span className="stat-value">{profile.formData.days} Days</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label"><FaMapPin /> Starting:</span>
                                        <span className="stat-value">{profile.formData.pickupLocation}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Ranked Destinations Showcase */}
                        <section style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2 style={{ fontSize: '1.4rem', color: '#2C352D' }}>
                                    🎯 Destination Match Ranking
                                </h2>
                                <span style={{ fontSize: '0.85rem', color: '#7A8C7C' }}>
                                    Ranked across Mirzapur, Banaras, Allahabad & Sonbhadra
                                </span>
                            </div>

                            <div className="destinations-grid">
                                {profile.rankedDestinations.map((dest, idx) => (
                                    <div key={dest.id} className="destination-match-card" style={{ borderColor: idx === 0 ? '#597E52' : 'rgba(89,126,82,0.15)' }}>
                                        <div className="dest-card-image-wrap">
                                            <img src={dest.image} alt={dest.name} onError={(e) => { e.target.src = 'god img/vn1.jpg'; }} />
                                            <div className="dest-match-float-badge" style={{ color: idx === 0 ? '#2E7D32' : '#597E52' }}>
                                                <FaStar /> #{idx + 1} • {dest.scores.final}% Match
                                            </div>
                                            <div className="dest-state-float-badge">
                                                Uttar Pradesh
                                            </div>
                                        </div>
                                        <div className="dest-card-body">
                                            <div className="dest-card-header">
                                                <h3>{dest.name}</h3>
                                                {idx === 0 && (
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', background: '#E8F5E9', padding: '3px 8px', borderRadius: '100px' }}>
                                                        Best Choice
                                                    </span>
                                                )}
                                            </div>
                                            <p className="dest-tagline">"{dest.tagline}"</p>

                                            <div className="dest-synergies-list">
                                                {dest.matchReasons.map((r, rIdx) => (
                                                    <div key={rIdx} className="synergy-item">
                                                        <FaCheckCircle /> {r}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="dest-highlights-title">Top Attractions:</div>
                                            <div className="dest-highlights-tags">
                                                {dest.highlights.slice(0, 3).map((h, hIdx) => (
                                                    <span key={hIdx} className="highlight-tag">{h}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Saved Trip History */}
                        {history.length > 1 && (
                            <section>
                                <h3 style={{ fontSize: '1.2rem', color: '#2C352D', marginBottom: '16px' }}>
                                    📜 Saved Trip Questionnaire History
                                </h3>
                                <div className="history-cards-grid">
                                    {history.map((item) => (
                                        <div key={item.id} className="history-card-item">
                                            <div className="history-card-header">
                                                <h3>Top Pick: {item.topDestination.name}</h3>
                                                <span className="history-date">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#7A8C7C' }}>
                                                {item.formData.days} Days • {item.formData.people} Travelers ({item.formData.groupType})
                                            </p>
                                            <div className="history-actions">
                                                <button
                                                    onClick={() => handleLoadSnapshot(item)}
                                                    className="history-btn load-btn"
                                                >
                                                    {profile.id === item.id ? '✓ Current' : 'View Recommendations'}
                                                </button>
                                                <button
                                                    onClick={(e) => handleDeleteHistory(item.id, e)}
                                                    className="history-btn delete-btn"
                                                    title="Delete"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default UserProfile;
