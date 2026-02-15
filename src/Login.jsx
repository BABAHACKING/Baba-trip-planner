
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaGoogle, FaFacebookF, FaArrowRight } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { email, password, type: isLogin ? 'Login' : 'Signup' });
        // Handle authentication logic here
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
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
                <div className="login-header">
                    <h2>{isLogin ? 'Welcome Back' : 'Begin Your Journey'}</h2>
                    <p>{isLogin ? 'Resume your path to tranquility' : 'Start your spiritual adventure today'}</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <div className="icon-wrapper">
                            <FaUser />
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
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        {isLogin && <a href="#" className="forgot-password">Forgot Password?</a>}
                    </div>

                    <motion.button
                        className="submit-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'} <FaArrowRight className="btn-icon" />
                    </motion.button>
                </form>

                <div className="divider">
                    <span>Or continue with</span>
                </div>

                <div className="social-login">
                    <motion.button whileHover={{ y: -3 }} className="social-btn google">
                        <FaGoogle />
                    </motion.button>
                    <motion.button whileHover={{ y: -3 }} className="social-btn facebook">
                        <FaFacebookF />
                    </motion.button>
                </div>

                <div className="auth-switch">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
