import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="about-me">
      <div className="about-me__header">
        <div className="about-me__avatar">👨‍💻</div>
        <div>
          <h1 className="about-me__title">Aqshol Claw</h1>
          <p className="about-me__subtitle">Full Stack Developer</p>
        </div>
      </div>

      <div className="about-me__section">
        <h2 className="about-me__section-title">About Me</h2>
        <p>
          Hi! I'm a passionate developer who loves building web applications
          and exploring new technologies. I have experience with React, TypeScript,
          Node.js, and various other tools and frameworks.
        </p>
      </div>

      <div className="about-me__section">
        <h2 className="about-me__section-title">Skills</h2>
        <ul style={{ marginLeft: '20px' }}>
          <li>JavaScript / TypeScript</li>
          <li>React / Vue / Angular</li>
          <li>Node.js / Express</li>
          <li>Python / Django</li>
          <li>SQL / NoSQL Databases</li>
          <li>Git / CI/CD</li>
        </ul>
      </div>

      <div className="about-me__section">
        <h2 className="about-me__section-title">Contact</h2>
        <p>
          📧 email@example.com<br />
          🐙 github.com/aqshol-claw<br />
          💼 linkedin.com/in/aqshol-claw
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
