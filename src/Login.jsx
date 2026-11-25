import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaSignOutAlt, FaCompass } from 'react-icons/fa';
import {
    apiRequest,
    getAuthToken,
    getStoredAuthUser,
    saveAuthSession,
    clearAuthSession
} from './services/apiClient';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', text: '' });
    const [activeUser, setActiveUser] = useState(() => (getAuthToken() ? getStoredAuthUser() : null));

    useEffect(() => {
        const token = getAuthToken();
        if (!token) return;

        let mounted = true;
        apiRequest('/api/auth/me')
            .then((res) => {
                if (mounted && res?.user) {
                    setActiveUser(res.user);
                    saveAuthSession(token, res.user);
                }
            })
            .catch(() => {
                if (mounted) {
                    clearAuthSession();
                    setActiveUser(null);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', text: '' });
        setIsSubmitting(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin
                ? { email, password }
                : { name: name.trim(), email, password };

            const data = await apiRequest(endpoint, {
                method: 'POST',
                body: payload,
                skipAuthClear: true
            });

            saveAuthSession(data.token, data.user);
            setActiveUser(data.user);
            setStatus({
                type: 'success',
                text: isLogin
                    ? `Welcome back, ${data.user.name}! Redirecting to your profile...`
                    : `Account created for ${data.user.name}! Redirecting to your profile...`
            });

            setTimeout(() => {
                navigate('/profile');
            }, 600);
        } catch (err) {
            setStatus({
                type: 'error',
                text: err.message || 'Authentication failed. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        clearAuthSession();
        setActiveUser(null);
        setStatus({ type: 'success', text: 'Signed out cleanly.' });
    };

    const handleToggleMode = () => {
        setIsLogin((prev) => !prev);
        setStatus({ type: '', text: '' });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <motion.div
                className="login-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="login-top-links">
                    <a href="/home.html" className="login-back-link">← Back to Home</a>
                    <Link to="/profile" className="login-back-link">My Profile</Link>
                </div>

                {activeUser ? (
                    <div className="auth-session-card">
                        <div className="login-header">
                            <h2>Signed In</h2>
                            <p>Your trips sync automatically with the Express backend.</p>
                        </div>

                        <div className="session-user-box">
                            <div className="session-user-name">{activeUser.name}</div>
                            <div className="session-user-email">{activeUser.email}</div>
                        </div>

                        {status.text && (
                            <div className={`auth-status-banner ${status.type}`}>
                                {status.text}
                            </div>
                        )}

                        <div className="session-actions">
                            <button
                                type="button"
                                className="submit-btn"
                                onClick={() => navigate('/profile')}
                            >
                                <FaCompass /> Open Traveler Profile
                            </button>
                            <button
                                type="button"
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt /> Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="login-header">
                            <h2>{isLogin ? 'Welcome Back' : 'Begin Your Journey'}</h2>
                            <p>{isLogin ? 'Sign in to sync your saved UP itineraries' : 'Create your India Tourist traveler account'}</p>
                        </div>

                        {status.text && (
                            <div className={`auth-status-banner ${status.type}`}>
                                {status.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            {!isLogin && (
                                <div className="input-group">
                                    <div className="icon-wrapper">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div className="input-group">
                                <div className="icon-wrapper">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <div className="icon-wrapper">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    placeholder={isLogin ? 'Password' : 'Password (min 6 characters)'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={isLogin ? 1 : 6}
                                    required
                                />
                            </div>

                            <motion.button
                                className="submit-btn"
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? (isLogin ? 'Signing In...' : 'Creating Account...')
                                    : (isLogin ? 'Sign In' : 'Sign Up')}{' '}
                                <FaArrowRight className="btn-icon" />
                            </motion.button>
                        </form>

                        <div className="divider">
                            <span>Express Backend Auth</span>
                        </div>

                        <div className="auth-switch">
                            <p>
                                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                                <button type="button" onClick={handleToggleMode}>
                                    {isLogin ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Login;
