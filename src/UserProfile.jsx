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
    FaStar,
    FaGoogle
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
    const [destPhotoIndex, setDestPhotoIndex] = useState({});

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
                    <Link to="/trip-plan" className="profile-nav-btn primary">
                        <FaCalendarAlt /> View Personalized Trip Plan
                    </Link>
                    <Link to="/wizard" className="profile-nav-btn secondary">
                        <FaRedo /> New Trip
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
                                    <div style={{ marginTop: '14px' }}>
                                        <Link to="/trip-plan" className="profile-nav-btn primary" style={{ display: 'inline-flex', gap: '8px' }}>
                                            <FaCalendarAlt /> View Detailed Day-by-Day Itinerary & Plan →
                                        </Link>
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
                                {profile.rankedDestinations.map((dest, idx) => {
                                    const destImages = (dest.images && dest.images.length > 0)
                                        ? dest.images
                                        : (dest.image ? [dest.image] : []);
                                    const activeImgIdx = destPhotoIndex[dest.id] || 0;
                                    const currentImg = destImages[activeImgIdx] || dest.image;

                                    return (
                                        <div key={dest.id} className="destination-match-card" style={{ borderColor: idx === 0 ? '#597E52' : 'rgba(89,126,82,0.15)' }}>
                                            <div className="dest-card-image-wrap">
                                                <img
                                                    src={currentImg}
                                                    alt={`${dest.name} - Photo ${activeImgIdx + 1}`}
                                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'; }}
                                                />
                                                <div className="dest-match-float-badge" style={{ color: idx === 0 ? '#2E7D32' : '#597E52' }}>
                                                    <FaStar /> #{idx + 1} • {dest.scores.final}% Match
                                                </div>
                                                <div className="dest-state-float-badge">
                                                    📸 {destImages.length} Real Photos
                                                </div>
                                            </div>

                                            {/* 4 Thumbnails Strip for Destination */}
                                            {destImages.length > 1 && (
                                                <div className="dest-thumbs-strip">
                                                    {destImages.map((imgSrc, iIdx) => (
                                                        <button
                                                            key={iIdx}
                                                            type="button"
                                                            className={`dest-thumb-btn ${activeImgIdx === iIdx ? 'active' : ''}`}
                                                            onClick={() => setDestPhotoIndex(prev => ({ ...prev, [dest.id]: iIdx }))}
                                                            title={`View photo ${iIdx + 1} of ${dest.name}`}
                                                        >
                                                            <img
                                                                src={imgSrc}
                                                                alt={`${dest.name} thumb ${iIdx + 1}`}
                                                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'; }}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="dest-card-body">
                                                <div className="dest-card-header">
                                                    <div>
                                                        <h3>{dest.name}</h3>
                                                        <span className="dest-state-sub">Uttar Pradesh</span>
                                                    </div>
                                                    <div className="dest-header-actions">
                                                        {idx === 0 && (
                                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', background: '#E8F5E9', padding: '3px 8px', borderRadius: '100px' }}>
                                                                Best Choice
                                                            </span>
                                                        )}
                                                        <a
                                                            href={dest.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(dest.name + ' Uttar Pradesh')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="dest-google-img-link"
                                                            title={`Search real live Google Images of ${dest.name}`}
                                                        >
                                                            <FaGoogle /> Real Photos ↗
                                                        </a>
                                                    </div>
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
                                    );
                                })}
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
                                                    {profile.id === item.id ? '✓ Current' : 'View Scores'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleLoadSnapshot(item);
                                                        navigate('/trip-plan');
                                                    }}
                                                    className="history-btn"
                                                    style={{ background: '#597E52', color: '#FFFFFF' }}
                                                >
                                                    <FaCalendarAlt /> View Trip Plan
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
