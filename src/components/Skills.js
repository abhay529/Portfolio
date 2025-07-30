import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const technicalSkills = [
    { name: 'Figma', level: 90, category: 'Design' },
    { name: 'HTML', level: 55, category: 'Frontend' },
    { name: 'CSS', level: 70, category: 'Frontend' },
    { name: 'JavaScript', level: 25, category: 'Frontend' },
    { name: 'Python', level: 25, category: 'Programming' },
    { name: 'MATLAB', level: 25, category: 'Engineering' },
    { name: 'Bootstrap', level: 40, category: 'Frontend' },
    { name: 'IoT (ESP8266)', level: 45, category: 'Hardware' }
  ];

  const softSkills = [
    'Leadership',
    'Teamwork',
    'Creative Thinking',
    'Project Management',
    'Creative Design',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <section id="skills" className="section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Skills & Expertise
        </motion.h2>
        
        <div className="skills-content">
          <motion.div className="technical-skills" variants={itemVariants}>
            <h3>Technical Skills</h3>
            <div className="skills-grid">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-category">{skill.category}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="soft-skills" variants={itemVariants}>
            <h3>Soft Skills</h3>
            <div className="soft-skills-grid">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="soft-skill-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
