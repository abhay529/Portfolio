import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaEye } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'AI Face Detection Attendance System',
      description: 'Developed an intelligent attendance system using Raspberry Pi with AI-powered face detection technology. Currently planning final year enhancements.',
      technologies: ['Raspberry Pi', 'Python', 'OpenCV', 'AI/ML'],
      category: 'IoT & AI',
      status: 'Compleated'
    },
    {
      title: 'VeloCart Payment App',
      description: 'Designed a comprehensive UI/UX for an e-commerce payment application with intuitive user flows and modern interface design.',
      technologies: ['Figma', 'UI/UX Design', 'Prototyping'],
      category: 'UI/UX Design',
      status: 'Completed'
    },
    {
      title: 'Neuromesh Website',
      description: 'Created during IoT & Web Design internship at IIIT Kottayam. Complete website design and development using modern web technologies.',
      technologies: ['Figma', 'Web Design', 'ESP8266', 'IoT'],
      category: 'Web & IoT',
      status: 'Completed'
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
    <section id="projects" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Featured Projects
        </motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="project-header">
                <div className="project-category">{project.category}</div>
                <div className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </div>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="project-actions">
                <motion.button
                  className="action-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div className="projects-note" variants={itemVariants}>
          <p>
            🚀 More projects and detailed case studies coming soon! 
            Currently working on enhancing existing projects and developing new innovative solutions.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
