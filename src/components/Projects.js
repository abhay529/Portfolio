import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Projects.css';

const projects = [
    {
      id: '01',
      title: 'AI Face Attendance',
      description: 'Automated attendance system using face recognition on Raspberry Pi 3. Features real-time logging and admin dashboard.',
      technologies: ['Python', 'OpenCV', 'Raspberry Pi'],
      category: 'AI / IoT',
      color: '#16a34a',
      status: 'Completed',
      liveLink: 'https://github.com/abhay529/AI_Face_Attendance_system_usingPi3.git',
    },
    {
      id: '02',
      title: 'Smart Blind Stick',
      description: 'Sensor-based assistive device to enhance mobility for visually impaired users. Detects obstacles and water.',
      technologies: ['Raspberry Pi 5', 'Lidar', 'Sensors'],
      category: 'Hardware',
      color: '#f97316',
      status: 'Ongoing',
      liveLink: '#',
    },
    {
      id: '03',
      title: 'Retina Emulator',
      description: 'FPGA-based neuromorphic retina emulator mimicking biological vision systems for high-speed edge processing.',
      technologies: ['FPGA','Verilog'],
      category: 'Seminar',
      color: '#7c3aed',
      status: 'Completed',
      liveLink: 'https://drive.google.com/file/d/1lnBrrftWvFB_D6TeBnZzwcru30I4hTTd/view',
    },
    {
      id: '04',
      title: 'SPANDANAM Fest',
      description: 'Official College Arts Festival website with event schedules, registration, and live score updates.',
      technologies: ['Figma'],
      category: 'Web Dev',
      color: '#db2777',
      status: 'Live',
      liveLink: 'https://www.spandanam.online/',
    },
    {
      id: '05',
      title: 'Neuromesh IoT',
      description: 'Centralized dashboard for monitoring ESP8266 devices. Visualizes real-time sensor data with charts.',
      technologies: ['IoT', 'React', 'Chart.js'],
      category: 'Internship',
      color: '#9333ea',
      status: 'Completed',
      liveLink: 'https://www.figma.com/proto/qP0KBOW5WWwycx8goA489r/Works?page-id=219%3A287&node-id=433-5132',
    },
    {
      id: '06',
      title: 'NASA Space Apps',
      description: 'Hackathon solution analyzing open NASA datasets to solve space exploration challenges.',
      technologies: ['Data Analysis', 'Python'],
      category: 'Hackathon',
      color: '#2563eb',
      status: 'Completed',
      liveLink: '#',
    },
    {
      id: '07',
      title: 'VeloCart App',
      description: 'eCommerce payment app UI study focusing on smooth user journey and conversion optimization.',
      technologies: ['Figma', 'UX Research'],
      category: 'Case Study',
      color: '#ea580c',
      status: 'Compleated',
      liveLink: 'https://www.figma.com/proto/qP0KBOW5WWwycx8goA489r/Works?page-id=0%3A1&node-id=3-26135',
    },
    {
      id: '08',
      title: 'Synera Mail',
      description: 'Cloud email automation platform for startups. Scaling backend architecture with FastAPI.',
      technologies: ['FastAPI', 'Figma', 'LinkedIn'],
      category: 'Startup',
      color: '#0d9488',
      status: 'Building',
      liveLink: '#',
    },
    {
      id: '09',
      title: 'AGNITUS Techfest',
      description: 'Official website for the 2026 college technical festival. Modern, interactive, and responsive.',
      technologies: ['Web', 'Figma', 'React'],
      category: 'Tech Website',
      color: '#e11d48',
      status: 'Coming Soon',
      liveLink: '#',
    },
    {
      id: '10',
      title: 'AirPods Clone',
      description: 'Immersive product landing page design for premium audio gear with 3D scrolling effects.',
      technologies: ['Microanimation', 'Figma','parallax'],
      category: 'Clone',
      color: '#0ea5e9',
      status: 'Compleated',
      liveLink: '#',
    },
];

const ProjectCard = ({ project }) => {
    return (
        <motion.div 
            className="crystal-card-2d"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ '--accent': project.color }}
        >
            {/* Visual Top Half */}
            <div className="card-vis-top">
                <div className="vis-glow" style={{ background: project.color }}></div>
                <div className="cat-pill">{project.category}</div>
                
                {/* Status Badge */}
                <div className="status-badge" style={{ color: project.color, borderColor: project.color }}>
                    {project.status}
                </div>
            </div>

            {/* Content Bottom Half */}
            <div className="card-content">
                <div className="card-header">
                    <span className="id-num">{project.id}</span>
                    <h3>{project.title}</h3>
                </div>
                
                <p>{project.description}</p>

                <div className="tech-tags">
                    {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                    ))}
                </div>

                <div className="card-actions">
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="action-link">
                        View Project <FaArrowRight className="icon" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const containerRef = useRef(null);
  
    const scrollLeft = () => {
      if (containerRef.current) {
          containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      }
    };
  
    const scrollRight = () => {
      if (containerRef.current) {
          containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      }
    };
  
    return (
      <section id="projects" className="projects-2d-section">
        <div className="section-header">
          <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
              Selected Works
          </motion.h2>
          <p>A collection of technical projects, designs, and experiments.</p>
        </div>
  
        <div className="gallery-wrapper">
            {/* Left Button */}
            <button className="scroll-btn left" onClick={scrollLeft} aria-label="Scroll Left">
              <FaChevronLeft />
            </button>
  
            <div className="gallery-scroll-container" ref={containerRef}>
              <div className="gallery-track">
                  {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                  ))}
                  
                  <div className="spacer-end"></div>
              </div>
            </div>
  
            {/* Right Button */}
            <button className="scroll-btn right" onClick={scrollRight} aria-label="Scroll Right">
              <FaChevronRight />
            </button>
        </div>
        
        <div className="scroll-hint">
          <span>Scroll or drag to explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>
    );
  };
  
  export default Projects;
