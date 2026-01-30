import React from 'react';
import { motion } from 'framer-motion';
import { IoHardwareChipOutline, IoPencilOutline, IoCodeSlashOutline } from 'react-icons/io5';
import './Skills.css';

const Skills = () => {
  const technicalSkills = [
    { name: 'Figma', level: 90, icon: IoPencilOutline },
    { name: 'HTML/CSS', level: 70, icon: IoCodeSlashOutline },
    { name: 'JavaScript', level: 25, icon: IoCodeSlashOutline },
    { name: 'React.js', level: 60, icon: IoCodeSlashOutline },
    { name: 'Python', level: 25, icon: IoCodeSlashOutline },
    { name: 'IoT (ESP8266)', level: 45, icon: IoHardwareChipOutline },
    { name: 'Raspberry Pi', level: 40, icon: IoHardwareChipOutline },
    { name: 'FPGA Design', level: 30, icon: IoHardwareChipOutline }
  ];

  const softSkills = [
    'LEADERSHIP', 'TEAMWORK', 'STRATEGY', 'CREATIVE UX', 'PRODUCT MGMT'
  ];

  return (
    <section id="skills" className="skills-modern">
      <div className="skills-container">
        <motion.div
          className="skills-header-ui"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="modern-title">TECHNICAL <span>MATRIX</span></h2>
          <p className="modern-subtitle">Modular skillsets across the digital and physical stack.</p>
        </motion.div>

        <div className="skills-matrix-grid">
          {technicalSkills.map((skill, i) => (
            <motion.div
              key={i}
              className="skill-module"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
            >
              <div className="module-top">
                <div className="skill-icon"><skill.icon /></div>
                <span className="skill-lvl">{skill.level}%</span>
              </div>
              <h4 className="skill-title">{skill.name}</h4>
              <div className="skill-meter-container">
                <motion.div
                  className="skill-meter-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="soft-skills-cloud-wrap">
          <h3 className="section-subtitle-small">NEURAL_TRAITS</h3>
          <div className="soft-skills-flex">
            {softSkills.map((skill, i) => (
              <motion.div
                key={i}
                className="soft-trait-tag"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
