import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mashup-footer">
      <div className="footer-inner-box">
        <div className="footer-top-row">
          <div>
            <h2 className="footer-brand-title">ABHAY M</h2>
            <div className="footer-brand-sub">
              Engineering The Edge ★ Designing The Experience
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div className="footer-nav-cluster">
              <a href="#about" className="footer-nav-link">About</a>
              <a href="#projects" className="footer-nav-link">Projects</a>
              <a href="#skills" className="footer-nav-link">Skills</a>
              <a href="#experience" className="footer-nav-link">Experience</a>
              <a href="#contact" className="footer-nav-link">Contact</a>
            </div>

            <button onClick={scrollToTop} className="back-to-top-btn">
              <span>Back To Top</span>
              <FaArrowUp />
            </button>
          </div>
        </div>

        <div className="footer-bottom-strip">
          <p className="footer-copy">
            &copy; {currentYear} ABHAY M. KANNUR, KERALA, INDIA.
          </p>
          <span className="footer-stamp">
            VOL. 26 // FRESHER x GATE Aspirant
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
