import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaCheck,
} from 'react-icons/fa';
import './Contact.css';

// Hatched Architectural Matrix SVG Icon (from reference image)
const ArchitecturalMatrixIcon = () => (
  <svg
    className="arch-matrix-icon"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Top Left Quadrant: Diagonal Hatches */}
    <line x1="2" y1="6" x2="20" y2="6" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="2" y1="12" x2="20" y2="12" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="2" y1="18" x2="20" y2="18" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />

    {/* Top Right Quadrant: Cross Slanted Lines */}
    <line x1="28" y1="4" x2="44" y2="20" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="34" y1="4" x2="44" y2="14" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="28" y1="10" x2="38" y2="20" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />

    {/* Bottom Left Quadrant: Angled Diagonal */}
    <line x1="4" y1="44" x2="20" y2="28" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="4" y1="38" x2="14" y2="28" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="44" x2="20" y2="34" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />

    {/* Bottom Right Quadrant: Vertical Hatches */}
    <line x1="28" y1="28" x2="28" y2="44" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="34" y1="28" x2="34" y2="44" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="28" x2="40" y2="44" stroke="#11141A" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Contact = () => {
  const [activeMode, setActiveMode] = useState('quick'); // 'quick' | 'detailed'
  const [quickInput, setQuickInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) {
      setErrorText('Please enter your email or message to transmit.');
      return;
    }
    setErrorText('');
    setIsSubmitted(true);

    const isEmail = quickInput.includes('@');
    const mailto = `mailto:abhayappu8@gmail.com?subject=Transmission from Portfolio Visitor&body=${encodeURIComponent(
      quickInput
    )}%0D%0A%0D%0A${isEmail ? `Sender Email: ${quickInput}` : ''}`;

    setTimeout(() => {
      window.location.href = mailto;
      setIsSubmitted(false);
      setQuickInput('');
    }, 900);
  };

  const handleDetailedSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      setErrorText('Email and message fields are required.');
      return;
    }
    setErrorText('');
    setIsSubmitted(true);

    const mailto = `mailto:abhayappu8@gmail.com?subject=Transmission from ${formData.name || 'Visitor'}&body=${encodeURIComponent(
      formData.message
    )}%0D%0A%0D%0AFrom: ${formData.email}`;

    setTimeout(() => {
      window.location.href = mailto;
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 900);
  };

  const directTelemetries = [
    {
      label: 'DIRECT INBOX',
      value: 'abhayappu8@gmail.com',
      link: 'mailto:abhayappu8@gmail.com',
      icon: FaEnvelope,
    },
    {
      label: 'VOICE LINE',
      value: '+91 8136977264',
      link: 'tel:+918136977264',
      icon: FaPhone,
    },
    {
      label: 'COORDINATES',
      value: 'Kannur / Thalassery, Kerala, IN',
      link: 'https://maps.app.goo.gl/Rr5mPECkoFMWxSes6',
      icon: FaMapMarkerAlt,
    },
  ];

  const socialNodes = [
    { name: 'LinkedIn', link: 'https://linkedin.com/in/abhay-m-98710b287', icon: FaLinkedin },
    { name: 'GitHub', link: 'https://github.com/Akabhay07', icon: FaGithub },
    { name: 'Twitter / X', link: 'https://twitter.com/Akabhay07', icon: FaTwitter },
    { name: 'Instagram', link: 'https://www.instagram.com/_abh_yyy__/', icon: FaInstagram },
  ];

  return (
    <section id="contact" className="contact-editorial-section">
      <div className="contact-editorial-container">
        {/* ====================================================
            HEADER CLUSTER (Inspired by Reference Image Typography)
            ==================================================== */}
        <div className="contact-ref-header">
          <div className="arch-header-lockup">
            <ArchitecturalMatrixIcon />
            <div className="arch-header-text">
              <span className="arch-sub-tag">ABHAY M. // TRANSMISSION NODE</span>
              <h2 className="arch-main-title">
                THE CONTENT<br />ARCHITECTURE
              </h2>
            </div>
          </div>

          <p className="arch-narrative">
            Direct frequency for engineering collaborations, GATE preparation exchanges,
            embedded firmware architectures, or creative technical experiments.
          </p>
        </div>

        {/* ====================================================
            TRANSMISSION TERMINAL (Reference-Inspired Dispatcher)
            ==================================================== */}
        <div className="arch-dispatcher-card">
          {/* Mode Switcher Tabs */}
          <div className="dispatcher-tabs">
            <button
              className={`disp-tab ${activeMode === 'quick' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('quick');
                setErrorText('');
              }}
            >
              <span>⚡</span> QUICK DISPATCH
            </button>
            <button
              className={`disp-tab ${activeMode === 'detailed' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('detailed');
                setErrorText('');
              }}
            >
              <span>✉️</span> FULL MESSAGE
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeMode === 'quick' ? (
              /* MODE 1: QUICK DISPATCH (Exact Reference UI with Notched Ticket Button) */
              <motion.form
                key="quick"
                className="quick-dispatch-form"
                onSubmit={handleQuickSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="quick-input-assembly">
                  <input
                    type="text"
                    className="arch-text-input"
                    placeholder="your@email.com or message..."
                    value={quickInput}
                    onChange={(e) => {
                      setQuickInput(e.target.value);
                      if (errorText) setErrorText('');
                    }}
                  />

                  {/* The Iconic Scalloped Ticket Notch Button */}
                  <button type="submit" className="ticket-notched-btn" disabled={isSubmitted}>
                    <span className="ticket-half">
                      {isSubmitted ? 'SENT' : 'TRANSMIT'}
                    </span>
                    <span className="ticket-scallop-notch" />
                    <span className="ticket-half">
                      {isSubmitted ? <FaCheck /> : 'SIGNAL'}
                    </span>
                  </button>
                </div>

                <div className="arch-helper-line">
                  {errorText ? (
                    <span className="helper-error">{errorText}</span>
                  ) : (
                    <span className="helper-muted">
                      Enter your email or brief to initiate instant transmission.
                    </span>
                  )}
                </div>
              </motion.form>
            ) : (
              /* MODE 2: DETAILED TRANSMISSION FORM */
              <motion.form
                key="detailed"
                className="detailed-dispatch-form"
                onSubmit={handleDetailedSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="detailed-grid">
                  <div className="detailed-field">
                    <label className="field-caption">01. CALLSIGN / NAME</label>
                    <input
                      type="text"
                      className="arch-text-input"
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="detailed-field">
                    <label className="field-caption">02. TRANSMISSION ADDRESS</label>
                    <input
                      type="email"
                      className="arch-text-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="detailed-field">
                  <label className="field-caption">03. MESSAGE / BRIEF</label>
                  <textarea
                    className="arch-text-input arch-textarea"
                    placeholder="Tell me about your hardware concept, product inquiry, or project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div className="detailed-action-row">
                  <button type="submit" className="ticket-notched-btn wide" disabled={isSubmitted}>
                    <span className="ticket-half">
                      {isSubmitted ? 'DISPATCHED' : 'SEND'}
                    </span>
                    <span className="ticket-scallop-notch" />
                    <span className="ticket-half">
                      {isSubmitted ? <FaCheck /> : 'TRANSMISSION'}
                    </span>
                  </button>

                  {errorText && <span className="helper-error">{errorText}</span>}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ====================================================
            TACTICAL TELEMETRY NODES (Compact, Mobile-Fit Badges)
            ==================================================== */}
        <div className="arch-telemetry-row">
          {directTelemetries.map((node) => (
            <a
              key={node.label}
              href={node.link}
              target={node.link.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="contact-pod-badge"
            >
              <div className="pod-icon-wrap">
                <node.icon />
              </div>
              <div className="pod-content">
                <span className="pod-title">{node.label}</span>
                <span className="pod-detail">{node.value}</span>
              </div>
            </a>
          ))}
        </div>

        {/* ====================================================
            SOCIAL FREQUENCY NODES
            ==================================================== */}
        <div className="arch-social-strip">
          <span className="social-strip-label">FREQUENCY CHANNELS:</span>
          <div className="social-chips-deck">
            {socialNodes.map((s) => (
              <a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-ref-pill"
              >
                <s.icon className="social-icon" />
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
