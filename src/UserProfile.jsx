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
    FaGoogle,
    FaSignInAlt,
    FaSignOutAlt
} from 'react-icons/fa';
import {
    getStoredUserProfile,
    getStoredProfileHistory,
    buildAndSaveUserProfile,
    evaluateUPDestinations,
    UP_CITIES
} from './services/scoringService';
import {
    apiRequest,
    getAuthToken,
    getStoredAuthUser,
    clearAuthSession
} from './services/apiClient';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [history, setHistory] = useState([]);
    const [destPhotoIndex, setDestPhotoIndex] = useState({});
    const [authUser, setAuthUser] = useState(() => (getAuthToken() ? getStoredAuthUser() : null));
    const [syncNote, setSyncNote] = useState('');

    useEffect(() => {
        let active = getStoredUserProfile();
        let storedHistory = getStoredProfileHistory();

        // Self-heal: If active profile exists with formData but missing full rankings or scores
        if (active && active.formData) {
            if (!active.topDestination || !active.rankedDestinations || !active.rankedDestinations.length || !active.rankedDestinations[0]?.scores?.final) {
                try {
                    active = buildAndSaveUserProfile(active.formData);
                    storedHistory = getStoredProfileHistory();
                } catch (err) {
                    console.error('Failed to compute complete profile rankings:', err);
                }
            }
        }

        // If no active profile, try to restore from history
        if (!active && storedHistory && storedHistory.length > 0) {
            active = storedHistory[0];
            try {
                localStorage.setItem('india_tourist_active_profile', JSON.stringify(active));
            } catch (e) {
                console.error(e);
            }
        }

        setProfile(active);
        setHistory(storedHistory || []);

        // Sync with Express backend if authenticated
        const token = getAuthToken();
        if (!token) return;

        let mounted = true;
        apiRequest('/api/trips')
            .then(async (res) => {
                if (!mounted) return;
                const serverTrips = Array.isArray(res?.trips) ? res.trips : [];
                if (serverTrips.length > 0) {
                    let chosen = res.activeTrip || serverTrips[0];
                    if (chosen && chosen.formData && (!chosen.topDestination || !chosen.rankedDestinations || !chosen.rankedDestinations.length)) {
                        chosen = buildAndSaveUserProfile(chosen.formData);
                    }
                    setProfile(chosen);
                    setHistory(serverTrips);
                    setSyncNote('Synced with Express backend');
                    try {
                        localStorage.setItem('india_tourist_active_profile', JSON.stringify(chosen));
                        localStorage.setItem('india_tourist_profile_history', JSON.stringify(serverTrips.slice(0, 10)));
                    } catch (storageErr) {
                        console.warn('Local mirror notice:', storageErr);
                    }
                } else if (active && active.formData) {
                    const uploaded = await apiRequest('/api/trips', {
                        method: 'POST',
                        body: active
                    });
                    if (mounted && uploaded?.trips) {
                        setHistory(uploaded.trips);
                        setSyncNote('Local trip synced to Express backend');
                    }
                }
            })
            .catch((err) => {
                if (!mounted) return;
                if (err.status === 401) {
                    setAuthUser(null);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    // Quick helper to load an Eastern UP sample profile when none exists
    const handleLoadSampleProfile = () => {
        const sampleFormData = {
            pickupLocation: 'Varanasi',
            days: 3,
            people: 2,
            groupType: 'couple',
            budget: 'moderate',
            transport: 'cab',
            landscapes: ['spiritual', 'waterfalls', 'heritage']
        };
        try {
            const built = buildAndSaveUserProfile(sampleFormData);
            setProfile(built);
            setHistory(getStoredProfileHistory());
            if (getAuthToken()) {
                apiRequest('/api/trips', { method: 'POST', body: built })
                    .then((res) => {
                        if (res?.trips) setHistory(res.trips);
                    })
                    .catch(() => {});
            }
        } catch (e) {
            console.error('Error generating sample profile:', e);
        }
    };

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
                    localStorage.removeItem('india_tourist_active_trip_plan');
                } else {
                    setProfile(null);
                    localStorage.removeItem('india_tourist_active_profile');
                    localStorage.removeItem('india_tourist_active_trip_plan');
                }
            }
        } catch (err) {
            console.error(err);
        }

        if (getAuthToken()) {
            apiRequest(`/api/trips/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {});
        }
    };

    const handleLoadSnapshot = (item) => {
        let snapshot = item;
        if (snapshot && snapshot.formData && (!snapshot.topDestination || !snapshot.rankedDestinations || !snapshot.rankedDestinations.length)) {
            try {
                snapshot = buildAndSaveUserProfile(snapshot.formData);
            } catch (e) {
                console.error(e);
            }
        }
        setProfile(snapshot);
        try {
            localStorage.setItem('india_tourist_active_profile', JSON.stringify(snapshot));
            localStorage.removeItem('india_tourist_active_trip_plan');
        } catch (err) {
            console.error(err);
        }

        if (getAuthToken() && item?.id) {
            apiRequest(`/api/trips/${encodeURIComponent(item.id)}/activate`, { method: 'PATCH' }).catch(() => {});
        }
    };

    const handleSignOut = () => {
        clearAuthSession();
        setAuthUser(null);
        setSyncNote('');
    };

    return (
        <div className="profile-page-wrapper">
            {/* Top Navbar */}
            <header className="profile-navbar">
                <a href="/home.html" className="profile-logo">
                    <span>🌿</span> India Tourist • Traveler Profile
                </a>
                <div className="profile-nav-links">
                    <a href="/home.html" className="profile-nav-btn secondary">
                        Home
                    </a>
                    <Link to="/plan" className="profile-nav-btn primary">
                        <FaCalendarAlt /> View Trip Plan
                    </Link>
                    <a href="/home.html?openWizard=true" className="profile-nav-btn secondary">
                        <FaRedo /> Plan New Trip
                    </a>
                    {authUser ? (
                        <button type="button" onClick={handleSignOut} className="profile-nav-btn secondary" title={`Signed in as ${authUser.email}`}>
                            <FaSignOutAlt /> {authUser.name || 'Account'} (Sign Out)
                        </button>
                    ) : (
                        <Link to="/login" className="profile-nav-btn secondary">
                            <FaSignInAlt /> Sign In / Sync
                        </Link>
                    )}
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
                        <p>Complete our interactive Trip Planner to discover your ideal Eastern UP route across <strong>Varanasi, Mirzapur, Prayagraj & Sonbhadra</strong>.</p>
                        <div className="no-profile-actions">
                            <a href="/home.html?openWizard=true" className="profile-nav-btn primary">
                                <FaCompass /> Plan My Trip Now
                            </a>
                            <button onClick={handleLoadSampleProfile} className="profile-nav-btn secondary">
                                <FaRedo /> Load Sample Profile
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
                                            Top Pick: {profile?.topDestination?.name || 'Varanasi'}
                                        </span>
                                    </h1>
                                    <p className="persona-quote">
                                        "Tailored for {profile?.formData?.people || 2} travelers seeking {((profile?.formData?.landscapes || ['spiritual', 'waterfalls'])).map(l => String(l).replace('_', ' ')).join(' & ')} experiences."
                                    </p>
                                    <div className="persona-traits-row">
                                        {(profile?.formData?.landscapes || []).map((l, idx) => (
                                            <span key={idx} className="trait-chip">✦ {String(l).replace('_', ' ')}</span>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '14px' }}>
                                        <Link to="/plan" className="profile-nav-btn primary" style={{ display: 'inline-flex', gap: '8px' }}>
                                            <FaCalendarAlt /> View Detailed Day-by-Day Itinerary & Plan →
                                        </Link>
                                    </div>
                                </div>

                                <div className="persona-summary-stats">
                                    <div className="stat-item">
                                        <span className="stat-label"><FaUsers /> Group:</span>
                                        <span className="stat-value">{profile?.formData?.people || 2} ({profile?.formData?.groupType || 'Travelers'})</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label"><FaWallet /> Budget:</span>
                                        <span className="stat-value">{profile?.formData?.budget || 'Moderate'}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label"><FaCalendarAlt /> Duration:</span>
                                        <span className="stat-value">{profile?.formData?.days || 3} Days</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label"><FaMapPin /> Starting:</span>
                                        <span className="stat-value">{profile?.formData?.pickupLocation || 'Varanasi'}</span>
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
                                {(profile?.rankedDestinations || []).map((dest, idx) => {
                                    const destImages = (dest?.images && dest.images.length > 0)
                                        ? dest.images
                                        : (dest?.image ? [dest.image] : ['/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg']);
                                    const activeImgIdx = destPhotoIndex[dest?.id] || 0;
                                    const currentImg = destImages[activeImgIdx] || dest?.image || destImages[0];

                                    return (
                                        <div key={dest?.id || idx} className="destination-match-card" style={{ borderColor: idx === 0 ? '#597E52' : 'rgba(89,126,82,0.15)' }}>
                                            <div className="dest-card-image-wrap">
                                                <img
                                                    src={currentImg}
                                                    alt={`${dest?.name || 'Destination'} - Photo ${activeImgIdx + 1}`}
                                                    onError={(e) => { e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg'; }}
                                                />
                                                <div className="dest-match-float-badge" style={{ color: idx === 0 ? '#2E7D32' : '#597E52' }}>
                                                    <FaStar /> #{idx + 1} • {dest?.scores?.final ?? 90}% Match
                                                </div>
                                                <div className="dest-state-float-badge">
                                                    📸 {destImages.length} Real Photos
                                                </div>
                                            </div>

                                            {/* Thumbnails Strip for Destination */}
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
                                                                onError={(e) => { e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg'; }}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="dest-card-body">
                                                <div className="dest-card-header">
                                                    <div>
                                                        <h3>{dest?.name || 'Destination'}</h3>
                                                        <span className="dest-state-sub">Uttar Pradesh</span>
                                                    </div>
                                                    <div className="dest-header-actions">
                                                        {idx === 0 && (
                                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32', background: '#E8F5E9', padding: '3px 8px', borderRadius: '100px' }}>
                                                                Best Choice
                                                            </span>
                                                        )}
                                                        <a
                                                            href={dest?.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent((dest?.name || 'Varanasi') + ' Uttar Pradesh')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="dest-google-img-link"
                                                            title={`Search real live Google Images of ${dest?.name || 'Destination'}`}
                                                        >
                                                            <FaGoogle /> Real Photos ↗
                                                        </a>
                                                    </div>
                                                </div>
                                                <p className="dest-tagline">"{dest?.tagline || 'Experience rich heritage and natural wonders.'}"</p>

                                                <div className="dest-synergies-list">
                                                    {(dest?.matchReasons || ['Strong regional match', 'Curated attraction selection']).map((r, rIdx) => (
                                                        <div key={rIdx} className="synergy-item">
                                                            <FaCheckCircle /> {r}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="dest-highlights-title">Top Attractions:</div>
                                                <div className="dest-highlights-tags">
                                                    {(dest?.highlights || ['Sacred Ghats & Temples', 'Scenic Waterfalls', 'Historic Monuments']).slice(0, 3).map((h, hIdx) => (
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
                        {history && (history.length > 1 || (authUser && history.length >= 1)) && (
                            <section>
                                <h3 style={{ fontSize: '1.2rem', color: '#2C352D', marginBottom: '16px' }}>
                                    📜 Saved Trip Questionnaire History {syncNote ? `(${syncNote})` : ''}
                                </h3>
                                <div className="history-cards-grid">
                                    {history.map((item) => {
                                        const topName = item?.topDestination?.name || item?.recommendationSummary?.primaryCity || 'Eastern UP Circuit';
                                        const daysCount = item?.formData?.days || 3;
                                        const peopleCount = item?.formData?.people || 2;
                                        const groupType = item?.formData?.groupType || 'Travelers';
                                        const dateStr = item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent';

                                        return (
                                            <div key={item.id} className="history-card-item">
                                                <div className="history-card-header">
                                                    <h3>Top Pick: {topName}</h3>
                                                    <span className="history-date">
                                                        {dateStr}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.85rem', color: '#7A8C7C' }}>
                                                    {daysCount} Days • {peopleCount} Travelers ({groupType})
                                                </p>
                                                <div className="history-actions">
                                                    <button
                                                        onClick={() => handleLoadSnapshot(item)}
                                                        className="history-btn load-btn"
                                                    >
                                                        {profile?.id === item.id ? '✓ Current' : 'View Scores'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleLoadSnapshot(item);
                                                            navigate('/plan');
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
                                        );
                                    })}
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
