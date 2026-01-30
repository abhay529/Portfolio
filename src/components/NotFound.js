import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-viewport">
            {/* Background Echoes */}
            <div className="sonar-container">
                <motion.div
                    className="sonar-sweep"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="sonar-ring"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2.5, opacity: [0, 0.2, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
                    />
                ))}
            </div>

            <div className="content-layer">
                <motion.div
                    className="error-code-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="echo-text top">404</h1>
                    <h1 className="main-code">404</h1>
                    <h1 className="echo-text bottom">404</h1>
                </motion.div>

                <motion.div
                    className="status-message"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="glitch-line"></div>
                    <p>OBJECT_NOT_FOUND // SIGNAL_LOST</p>
                    <div className="glitch-line"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Link to="/" className="reorient-btn">
                        <span className="btn-label">REORIENT_TO_HOME</span>
                        <span className="btn-arrow">→</span>
                    </Link>
                </motion.div>
            </div>

            {/* Floating Coordinate Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="coordinate-dot"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}

            <div className="bottom-info">
                <span>LAT: 0.0000 // LONG: 0.0000</span>
                <div className="scanning-bar"></div>
            </div>
        </div>
    );
};

export default NotFound;
