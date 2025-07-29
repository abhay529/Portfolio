import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './About.css';

const About = () => {
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          About Me
        </motion.h2>
        
        <div className="about-content">
          <motion.div className="about-text" variants={itemVariants}>
            <p>
              I'm a passionate <strong>UI/UX Designer</strong> and <strong>Electronics Engineering</strong> student 
              currently in my final year at College of Engineering Thalassery. With a keen eye for design 
              and a solid foundation in technology, I bridge the gap between aesthetic appeal and functional innovation.
            </p>
            
            <p>
              My journey spans across <strong>90% proficiency in Figma</strong>, full-stack development, 
              and IoT implementations. I've had the privilege of working with industry leaders and 
              contributing to meaningful projects that impact user experiences.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <FaGraduationCap className="highlight-icon" />
                <div>
                  <h4>Education</h4>
                  <p>B.Tech ECE - Final Year</p>
                  <small>College of Engineering Thalassery</small>
                </div>
              </div>
              
              <div className="highlight-item">
                <FaMapMarkerAlt className="highlight-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Kannur, Kerala</p>
                  <small>Currently in Pala</small>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="about-info" variants={itemVariants}>
            <div className="info-card">
              <h3>Quick Info</h3>
              <div className="info-items">
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <span>abhayappu8@gmail.com</span>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <span>+91 8136977264</span>
                </div>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item">
                <h4>90+</h4>
                <p>Days of Internship Experience</p>
              </div>
              <div className="stat-item">
                <h4>10+</h4>
                <p>Certifications Earned</p>
              </div>
              <div className="stat-item">
                <h4>3+</h4>
                <p>Major Projects Completed</p>
              </div>
              <div className="stat-item">
                <h4>Multiple</h4>
                <p>IEEE Leadership Roles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
