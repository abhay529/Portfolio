import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaPaperPlane,
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:abhayappu8@gmail.com?subject=Transmission from ${formData.name}&body=${encodeURIComponent(
      formData.message
    )}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  const contactPods = [
    {
      icon: FaEnvelope,
      label: 'Direct Transmission',
      value: 'abhayappu8@gmail.com',
      link: 'mailto:abhayappu8@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Voice Telephony',
      value: '+91 8136977264',
      link: 'tel:+918136977264',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Current Coordinates',
      value: 'Kannur, Kerala, India',
      link: 'https://maps.app.goo.gl/Rr5mPECkoFMWxSes6',
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedin, link: 'https://linkedin.com/in/abhay-m-98710b287' },
    { name: 'Instagram', icon: FaInstagram, link: 'https://www.instagram.com/_abh_yyy__/' },
    { name: 'Twitter / X', icon: FaTwitter, link: 'https://twitter.com/Akabhay07' },
  ];

  return (
    <section id="contact" className="contact-mashup-section">
      <div className="contact-mashup-container">
        {/* Header */}
        <div className="contact-poster-header">
          <div className="contact-pill-tag">
            <span>✦</span> TRANSMISSION GATEWAY <span>✦</span>
          </div>

          <h2 className="contact-poster-title">
            Have An Idea? <br />
            <span className="colored-word">Let's Build It.</span>
          </h2>

          <p className="contact-sub-text">
            Open for core electronics discussions, embedded systems collaborations, GATE preparation exchanges, and engineering opportunities. Send a transmission or connect through social channels.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="contact-split-grid">
          {/* Left: Form */}
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="contact-form-field">
                <label className="field-label" htmlFor="name">
                  01. Your Name / Company
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Rivera"
                  className="comic-input"
                />
              </div>

              <div className="contact-form-field">
                <label className="field-label" htmlFor="email">
                  02. Transmission Address (Email)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="alex@domain.com"
                  className="comic-input"
                />
              </div>

              <div className="contact-form-field">
                <label className="field-label" htmlFor="message">
                  03. The Message / Vision
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your product, project, or concept..."
                  className="comic-input comic-textarea"
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                <span>Send Transmission</span>
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>

          {/* Right: Pods & Socials */}
          <div className="contact-direct-column">
            {contactPods.map((pod, i) => (
              <motion.a
                key={pod.label}
                href={pod.link}
                target={pod.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="contact-pod-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="pod-icon-box">
                  <pod.icon />
                </div>
                <div>
                  <div className="pod-label">{pod.label}</div>
                  <div className="pod-val">{pod.value}</div>
                </div>
              </motion.a>
            ))}

            {/* Social Pods */}
            <motion.div
              className="social-buttons-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="social-box-title">Social Frequency</div>
              <div className="social-pills-row">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-btn"
                  >
                    <s.icon />
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
