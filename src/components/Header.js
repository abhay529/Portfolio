import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Header.css';  // Update from Header.css to Hero.css if you keep styles separate

// Import your image
import abhayImg from '../assets/ak.png';  // Make sure the path matches your project

const Hero = () => {
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
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-text" variants={itemVariants}>
          <motion.h1 className="hero-title">
            <span className="wave">👋</span> Hi, I'm{' '}
            <span className="name-highlight">Abhay M</span>
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            UI/UX Designer & Electronics Engineering Student
          </motion.p>
          
          <motion.p className="hero-description" variants={itemVariants}>
            Passionate about creating intuitive digital experiences and innovative IoT solutions. 
            Currently pursuing B.Tech in ECE at College of Engineering Thalassery.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
            <a href="#projects" className="btn-secondary">
              View Projects
            </a>
          </motion.div>
        </motion.div>

        {/* Added the image on the right side */}
        <motion.div className="hero-image-container" variants={itemVariants}>
          <img src={abhayImg} alt="Abhay M" className="hero-image" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="social-links"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a href="https://linkedin.com/in/abhay-m-98710b287" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/ak.me_" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://twitter.com/Akabhay07" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="mailto:abhayappu8@gmail.com">
          <FaEnvelope />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
