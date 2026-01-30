import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaAward, FaUsers } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'UI Engineering / Full Stack Intern',
      company: 'IMIOT Technolabs LLP',
      duration: 'JUN - NOV 2023',
      description: 'Architected UI workflows and fullstack systems using Figma and modern JS frameworks.',
      icon: FaBriefcase
    },
    {
      title: 'IoT & Web Design Intern',
      company: 'Gyan Technolabs (IIIT Kottayam)',
      duration: 'JUN - JUL 2025',
      description: 'Integrated hardware with web portals via ESP8266 and OpenCV implementations.',
      icon: FaBriefcase
    }
  ];

  const ieeeRoles = [
    { title: 'IEEE Design Lead', duration: '2025 - Present' },
    { title: 'Designer', duration: '2023 - 2025' },
    { title: 'PES Secretary', duration: '2022 - 2023' }
  ];

  const certifications = [
    'IoT & Web Dev (IIIT Kottayam)', 'UI/UX Launchpad', '90 Days Full Stack',
    'NASA Space Apps Challenge', 'AWS Solutions Architecture', 'Cybersecurity Analyst'
  ];

  return (
    <section id="experience" className="experience-modern">
      <div className="experience-container">
        <motion.div
          className="experience-header-ui"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="modern-title">CAREER <span>CHRONOLOGY</span></h2>
          <p className="modern-subtitle">Strategic growth through internships and leadership roles.</p>
        </motion.div>

        <div className="experience-grid-main">
          {/* Chrono Stripes Section */}
          <div className="experience-chrono-wrap">
            <h3 className="section-label-cyber">PROFESSIONAL_STACK</h3>
            <div className="chrono-list">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  className="chrono-item"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="chrono-year-bg">{exp.duration.split(' - ')[1] || exp.duration.split(' ')[2]}</div>
                  <div className="chrono-indicator">
                    <div className="chrono-dot"></div>
                    <div className="chrono-line-segment"></div>
                  </div>
                  <div className="chrono-content">
                    <span className="chrono-date-tag">{exp.duration}</span>
                    <div className="chrono-header">
                      <div className="chrono-icon"><exp.icon /></div>
                      <div className="chrono-title-group">
                        <h4>{exp.title}</h4>
                        <span className="chrono-company">{exp.company}</span>
                      </div>
                    </div>
                    <p>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Roles & Certs */}
          <div className="exp-side-column">
            <div className="side-block">
              <h3 className="section-label-cyber">LEADERSHIP_NODES</h3>
              <div className="roles-stack">
                <div className="signal-line-vertical"></div>
                {ieeeRoles.map((role, i) => (
                  <motion.div
                    key={i}
                    className="tactical-node-card"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="node-port"></div>
                    <div className="node-id">0{i + 1}</div>
                    <div className="node-content-main">
                      <div className="node-icon-hex"><FaUsers /></div>
                      <div className="node-data-body">
                        <span className="role-title-main">{role.title}</span>
                        <span className="role-date-tag">{role.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="side-block">
              <h3 className="section-label-cyber">VALIDATED_CREDS</h3>
              <div className="certs-badge-grid">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    className="cert-badge"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaAward /> <span>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
