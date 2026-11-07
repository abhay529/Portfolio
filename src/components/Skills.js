import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoHardwareChipOutline,
  IoPencilOutline,
  IoCodeSlashOutline,
  IoColorPaletteOutline,
  IoLayersOutline,
  IoPhonePortraitOutline,
  IoGitBranchOutline,
  IoSparklesOutline,
  IoSettingsOutline,
  IoPulseOutline,
  IoFlashOutline,
} from 'react-icons/io5';
import { FiCpu as IoCpuOutline } from 'react-icons/fi';
import './Skills.css';

const technicalSkills = [
  // Design
  {
    name: 'Figma / Framer / Spline',
    level: 80,
    icon: IoPencilOutline,
    color: 'var(--pop-orange)',
    category: 'Design',
  },
  {
    name: 'UI/UX Design',
    level: 75,
    icon: IoColorPaletteOutline,
    color: 'var(--pop-crimson)',
    category: 'Design',
  },
  {
    name: 'Prototyping & Wireframing',
    level: 75,
    icon: IoLayersOutline,
    color: 'var(--pop-yellow)',
    category: 'Design',
  },

  // Development
  {
    name: 'HTML / CSS / JavaScript',
    level: 60,
    icon: IoCodeSlashOutline,
    color: 'var(--pop-cobalt)',
    category: 'Development',
  },
  {
    name: 'Responsive Web Design',
    level: 55,
    icon: IoPhonePortraitOutline,
    color: 'var(--pop-orange)',
    category: 'Development',
  },
  {
    name: 'Git & GitHub',
    level: 50,
    icon: IoGitBranchOutline,
    color: 'var(--pop-yellow)',
    category: 'Development',
  },
  {
    name: 'AI Tools & Workflows',
    level: 60,
    icon: IoSparklesOutline,
    color: 'var(--pop-yellow)',
    category: 'Development',
  },

  // Electronics & Embedded Systems
  {
    name: 'IoT (ESP8266 / ESP32)',
    level: 45,
    icon: IoHardwareChipOutline,
    color: 'var(--pop-orange)',
    category: 'Electronics',
  },
  {
    name: 'Raspberry Pi 3 & 5',
    level: 50,
    icon: IoHardwareChipOutline,
    color: 'var(--pop-cobalt)',
    category: 'Electronics',
  },
  {
    name: 'Python & OpenCV',
    level: 35,
    icon: IoCodeSlashOutline,
    color: 'var(--pop-yellow)',
    category: 'Electronics',
  },
  {
    name: 'Microprocessors & Microcontrollers',
    level: 45,
    icon: IoCpuOutline,
    color: 'var(--pop-orange)',
    category: 'Electronics',
  },

  // Core ECE
  {
    name: 'Control Systems',
    level: 45,
    icon: IoSettingsOutline,
    color: 'var(--pop-cobalt)',
    category: 'Core ECE',
  },
  {
    name: 'Signals & Systems',
    level: 50,
    icon: IoPulseOutline,
    color: 'var(--pop-crimson)',
    category: 'Core ECE',
  },
  {
    name: 'Digital Electronics',
    level: 50,
    icon: IoGitBranchOutline,
    color: 'var(--pop-yellow)',
    category: 'Core ECE',
  },
  {
    name: 'Analog Electronics',
    level: 40,
    icon: IoFlashOutline,
    color: 'var(--pop-orange)',
    category: 'Core ECE',
  },
];

const softSkills = [
  'LEADERSHIP',
  'DESIGN SYSTEMS',
  'RAPID PROTOTYPING',
  'MICRO-INTERACTIONS',
  'TEAM WORK',
  'EVENT ORCHESTRATION',
];

const CATEGORIES = ['ALL', 'Design', 'Development', 'Electronics', 'Core ECE'];

