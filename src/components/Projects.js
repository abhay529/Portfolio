import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaEye } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'AI Face Detection Attendance System',
      description:
        'Developed an intelligent attendance system using Raspberry Pi with AI-powered face detection technology. This system automates attendance tracking in classrooms, enhancing efficiency and accuracy.',
      technologies: ['Raspberry Pi', 'Python', 'OpenCV', 'AI/ML'],
      category: 'Mini Project',
      status: 'Completed',
      liveLink: 'https://github.com/abhay529/AI_Face_Attendance_system_usingPi3.git',
    },
    {
      title: 'VeloCart - eCommerce App',
      description:
        'Designed a comprehensive UI/UX for an e-commerce application with intuitive user flows and modern interface design. This project showcases my skills in creating user-friendly e-commerce solutions.',
      technologies: ['Figma', 'UI/UX Design', 'Prototyping'],
      category: 'UI/UX Design',
      status: 'Completed',
      liveLink:
        'https://www.figma.com/proto/qP0KBOW5WWwycx8goA489r/Works?page-id=0%3A1&node-id=3-26135&viewport=4789%2C2106%2C0.2&t=aWmQpthZecIbND2c-1&scaling=contain&content-scaling=fixed&starting-point-node-id=3%3A26127&show-proto-sidebar=1',
    },
    {
      title: 'Neuromesh Website',
      description:
        'Created during IoT & Web Design internship at IIIT Kottayam. Complete website design and development using modern web technologies. This project showcases my skills in web design and IoT integration.',
      technologies: ['Figma', 'Web Design', 'ESP8266', 'IoT'],
      category: 'Internship Project',
      status: 'Completed',
      liveLink:
        'https://www.figma.com/proto/qP0KBOW5WWwycx8goA489r/Works?page-id=219%3A287&node-id=433-5132&viewport=-2218%2C136%2C0.11&t=ZGlhoPlU4jJGro8K-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=433%3A5132&show-proto-sidebar=1',
    },
    // New projects
    {
      title: 'Seminar: Neuromorphic Retina on FPGA',
      description:
        'Presented a seminar based on a research paper about neuromorphic retina systems implemented on FPGA hardware, focusing on innovative hardware neural network designs for visual processing.',
      technologies: ['FPGA', 'Neuromorphic Engineering', 'Research', 'Presentation'],
      category: 'Seminar',
      status: 'Completed',
      liveLink: '#',
    },
    {
      title: 'Fresha - Freelance UI/UX Project',
      description:
        'Designed an intuitive and visually appealing UI/UX for a pedicure manicure booking app, focusing on seamless user experience for appointment scheduling and service discovery.',
      technologies: ['Figma', 'UI/UX Design', 'Prototyping'],
      category: 'Freelance Project',
      status: 'Completed',
      liveLink: 'https://www.figma.com/proto/qP0KBOW5WWwycx8goA489r/Works?page-id=0%3A1&node-id=3-28397&viewport=1854%2C1228%2C0.12&t=ETXdE7q2N1OEsztK-1&scaling=contain&content-scaling=fixed&starting-point-node-id=3%3A28579&show-proto-sidebar=1',
    },
    {
      title: 'Apple Airpod Clone - Micro Interaction Study',
      description:
        'Created a detailed Figma prototype clone of Apple Airpods focusing on micro interactions to study user engagement and interface animation.',
      technologies: ['Figma', 'UI/UX Design', 'Micro Interaction'],
      category: 'Study Project',
      status: 'Completed',
      liveLink: 'https://www.figma.com/proto/qP0KBOW5WWwycx8goA489r/Works?page-id=0%3A1&node-id=3-32836&viewport=379%2C478%2C0.03&t=Fr3q3isXfCjVylVR-1&scaling=contain&content-scaling=fixed&starting-point-node-id=3%3A32621&show-proto-sidebar=1',
    },
  ];

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
      transition: { duration: 0.5 },
    },
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
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="project-header">
                <div className="project-category">{project.category}</div>
                <div
                  className={`project-status ${project.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
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
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> View Site
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="projects-note" variants={itemVariants}>
          <p>
            🚀 More projects and detailed case studies coming soon! Currently
            working on enhancing existing projects and developing new innovative
            solutions.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
