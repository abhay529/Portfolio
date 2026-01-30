import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const GamePage = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('dinoHighScore')) || 0);
    const [gameState, setGameState] = useState('MENU');
    const [difficulty, setDifficulty] = useState('INTERMEDIATE');
    const animationFrameRef = useRef(null);
    const gameStateRef = useRef('MENU'); // Track current game state for event listeners

    // Portfolio Theme Colors
    const THEME = {
        bg: '#FDFCF6',
        text: '#0f172a',
        accent: '#C5D89D',
        obstacle: '#ef4444',
        player: '#0f172a',
        ground: '#cbd5e1'
    };

    // Game State
    const gameRef = useRef({
        player: { y: 0, dy: 0, grounded: true, jumpCount: 0 },
        obstacles: [],
        frameCount: 0,
        score: 0,
        speed: 8,
        gravity: 0.8,
        jumpForce: -15,
        spawnRate: 90
    });

    const difficultySettings = {
        EASY: { speed: 7, spawnRate: 110, label: 'CHILL' },
        INTERMEDIATE: { speed: 10, spawnRate: 85, label: 'STANDARD' },
        HARD: { speed: 14, spawnRate: 60, label: 'HARD' },
        EXTREME: { speed: 18, spawnRate: 45, label: 'CHAOS' }
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const GROUND_Y = HEIGHT * 0.75;
        const state = gameRef.current;

        // Clear
        ctx.fillStyle = THEME.bg;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Draw Ground
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y + 40);
        ctx.lineTo(WIDTH, GROUND_Y + 40);
        ctx.strokeStyle = THEME.text;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Physics
        if (!state.player.grounded) {
            state.player.dy += state.gravity;
            state.player.y += state.player.dy;
        }

        if (state.player.y >= GROUND_Y) {
            state.player.y = GROUND_Y;
            state.player.grounded = true;
            state.player.dy = 0;
            state.player.jumpCount = 0;
        }

        // Spawn Obstacles
        state.frameCount++;
        if (state.frameCount % state.spawnRate === 0 && Math.random() > 0.15) {
            const type = Math.random();
            let w = 35, h = 55;
            if (type > 0.7) { w = 30; h = 75; }
            else if (type < 0.3) { w = 65; h = 35; }
            
            state.obstacles.push({ x: WIDTH, w, h });
        }

        // Update obstacles
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
            let obs = state.obstacles[i];
            obs.x -= state.speed;

            // Collision detection
            const p = { x: 100, y: state.player.y, w: 40, h: 40 };
            const o = { x: obs.x, y: GROUND_Y + 40 - obs.h, w: obs.w, h: obs.h };

            if (p.x < o.x + o.w && p.x + p.w > o.x && p.y < o.y + o.h && p.y + p.h > o.y) {
                handleGameOver();
                return;
            }

            // Score and cleanup
            if (obs.x + obs.w < 0) {
                state.obstacles.splice(i, 1);
                state.score++;
                setScore(state.score);
            }
        }

        // Draw Player
        ctx.fillStyle = THEME.player;
        ctx.fillRect(100, state.player.y, 40, 40);

        // Draw Obstacles
        ctx.fillStyle = THEME.obstacle;
        state.obstacles.forEach(obs => {
            ctx.fillRect(obs.x, GROUND_Y + 40 - obs.h, obs.w, obs.h);
        });

        // Continue loop only if playing
        if (gameState === 'PLAYING') {
            animationFrameRef.current = requestAnimationFrame(gameLoop);
        }
    };

    const startGame = (selectedDifficulty) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Cancel any existing animation frame
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        setDifficulty(selectedDifficulty);
        setScore(0);
        
        const settings = difficultySettings[selectedDifficulty];
        const HEIGHT = canvas.height;
        const GROUND_Y = HEIGHT * 0.75;

        // Reset game state
        gameRef.current = {
            player: { y: GROUND_Y, dy: 0, grounded: true, jumpCount: 0 },
            obstacles: [],
            frameCount: 0,
            score: 0,
            speed: settings.speed,
            gravity: 0.8,
            jumpForce: -15,
            spawnRate: settings.spawnRate
        };

        // Set state AFTER resetting game
        setGameState('PLAYING');
        gameStateRef.current = 'PLAYING'; // Update ref too
    };

    const handleGameOver = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        
        setGameState('GAMEOVER');
        gameStateRef.current = 'GAMEOVER'; // Update ref too
        
        if (gameRef.current.score > highScore) {
            setHighScore(gameRef.current.score);
            localStorage.setItem('dinoHighScore', gameRef.current.score);
        }
    };

    const handleInput = (e) => {
        if ((e.type === 'keydown' && (e.code === 'Space' || e.code === 'ArrowUp')) || 
            e.type === 'mousedown' || e.type === 'touchstart') {
            
            if (e.type === 'touchstart') e.preventDefault();
            
            // Use ref to get current game state
            if (gameStateRef.current === 'PLAYING') {
                const state = gameRef.current;
                if (state.player.grounded || state.player.jumpCount < 2) {
                    state.player.dy = state.jumpForce;
                    state.player.grounded = false;
                    state.player.jumpCount++;
                }
            }
        }
    };

    // Start game loop when state changes to PLAYING
    useEffect(() => {
        if (gameState === 'PLAYING') {
            gameLoop();
        }
    }, [gameState]);

    // Setup canvas and event listeners
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('keydown', handleInput);
        window.addEventListener('mousedown', handleInput);
        window.addEventListener('touchstart', handleInput, { passive: false });
        window.addEventListener('resize', handleResize);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('keydown', handleInput);
            window.removeEventListener('mousedown', handleInput);
            window.removeEventListener('touchstart', handleInput);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: THEME.bg }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />
            
            {/* HUD */}
            <div style={{ 
                position: 'absolute', 
                top: '70px', 
                width: '100%', 
                textAlign: 'center', 
                pointerEvents: 'none',
                opacity: gameState === 'PLAYING' ? 1 : 0.3,
                transition: 'opacity 0.3s'
            }}>
                <h1 style={{ fontFamily: 'Artega, sans-serif', color: THEME.text, fontSize: '2rem', opacity: 0.15, margin: 0 }}>
                    MINIMAL RUNNER
                </h1>
                <div style={{ fontFamily: 'Montserrat, sans-serif', color: THEME.text, opacity: 0.6, fontSize: '1.2rem', marginTop: '10px', fontWeight: 'bold' }}>
                    {score} <span style={{ opacity: 0.3, margin: '0 10px' }}>|</span> HI: {highScore}
                </div>
            </div>

            {/* Menu UI */}
            <AnimatePresence>
            {gameState === 'MENU' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        background: 'rgba(253, 252, 246, 0.95)', 
                        backdropFilter: 'blur(8px)',
                        pointerEvents: 'auto',
                        zIndex: 10
                    }}
                >
                    <h2 style={{ fontFamily: 'Artega', color: THEME.text, fontSize: '3rem', marginBottom: '40px' }}>
                        SELECT MODE
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {['EASY', 'INTERMEDIATE', 'HARD', 'EXTREME'].map((level) => (
                            <button
                                key={level}
                                onClick={() => startGame(level)}
                                style={{
                                    fontFamily: 'Montserrat', 
                                    fontWeight: '800', 
                                    fontSize: '1.2rem',
                                    padding: '15px 50px', 
                                    borderRadius: '12px',
                                    border: `2px solid ${THEME.text}`,
                                    color: THEME.text, 
                                    background: 'transparent',
                                    cursor: 'pointer', 
                                    letterSpacing: '2px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => { 
                                    e.target.style.background = THEME.text; 
                                    e.target.style.color = THEME.bg; 
                                }}
                                onMouseOut={(e) => { 
                                    e.target.style.background = 'transparent'; 
                                    e.target.style.color = THEME.text; 
                                }}
                            >
                                {difficultySettings[level].label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* Game Over UI */}
            <AnimatePresence>
            {gameState === 'GAMEOVER' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        background: '#fff', 
                        padding: '50px', 
                        borderRadius: '30px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)', 
                        textAlign: 'center',
                        border: '1px solid rgba(0,0,0,0.05)',
                        pointerEvents: 'auto',
                        zIndex: 10
                    }}
                >
                    <h2 style={{ 
                        fontFamily: 'Artega', 
                        color: '#ef4444', 
                        fontSize: '3.5rem', 
                        marginBottom: '10px', 
                        lineHeight: 1,
                        margin: '0 0 10px 0'
                    }}>
                        CRASHED
                    </h2>
                    <p style={{ 
                        fontFamily: 'Montserrat', 
                        color: '#64748b', 
                        fontSize: '1.2rem', 
                        marginBottom: '30px' 
                    }}>
                        Score: {score}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            onClick={() => startGame(difficulty)} 
                            style={{
                                background: THEME.text, 
                                color: THEME.bg, 
                                border: 'none', 
                                padding: '15px 30px', 
                                borderRadius: '10px', 
                                fontWeight: 'bold', 
                                cursor: 'pointer', 
                                fontFamily: 'Montserrat'
                            }}
                        >
                            RETRY
                        </button>
                        <button 
                            onClick={() => setGameState('MENU')} 
                            style={{
                                background: 'transparent', 
                                color: THEME.text, 
                                border: `1px solid ${THEME.text}`, 
                                padding: '15px 30px', 
                                borderRadius: '10px', 
                                fontWeight: 'bold', 
                                cursor: 'pointer', 
                                fontFamily: 'Montserrat'
                            }}
                        >
                            MENU
                        </button>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

            <Link to="/" style={{
                position: 'fixed', 
                top: '40px', 
                right: '40px',
                color: THEME.text, 
                fontFamily: 'Montserrat', 
                fontWeight: '700', 
                textDecoration: 'none',
                background: '#fff', 
                padding: '12px 24px', 
                borderRadius: '99px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)', 
                fontSize: '0.8rem',
                zIndex: 1000
            }}>
                EXIT GAME
            </Link>
        </div>
    );
};

export default GamePage;