// Helper to determine RPG Tier designation
const getTierBadge = (level) => {
  if (level >= 80) return { label: 'TIER V', rank: 'MASTER' };
  if (level >= 70) return { label: 'TIER IV', rank: 'EXPERT' };
  if (level >= 50) return { label: 'TIER III', rank: 'PROFICIENT' };
  if (level >= 40) return { label: 'TIER II', rank: 'OPERATIONAL' };
  return { label: 'TIER I', rank: 'APPRENTICE' };
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredSkills = technicalSkills.filter((s) => {
    if (activeCategory === 'ALL') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="skills" className="skills-tree-section">
      <div className="skills-hud-container">
        {/* ====================================================
            HEADER CLUSTER (RPG Skill Tree / Loadout HUD Vibe)
            ==================================================== */}
        <div className="skills-hud-header">
          <div className="skills-hud-eyebrow">
            <span className="hud-badge-pill">SECTION // 04</span>
            <span className="hud-telemetry-tag">✦ RPG SKILL TREE &amp; LOADOUT</span>
          </div>

          <motion.h2
            className="skills-hud-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            SKILLS &amp; <span className="highlight-text">CAPABILITIES</span>
          </motion.h2>

          <p className="skills-hud-desc">
            A battle-tested technical matrix bridging core electronics, embedded edge hardware,
            and high-velocity digital design systems.
          </p>

          {/* Tactical Telemetry Strip */}
          <div className="skills-hud-stats-bar">
            <div className="hud-stat-cell">
              <span className="stat-label">DISCIPLINES</span>
              <span className="stat-val">4 DOMAINS</span>
            </div>
            <div className="hud-stat-cell">
              <span className="stat-label">TOTAL NODES</span>
              <span className="stat-val">15 SKILLS</span>
            </div>
            <div className="hud-stat-cell">
              <span className="stat-label">CURRENT FOCUS</span>
              <span className="stat-val accent">GATE &amp; CORE ECE</span>
            </div>
          </div>

          {/* ====================================================
              DISCIPLINE FILTER TABS (God of War / Aloy Category Menu)
              ==================================================== */}
          <div className="skills-category-tabs">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'ALL'
                  ? technicalSkills.length
                  : technicalSkills.filter((s) => s.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  className={`skills-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span className="tab-name">{cat}</span>
                  <span className="tab-count">[{count}]</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTabGlow"
                      className="tab-active-indicator"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            SKILLS LOADOUT GRID (Responsive 4-col PC / 2-col Mobile)
            ==================================================== */}
        <motion.div layout className="skills-loadout-grid">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const tier = getTierBadge(skill.level);

              return (
                <motion.div
                  key={skill.name}
                  layout
                  className="skill-loadout-card"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Tactical Corner Accent Marks */}
                  <span className="card-bracket tl">⌜</span>
                  <span className="card-bracket br">⌟</span>

                  {/* Top Meta Bar */}
                  <div className="skill-card-top-bar">
                    <span className="skill-cat-chip" data-cat={skill.category}>
                      {skill.category}
                    </span>
                    <div className="skill-tier-badge" title={`Rank: ${tier.rank}`}>
                      <span className="tier-label">{tier.label}</span>
                    </div>
                  </div>

                  {/* Middle Main Content */}
                  <div className="skill-card-body">
                    <div
                      className="skill-icon-node"
                      style={{ '--glow-color': skill.color }}
                    >
                      <skill.icon />
                    </div>

                    <div className="skill-meta-info">
                      <h3 className="skill-name">{skill.name}</h3>
                      <div className="skill-rank-text">{tier.rank}</div>
                    </div>
                  </div>

                  {/* Calibrated LED / Segmented Meter */}
                  <div className="skill-meter-assembly">
                    <div className="meter-header">
                      <span className="meter-label">PROFICIENCY</span>
                      <span className="meter-percentage">{skill.level}%</span>
                    </div>

                    <div className="meter-track">
                      <motion.div
                        className="meter-fill-bar"
                        style={{ background: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                      {/* Calibrated Tick Marks */}
                      <div className="meter-ticks">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ====================================================
            PASSIVE TRAITS & EXECUTION MINDSET DECK
            ==================================================== */}
        <motion.div
          className="skills-traits-deck"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="traits-info-col">
            <span className="traits-sub-tag">✦ OPERATIONAL METHODOLOGY</span>
            <h4 className="traits-deck-title">Passive Buffs &amp; Attributes</h4>
            <p className="traits-deck-desc">
              Core execution principles developed across college leadership, hardware experimentation,
              and iterative product engineering.
            </p>
          </div>

          <div className="traits-chip-cloud">
            {softSkills.map((trait, idx) => (
              <motion.div
                key={trait}
                className="trait-badge-chip"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 350 }}
              >
                <span className="trait-num">0{idx + 1}</span>
                <span className="trait-text">{trait}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
