import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';
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
    // Here you would typically handle form submission
    const mailtoLink = `mailto:abhayappu8@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'abhayappu8@gmail.com',
      link: 'mailto:abhayappu8@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 8136977264',
      link: 'tel:+918136977264'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Kannur, Kerala (Currently in Pala)',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      link: 'https://linkedin.com/in/abhay-m-98710b287',
      color: '#0077b5'
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      link: 'https://instagram.com/ak.me_',
      color: '#e4405f'
    },
    {
      icon: FaTwitter,
      label: 'Twitter',
      link: 'https://twitter.com/Akabhay07',
      color: '#1da1f2'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Let's Connect
        </motion.h2>
        
        <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <h3>Get in Touch</h3>
            <p className="contact-description">
              I'm always open to discussing new opportunities, creative projects, 
              and ways we can collaborate. Let's create something amazing together!
            </p>
            
            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-item"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  <info.icon className="contact-icon" />
                  <div className="contact-text">
                    <span className="contact-label">{info.label}</span>
                    {info.link ? (
                      <a href={info.link} className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact-value">{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="social-section">
              <h4>Follow Me</h4>
              <div className="social-links-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon />
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div className="contact-form-section" variants={itemVariants}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send a Message</h3>
              
              <motion.div
                className="form-group"
                variants={itemVariants}
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              
              <motion.div
                className="form-group"
                variants={itemVariants}
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              
              <motion.div
                className="form-group"
                variants={itemVariants}
                whileFocus={{ scale: 1.02 }}
              >
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                className="submit-btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
