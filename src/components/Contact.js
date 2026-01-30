import React, { useState } from 'react';
import { motion} from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';
import { IoTerminalOutline } from 'react-icons/io5';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:abhayappu8@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    { icon: FaEnvelope, value: 'abhayappu8@gmail.com', link: 'mailto:abhayappu8@gmail.com' },
    { icon: FaPhone, value: '+91 8136977264', link: 'tel:+918136977264' },
    { icon: FaMapMarkerAlt, value: 'Kannur, Kerala, India', link: 'https://maps.app.goo.gl/Rr5mPECkoFMWxSes6' }
  ];

  const socialLinks = [
    { icon: FaLinkedin, link: 'https://linkedin.com/in/abhay-m-98710b287' },
    { icon: FaInstagram, link: 'https://instagram.com/ak.me_' },
    { icon: FaTwitter, link: 'https://twitter.com/Akabhay07' }
  ];

  return (
    <section id="contact" className="contact-modern">
      <div className="contact-container">
        <motion.div
          className="contact-header-ui"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="ui-terminal-tag"><IoTerminalOutline /> <span>STAY_CONNECTED</span></div>
          <h2 className="modern-title">READY TO <span>START?</span></h2>
          <p className="modern-subtitle">
            Let's build something exceptional. Send a transmission or find me on socials.
          </p>
        </motion.div>

        <div className="contact-layout-centered">
          {/* Holographic Form Card */}
          <motion.div
            className="modern-form-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-glow"></div>
            <form className="glass-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <span className="dot pink"></span>
                <span className="dot cyan"></span>
                <span className="dot theme"></span>
              </div>

              <div className="input-field">
                <label>IDENTIFIER</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>PROTO_MAIL</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>TRANSMISSION</label>
                <textarea
                  name="message"
                  placeholder="How can I help you today?"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="neon-submit-btn">
                SEND MESSAGE <FaPaperPlane />
              </button>
            </form>
          </motion.div>

          {/* Floating Info Pods */}
          <div className="info-pods-container">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.link}
                className="info-pod"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="pod-icon"><info.icon /></div>
                <span>{info.value}</span>
              </motion.a>
            ))}

            <div className="social-pod-row">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  className="social-pod"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="contact-bg-glow cyan"></div>
      <div className="contact-bg-glow pink"></div>
    </section>
  );
};

export default Contact;
