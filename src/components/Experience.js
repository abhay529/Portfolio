import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward, FaUsers } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      type: 'internship',
      title: 'UI Engineering / Full Stack Intern',
      company: 'IMIOT Technolabs LLP',
      duration: 'June - November 2023 (90 Days)',
      description: 'Focused on HTML, CSS, JavaScript, and Figma. Worked on both UI and Fullstack development projects.',
      icon: FaBriefcase
    },
    {
      type: 'internship',
      title: 'IoT & Web Design Intern',
      company: 'Gyan Technolabs (IIIT Kottayam)',
      duration: 'Hybrid Mode',
      description: 'Created complete website in Figma and worked on ESP8266 for IoT implementation. Developed Neuromesh website.',
      icon: FaBriefcase
    }
  ];

  const ieeeRoles = [
    {
      title: 'IEEE Design Lead',
      duration: 'Feb 2025 - Present',
      icon: FaUsers
    },
    {
      title: 'Designer',
      duration: 'Sep 2023 - Feb 2025',
      icon: FaUsers
    },
    {
      title: 'PES Secretary',
      duration: 'Jun 2022 - Aug 2023',
      icon: FaUsers
    }
  ];

  const certifications = [
    'UI/UX Launchpad - IMIOT Technolabs',
    '90 Days Full Stack - IMIOT Technolabs',
    'Robotics - Eight Planes',
    'Be10x AI Workshop',
    'AWS APAC Simulation - Solutions Architecture',
    'Tata Cybersecurity Analyst Simulation'
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="experience" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Experience & Achievements
        </motion.h2>
        
        <div className="experience-content">
          <motion.div className="experience-section" variants={itemVariants}>
            <h3><FaBriefcase /> Internships</h3>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  <div className="timeline-marker">
                    <exp.icon />
                  </div>
                  <div className="timeline-content">
                    <h4>{exp.title}</h4>
                    <p className="company">{exp.company}</p>
                    <p className="duration">{exp.duration}</p>
                    <p className="description">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="ieee-section" variants={itemVariants}>
            <h3><FaUsers /> IEEE Leadership</h3>
            <div className="roles-grid">
              {ieeeRoles.map((role, index) => (
                <motion.div
                  key={index}
                  className="role-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <role.icon className="role-icon" />
                  <h4>{role.title}</h4>
                  <p>{role.duration}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="certifications-section" variants={itemVariants}>
            <h3><FaAward /> Key Certifications</h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="cert-item"
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                >
                  <FaAward className="cert-icon" />
                  <span>{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
