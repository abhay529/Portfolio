import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import './Hero.css';
import abhayImg from '../assets/ak.png'; // update this path and filename accordingly

// Define motion animation variants here:
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const Hero = () => {
  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-image-container" variants={itemVariants}>
          <img src={abhayImg} alt="Abhay M" className="hero-image" />
        </motion.div>
        <motion.div className="hero-text" variants={itemVariants}>
          <motion.h1 className="hero-title" variants={itemVariants}>
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
            <a
              href="https://1drv.ms/w/c/d0f52b460b9f2705/EQR_m5CSNTlPk2bgxDmk3u8Bu42ETlte-gqc6bJgMe1nQA?e=HfFA0L"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
            <a href="#projects" className="btn-secondary">
              View Projects
            </a>
          </motion.div>
          {/* Professional social icons row, centered and spaced */}
          <motion.div className="hero-social-icons" variants={itemVariants}>
            <a href="https://linkedin.com/in/abhay-m-98710b287" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com/ak.me_" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/Akabhay07" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaTwitter />
            </a>
            <a href="https://github.com/abhay529" target="_blank" rel="noopener noreferrer" title="GitHub">
              <FaGithub />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
