import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaVolumeUp,
  FaVolumeMute,
  FaArrowLeft,
  FaDesktop,
  FaTrophy,
  FaFire,
  FaLightbulb,
  FaRedo,
} from 'react-icons/fa';
import Game3DScene from './Game3DScene';
import './GamePage.css';

// ==========================================
// AUDIO SYNTHESIZER (Web Audio API — 0 dependencies)
// ==========================================
class HangmanAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playKey() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (_) {}
  }

  playCorrect() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25]; // C5, E5
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.22);
      });
    } catch (_) {}
  }

  playWrong() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (_) {}
  }

  playWin() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [392.0, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      const now = this.ctx.currentTime;
      notes.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + idx * 0.09);
        gain.gain.setValueAtTime(0.22, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.35);
      });
    } catch (_) {}
  }

  playLoss() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [300, 240, 180, 120];
      const now = this.ctx.currentTime;
      notes.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);
        gain.gain.setValueAtTime(0.16, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.16);
      });
    } catch (_) {}
  }
}

const audio = new HangmanAudio();

// Curated Words in Tech, Electronics, Computing & UI/UX
const WORD_LIBRARY = [
  { word: 'CIRCUIT', category: 'Hardware', hint: 'A complete and closed path through which electric current can flow.' },
  { word: 'SILICON', category: 'Electronics', hint: 'The fundamental chemical element used as semiconductor substrate in chips.' },
  { word: 'RESISTOR', category: 'Components', hint: 'Passive two-terminal electrical component that implements electrical resistance.' },
  { word: 'CAPACITOR', category: 'Components', hint: 'Device that stores electrical energy in an electric field.' },
  { word: 'TRANSISTOR', category: 'Electronics', hint: 'Semiconductor device used to amplify or switch electrical signals.' },
  { word: 'VOLTAGE', category: 'Physics', hint: 'Electric potential difference between two points.' },
  { word: 'CURRENT', category: 'Physics', hint: 'Flow of electric charge carriers, usually electrons, through a conductor.' },
  { word: 'VERILOG', category: 'Hardware', hint: 'Hardware description language (HDL) used to model electronic systems.' },
  { word: 'RASPBERRY', category: 'Hardware', hint: 'Popular single-board credit-card-sized computer developed for makers.' },
  { word: 'ARDUINO', category: 'Hardware', hint: 'Open-source electronics prototyping platform based on flexible microcontroller hardware.' },
  { word: 'FIRMWARE', category: 'Engineering', hint: 'Permanent software programmed into a read-only memory on microchips.' },
  { word: 'ALGORITHM', category: 'Computer Science', hint: 'Finite sequence of rigorous, step-by-step instructions to solve a problem.' },
  { word: 'ROBOTICS', category: 'Engineering', hint: 'Interdisciplinary branch of electrical and mechanical computer engineering.' },
  { word: 'EMBEDDED', category: 'Systems', hint: 'Microprocessor-based computer hardware system with software for dedicated functions.' },
  { word: 'SEMICONDUCTOR', category: 'Physics', hint: 'Material with electrical conductivity between conductors and insulators.' },
  { word: 'ANTENNA', category: 'Telecommunication', hint: 'Transducer converting radio frequency electric currents into electromagnetic waves.' },
  { word: 'MICROCONTROLLER', category: 'Hardware', hint: 'Compact integrated circuit designed to govern a specific operation in an embedded system.' },
  { word: 'OSCILLOSCOPE', category: 'Instrumentation', hint: 'Laboratory instrument that displays varying signal voltages as a calibrated two-dimensional plot.' },
  { word: 'PROTOTYPE', category: 'Design', hint: 'Early sample, model, or release of a product built to test a concept.' },
  { word: 'WIREFRAME', category: 'UI / UX', hint: 'Visual guide representing the skeletal framework of a digital interface.' },
  { word: 'COMPONENT', category: 'Frontend', hint: 'Reusable, modular, self-contained building block in modern React web applications.' },
  { word: 'BANDWIDTH', category: 'Networking', hint: 'Maximum rate of data transfer across a given path.' },
];

