import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentAlt, FaPaperPlane, FaTimes, FaRobot, FaUser } from 'react-icons/fa';
import { getGeminiChatResponse } from './services/geminiService';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'model',
            parts: [{ text: "Namaste! 🙏 I'm your India Travel Guide. Ask me anything about your trip!" }]
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message
        const newHistory = [
            ...messages,
            { role: 'user', parts: [{ text: userMessage }] }
        ];
        setMessages(newHistory);
        setIsLoading(true);

        try {
            // Get response
            const responseText = await getGeminiChatResponse(messages, userMessage);

            setMessages(prev => [
                ...prev,
                { role: 'model', parts: [{ text: responseText }] }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting to the travel spirits right now. Please check your internet or API key." }] }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="chat-widget-container">
            {/* Chat Button */}
            <motion.button
                className={`chat-toggle-btn ${isOpen ? 'hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                <FaCommentAlt />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="chat-header">
                            <div className="header-title">
                                <FaRobot /> India Travel AI
                            </div>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
                                    <div className="message-content">
                                        {msg.parts[0].text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message bot">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input-area">
                            <input
                                type="text"
                                placeholder="Ask about places, food, etc..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                            />
                            <button
                                className="send-btn"
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatWidget;
