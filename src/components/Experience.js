import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaAward, FaUsers } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    title: 'UI Engineering / Full Stack Intern',
    company: 'IMIOT Technolabs LLP',
    duration: 'JUN - NOV 2023',
    description:
      'Architected end-to-end design systems and client-facing web portals in Figma and modern JavaScript frameworks. Streamlined UI delivery cycles and component reusability across engineering teams.',
    icon: FaBriefcase,
  },
  {
    title: 'IoT & Web Design Intern',
    company: 'Gyan Technolabs (IIIT Kottayam)',
    duration: 'JUN - JUL 2025',
    description:
      'Engineered bi-directional communication gateways connecting embedded ESP8266 sensors to web dashboards. Built automated OpenCV computer vision pipelines for real-time edge processing.',
    icon: FaBriefcase,
  },
];

const ieeeRoles = [
  { title: 'Design Lead, IEEE SB COET', duration: '2025 - Feb 2026' },
  { title: 'Student Chapter Designer, IEEE SB COET', duration: '2023 - 2025' },
  { title: 'PES Secretary, IEEE SB COET', duration: '2022 - 2023' },
];

const certifications = [
  'IoT & Web Dev (IIIT Kottayam)',
  'UI/UX Launchpad',
  '90 Days Full Stack',
  'NASA Space Apps Challenge',
  'AWS Solutions Architecture',
  'Cybersecurity Analyst',
];

const Experience = () => {
  return (
    <section id="experience" className="experience-editorial-section">
      <div className="experience-mashup-container">
        {/* Header */}
        <div className="exp-header-editorial">
          <div>
            <div className="exp-eyebrow">
              <span className="exp-tag-pill">SECTION // 05</span>
              <span className="mono-tag" style={{ color: 'var(--pop-crimson)' }}>
                ✦ CHRONOLOGY & LEADERSHIP
              </span>
            </div>
            <h2 className="exp-main-title">
              Professional <span className="accent-word">Trajectory</span> &amp; Roles.
            </h2>
          </div>
          <p
            style={{
              maxWidth: '380px',
              fontSize: '0.92rem',
              color: 'var(--ink-secondary)',
              lineHeight: 1.5,
            }}
          >
            Industry internships, academic background at College of Engineering Thalassery (COET), and leadership as Design Lead at IEEE SB COET (tenure completed Feb 2026).
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="exp-editorial-grid">
          {/* Left Column: Timeline */}
          <div className="exp-timeline-column">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                className="exp-timeline-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
              >
                <div className="timeline-card-header">
                  <div>
                    <h3 className="timeline-role-title">{exp.title}</h3>
                    <div className="timeline-company-name">✦ {exp.company}</div>
                  </div>
                  <span className="timeline-duration-badge">{exp.duration}</span>
                </div>
                <p className="timeline-role-desc">{exp.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: IEEE & Credentials */}
          <div className="exp-side-column">
            {/* IEEE Chapter Box */}
            <motion.div
              className="side-feature-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="side-box-title">
                <FaUsers style={{ color: 'var(--pop-cobalt)' }} />
                <span>IEEE SB COET Leadership</span>
              </h3>
              <div className="ieee-roles-list">
                {ieeeRoles.map((role) => (
                  <div key={role.title} className="ieee-role-item">
                    <span className="ieee-role-name">{role.title}</span>
                    <span className="ieee-role-period">{role.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications Box */}
            <motion.div
              className="side-feature-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="side-box-title">
                <FaAward style={{ color: 'var(--pop-orange)' }} />
                <span>Verified Credentials</span>
              </h3>
              <div className="cert-stamps-grid">
                {certifications.map((cert) => (
                  <span key={cert} className="cert-stamp">
                    ★ {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
