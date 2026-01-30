import React, { useEffect, useRef, useState } from 'react';

const NavbarGame = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);

    // Use Refs for everything game-related (no re-renders on game loop)
    const gameState = useRef('WAITING'); // WAITING, PLAYING, GAMEOVER
    const player = useRef({ y: 0, dy: 0, grounded: true });
    const obstacles = useRef([]);
    const frameCount = useRef(0);
    const scoreRef = useRef(0);
    const animFrameId = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const WIDTH = 160;
        const HEIGHT = 50;
        const GROUND_Y = 38;
        const GRAVITY = 0.6;
        const JUMP_FORCE = -7;
        const SPEED = 3;

        // Reset Logic
        const resetGame = () => {
            player.current = { y: GROUND_Y, dy: 0, grounded: true };
            obstacles.current = [];
            scoreRef.current = 0;
            frameCount.current = 0;
            setScore(0);
            gameState.current = 'PLAYING';
        };

        const draw = () => {
            // Clear Canvas
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.fillStyle = '#f8fafc'; // Light grey bg
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            // Draw Ground Line
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y + 10);
            ctx.lineTo(WIDTH, GROUND_Y + 10);
            ctx.strokeStyle = '#e2e8f0'; 
            ctx.lineWidth = 2;
            ctx.stroke();

            // Game Logic
            if (gameState.current === 'PLAYING') {
                // Physics
                if (!player.current.grounded) {
                    player.current.dy += GRAVITY;
                    player.current.y += player.current.dy;
                }

                if (player.current.y >= GROUND_Y) {
                    player.current.y = GROUND_Y;
                    player.current.grounded = true;
                    player.current.dy = 0;
                }

                // Spawn Obstacles
                frameCount.current++;
                // Spawn random obstacle every ~40-90 frames
                if (frameCount.current % 45 === 0 && Math.random() > 0.4) {
                     obstacles.current.push({ x: WIDTH, w: 8, h: 12 });
                }

                // Update Obstacles
                for (let i = obstacles.current.length - 1; i >= 0; i--) {
                    let obs = obstacles.current[i];
                    obs.x -= SPEED;

                    // Collision (Player is 10x10 at x=20)
                    if (
                        20 < obs.x + obs.w &&
                        20 + 10 > obs.x &&
                        player.current.y < GROUND_Y + 10 && // Check only if low enough to hit
                        player.current.y + 10 > GROUND_Y - obs.h + 10 // approximate y pos of obs
                    ) {
                         // Simple Box Collision check
                         // Player y is top-left. Ground Y is 38. Player is 10x10.
                         // Obstacle y is implicitly GROUND_Y + 10 - obs.h.
                         // Let's refine collision box
                         const p = { x: 20, y: player.current.y, w: 10, h: 10 };
                         const o = { x: obs.x, y: GROUND_Y + 10 - obs.h, w: obs.w, h: obs.h };

                         if (p.x < o.x + o.w && p.x + p.w > o.x && p.y < o.y + o.h && p.y + p.h > o.y) {
                             gameState.current = 'GAMEOVER';
                         }
                    }

                    // Remove off-screen & Score
                    if (obs.x + obs.w < 0) {
                        obstacles.current.splice(i, 1);
                        scoreRef.current++;
                        setScore(scoreRef.current);
                    }
                }
            }

            // Draw Player (Black Box)
            ctx.fillStyle = '#0f172a';
            const py = player.current.y;
            ctx.fillRect(20, py, 10, 10);


            // Draw Obstacles (Red/Accent Spikes)
            ctx.fillStyle = '#db2777';
            obstacles.current.forEach(obs => {
                ctx.fillRect(obs.x, GROUND_Y + 10 - obs.h, obs.w, obs.h);
            });

            // Text Overlays
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 10px Montserrat';
            if (gameState.current === 'WAITING') {
                ctx.fillText("CLICK TO PLAY", 40, 25);
            } else if (gameState.current === 'GAMEOVER') {
                ctx.fillStyle = '#db2777';
                ctx.fillText("GAME OVER", 45, 25);
                ctx.fillStyle = '#94a3b8';
                ctx.font = '8px Montserrat';
                ctx.fillText("Click to restart", 50, 35);
            }

            animFrameId.current = requestAnimationFrame(draw);
        };

        draw();

        // Input Handler
        const handleInput = (e) => {
            // Prevent default touch actions like scroll
            if (e.type === 'touchstart') e.preventDefault();
            
            if (gameState.current === 'WAITING' || gameState.current === 'GAMEOVER') {
                resetGame();
            } else if (player.current.grounded) {
                player.current.dy = JUMP_FORCE;
                player.current.grounded = false;
            }
        };

        // Attach listeners to canvas to ensure they work
        canvas.addEventListener('mousedown', handleInput);
        canvas.addEventListener('touchstart', handleInput, { passive: false });

        return () => {
             cancelAnimationFrame(animFrameId.current);
             canvas.removeEventListener('mousedown', handleInput);
             canvas.removeEventListener('touchstart', handleInput);
        };
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginRight: '20px',
            position: 'relative',
            zIndex: 1000 // Ensure it's above other elements
        }}>
            <canvas 
                ref={canvasRef} 
                width={160} 
                height={50} 
                style={{ 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: '#f8fafc',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0'
                }}
            />
            {/* Minimal Score Overlay always visible next to game */}
            <span style={{ 
                fontFamily: 'Montserrat, sans-serif', 
                fontSize: '0.8rem', 
                fontWeight: '700', 
                color: '#0f172a',
                minWidth: '20px'
            }}>
                {score}
            </span>
        </div>
    );
};

export default NavbarGame;