const MAX_CHANCES = 5; // User specified: exactly 5 chances!

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const GamePage = () => {
  const [currentWordObj, setCurrentWordObj] = useState(() => {
    return WORD_LIBRARY[Math.floor(Math.random() * WORD_LIBRARY.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [lastAction, setLastAction] = useState(null); // 'correct' | 'wrong' | null

  // Stats in localStorage
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('hm_streak'), 10) || 0;
  });
  const [bestStreak, setBestStreak] = useState(() => {
    return parseInt(localStorage.getItem('hm_best_streak'), 10) || 0;
  });

  const toggleMute = () => {
    audio.init();
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Calculate wrong guesses count
  const targetWord = currentWordObj.word.toUpperCase();
  const wrongGuesses = useMemo(() => {
    return Array.from(guessedLetters).filter((letter) => !targetWord.includes(letter));
  }, [guessedLetters, targetWord]);

  const chancesRemaining = MAX_CHANCES - wrongGuesses.length;
  const isLoss = chancesRemaining <= 0;

  // Check if won
  const isWon = useMemo(() => {
    if (isLoss) return false;
    for (let char of targetWord) {
      if (char !== ' ' && !guessedLetters.has(char)) {
        return false;
      }
    }
    return true;
  }, [targetWord, guessedLetters, isLoss]);

  const isGameOver = isWon || isLoss;

  // Sound triggers & streak tracking
  useEffect(() => {
    if (isWon) {
      audio.playWin();
      setStreak((prev) => {
        const next = prev + 1;
        localStorage.setItem('hm_streak', next.toString());
        if (next > bestStreak) {
          setBestStreak(next);
          localStorage.setItem('hm_best_streak', next.toString());
        }
        return next;
      });
    } else if (isLoss) {
      audio.playLoss();
      setStreak(0);
      localStorage.setItem('hm_streak', '0');
    }
  }, [isWon, isLoss, bestStreak]);

  // Handle guessing a letter
  const handleGuess = useCallback(
    (letter) => {
      audio.init();
      const char = letter.toUpperCase();
      if (isGameOver || guessedLetters.has(char)) return;

      audio.playKey();
      setGuessedLetters((prev) => {
        const next = new Set(prev);
        next.add(char);
        return next;
      });

      if (targetWord.includes(char)) {
        audio.playCorrect();
        setLastAction('correct');
      } else {
        audio.playWrong();
        setLastAction('wrong');
      }

      setTimeout(() => setLastAction(null), 700);
    },
    [isGameOver, guessedLetters, targetWord]
  );

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (isGameOver) {
          startNewGame();
          return;
        }
      }
      if (/^[a-zA-Z]$/.test(e.key)) {
        handleGuess(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess, isGameOver]);

  // Start new game
  const startNewGame = () => {
    audio.init();
    let nextWord;
    do {
      nextWord = WORD_LIBRARY[Math.floor(Math.random() * WORD_LIBRARY.length)];
    } while (nextWord.word === currentWordObj.word && WORD_LIBRARY.length > 1);

    setCurrentWordObj(nextWord);
    setGuessedLetters(new Set());
    setShowHint(false);
    setLastAction(null);
  };

  return (
    <div className="hangman-universe">
      {/* ====================================================
          3D HOLOGRAPHIC GAME ENGINE (WebGL Canvas Backdrop)
          ==================================================== */}
      <Game3DScene
        chancesRemaining={chancesRemaining}
        isWon={isWon}
        isLoss={isLoss}
        lastAction={lastAction}
      />

      {/* ====================================================
          MOBILE BLOCKED NOTICE (PC Only Keyboard Game)
          ==================================================== */}
      <div className="hm-mobile-blocked">
        <div className="hm-mobile-card">
          <FaDesktop className="hm-mobile-icon" />
          <h2 className="hm-mobile-title">DESKTOP TERMINAL ONLY</h2>
          <p className="hm-mobile-desc">
            The Hangman Word Guessing experience is optimized exclusively for desktop keyboard input. Please visit this page from your computer or laptop.
          </p>
          <Link to="/" className="hm-mobile-back-btn">
            <FaArrowLeft /> Return To Portfolio
          </Link>
        </div>
      </div>

      {/* ====================================================
          TOP MINIMAL NAVIGATION BAR
          ==================================================== */}
      <header className="hangman-top-nav">
        <div className="hm-brand">
          <div className="hm-brand-title">
            HANGMAN <span>// WORD ODYSSEY</span>
          </div>
          <span className="hm-category-tag">{currentWordObj.category}</span>
          <span className="hm-3d-badge">✦ 3D CORE ACTIVE</span>
        </div>

        <div className="hm-nav-controls">
          <div className={`hm-streak-pod ${streak >= 3 ? 'on-fire' : ''}`} title="Current Win Streak">
            <FaFire style={{ color: 'var(--hm-accent)' }} />
            <span>STREAK: {streak}</span>
          </div>

          <div className="hm-streak-pod" title="Best Win Streak">
            <FaTrophy style={{ color: 'var(--hm-yellow)' }} />
            <span>BEST: {bestStreak}</span>
          </div>

          <button
            className="hm-icon-btn"
            onClick={toggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>

          <Link to="/" className="hm-exit-btn">
            EXIT GAME
          </Link>
        </div>
      </header>

      {/* ====================================================
          MAIN HANGMAN STAGE
          ==================================================== */}
      <main className="hangman-stage">
        {/* Top Status Bar: 5 Chances Indicator & Hint */}
        <div className="hm-status-strip">
          <div className="hm-chances-counter">
            <span className="hm-chances-label">CHANCES REMAINING:</span>
            <div className="hm-hearts-rack">
              {Array.from({ length: MAX_CHANCES }).map((_, idx) => (
                <div
                  key={idx}
                  className={`chance-dot ${idx < chancesRemaining ? '' : 'used'} ${
                    idx === chancesRemaining - 1 && lastAction === 'wrong' ? 'lost-pulse' : ''
                  }`}
                />
              ))}
            </div>
            <span className="hm-chances-text">
              {chancesRemaining} / {MAX_CHANCES}
            </span>
          </div>

          <button
            className="hm-icon-btn hm-clue-btn"
            onClick={() => setShowHint(!showHint)}
            title="Toggle Clue Hint"
          >
            <FaLightbulb style={{ color: showHint ? 'var(--hm-yellow)' : 'var(--hm-muted)' }} />
            <span className="hm-clue-btn-text">
              {showHint ? 'HIDE CLUE' : 'CLUE HINT'}
            </span>
          </button>
        </div>

        {/* Center SVG Hangman Gallows & Stick Figure with Framer Shake on Error */}
        <motion.div
          className="hm-visual-stage"
          animate={
            lastAction === 'wrong'
              ? { x: [-5, 5, -5, 5, 0], transition: { duration: 0.35 } }
              : lastAction === 'correct'
              ? { scale: [1, 1.02, 1], transition: { duration: 0.3 } }
              : {}
          }
        >
          {/* Tactical Frame Markers */}
          <div className="hm-tactical-corner tl">⌜</div>
          <div className="hm-tactical-corner tr">⌝</div>
          <div className="hm-tactical-corner bl">⌞</div>
          <div className="hm-tactical-corner br">⌟</div>

          <svg
            className="hangman-svg-canvas"
            viewBox="0 0 240 220"
            fill="none"
            stroke="var(--hm-ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Base Stand (Always drawn) */}
            <line x1="20" y1="205" x2="110" y2="205" />
            {/* Vertical Pole */}
            <line x1="65" y1="205" x2="65" y2="25" />
            {/* Top Beam */}
            <line x1="65" y1="25" x2="165" y2="25" />
            {/* Diagonal Brace */}
            <line x1="65" y1="65" x2="105" y2="25" />
            {/* Hanging Rope */}
            <line x1="165" y1="25" x2="165" y2="55" strokeDasharray="3 3" />

            {/* CHANCE 1 (Wrong 1): Head */}
            {wrongGuesses.length >= 1 && (
              <circle
                cx="165"
                cy="75"
                r="18"
                fill="#FFFFFF"
                stroke="var(--hm-ink)"
                strokeWidth="3.5"
              />
            )}

            {/* Face details (eyes / expression) */}
            {wrongGuesses.length >= 1 && !isLoss && (
              <>
                <circle cx="159" cy="72" r="2" fill="var(--hm-ink)" />
                <circle cx="171" cy="72" r="2" fill="var(--hm-ink)" />
                <path d="M 160 81 Q 165 85 170 81" strokeWidth="2" />
              </>
            )}

            {/* Dead Face (X_X) when loss */}
            {isLoss && (
              <>
                <line x1="156" y1="70" x2="162" y2="76" strokeWidth="2.5" stroke="#EF4444" />
                <line x1="162" y1="70" x2="156" y2="76" strokeWidth="2.5" stroke="#EF4444" />
                <line x1="168" y1="70" x2="174" y2="76" strokeWidth="2.5" stroke="#EF4444" />
                <line x1="174" y1="70" x2="168" y2="76" strokeWidth="2.5" stroke="#EF4444" />
                <path d="M 160 83 Q 165 79 170 83" strokeWidth="2.5" stroke="#EF4444" />
              </>
            )}

            {/* CHANCE 2 (Wrong 2): Body / Torso + Pulsing Heart Node */}
            {wrongGuesses.length >= 2 && (
              <>
                <line x1="165" y1="93" x2="165" y2="148" />
                {/* Glowing Core Heart Node */}
                <circle
                  cx="165"
                  cy="114"
                  r="3.5"
                  fill={isLoss ? '#EF4444' : '#FF5500'}
                  stroke="none"
                />
              </>
            )}

            {/* CHANCE 3 (Wrong 3): Left Arm */}
            {wrongGuesses.length >= 3 && (
              <>
                <line x1="165" y1="108" x2="135" y2="130" />
                <circle cx="135" cy="130" r="3" fill="var(--hm-ink)" stroke="none" />
              </>
            )}

            {/* CHANCE 4 (Wrong 4): Right Arm */}
            {wrongGuesses.length >= 4 && (
              <>
                <line x1="165" y1="108" x2="195" y2="130" />
                <circle cx="195" cy="130" r="3" fill="var(--hm-ink)" stroke="none" />
              </>
            )}

            {/* CHANCE 5 (Wrong 5 - Final): Legs (Complete Hangman) */}
            {wrongGuesses.length >= 5 && (
              <>
                {/* Left Leg */}
                <line x1="165" y1="148" x2="140" y2="190" />
                <circle cx="140" cy="190" r="3" fill="var(--hm-ink)" stroke="none" />
                {/* Right Leg */}
                <line x1="165" y1="148" x2="190" y2="190" />
                <circle cx="190" cy="190" r="3" fill="var(--hm-ink)" stroke="none" />
              </>
            )}
          </svg>

          {/* Hint Dropdown */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="hm-hint-banner"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                💡 <strong>Clue:</strong> {currentWordObj.hint}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Word Mystery Letter Slots with Spring Reveals */}
        <div className="hm-word-stage">
          {targetWord.split('').map((char, index) => {
            if (char === ' ') {
              return <div key={index} className="hm-letter-slot space" />;
            }
            const isRevealed = guessedLetters.has(char) || isLoss;
            return (
              <motion.div
                key={index}
                className={`hm-letter-slot ${isRevealed ? 'revealed' : ''}`}
                initial={false}
                animate={isRevealed ? { scale: [0.8, 1.12, 1], y: [4, -2, 0] } : {}}
                transition={{ duration: 0.25 }}
                style={{
                  color: isLoss && !guessedLetters.has(char) ? 'var(--hm-wrong)' : 'var(--hm-ink)',
                }}
              >
                {isRevealed ? char : ''}
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Keyboard (A to Z) */}
        <div className="hm-keyboard-deck">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="hm-keyboard-row">
              {row.map((letter) => {
                const isGuessed = guessedLetters.has(letter);
                const isCorrect = isGuessed && targetWord.includes(letter);
                const isWrong = isGuessed && !targetWord.includes(letter);

                return (
                  <motion.button
                    key={letter}
                    className={`hm-key-btn ${isCorrect ? 'correct' : ''} ${
                      isWrong ? 'wrong' : ''
                    }`}
                    disabled={isGuessed || isGameOver}
                    onClick={() => handleGuess(letter)}
                    whileHover={!isGuessed && !isGameOver ? { scale: 1.08, y: -2 } : {}}
                    whileTap={!isGuessed && !isGameOver ? { scale: 0.94 } : {}}
                  >
                    {letter}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </main>

      {/* ====================================================
          GAME OVER / VICTORY MODAL WITH ANIMATION
          ==================================================== */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="hm-result-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="hm-result-card"
              initial={{ scale: 0.84, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.84 }}
              transition={{ type: 'spring', damping: 15, stiffness: 180 }}
            >
              <div style={{ fontSize: '3.6rem', marginBottom: '0.6rem' }}>
                {isWon ? '🏆' : '💀'}
              </div>

              <h2 className={`hm-result-title ${isWon ? 'win' : 'loss'}`}>
                {isWon ? 'WORD DECODED!' : 'SYSTEM OVERRIDE!'}
              </h2>

              <p style={{ color: 'var(--hm-muted)', fontSize: '0.95rem' }}>
                {isWon
                  ? `Outstanding engineering intuition! Solved with ${chancesRemaining} chance${
                      chancesRemaining > 1 ? 's' : ''
                    } remaining.`
                  : 'Out of chances. The cipher has reset for your next challenge.'}
              </p>

              {/* Reveal Target Word */}
              <div className="hm-word-reveal-box">
                <div className="hm-word-reveal-label">THE MYSTERY CIPHER WAS</div>
                <div className="hm-word-reveal-target">{targetWord}</div>
                <div
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--hm-muted)',
                    marginTop: '0.4rem',
                    lineHeight: '1.4',
                  }}
                >
                  {currentWordObj.hint}
                </div>
              </div>

              <motion.button
                className="hm-play-again-btn"
                onClick={startNewGame}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <FaRedo /> PLAY NEXT WORD
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
