import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ChatWidget from './ChatWidget';

// Lazy load components
const TravelWizard = lazy(() => import('./TravelWizard'));
const Login = lazy(() => import('./Login'));

function App() {
    return (
        <Router>
            <div className="App">
                <Suspense fallback={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FDFCF8' }}>
                        <div style={{ fontSize: '1.5rem', color: '#597E52', fontFamily: 'Outfit, sans-serif' }}>
                            Loading your journey... 🌿
                        </div>
                    </div>
                }>
                    <Routes>
                        <Route path="/wizard" element={<TravelWizard />} />
                        <Route path="/login" element={<Login />} />
                        {/* Redirect to home.html for root path */}
                        <Route path="/" element={<RedirectToHome />} />
                    </Routes>
                </Suspense>
                <ChatWidget />
            </div>
        </Router>
    );
}

// Component to redirect to home.html
function RedirectToHome() {
    useEffect(() => {
        window.location.href = '/home.html';
    }, []);
    return <div>Redirecting to home page...</div>;
}

export default App;
