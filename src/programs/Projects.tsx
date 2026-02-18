import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A Windows 98 themed portfolio built with React and Framer Motion.',
    icon: '🖥️',
  },
  {
    id: '2',
    title: 'Task Manager',
    description: 'A productivity app for managing daily tasks and projects.',
    icon: '✅',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Real-time weather information with beautiful visualizations.',
    icon: '🌤️',
  },
  {
    id: '4',
    title: 'E-commerce Store',
    description: 'A full-featured online shop with payment integration.',
    icon: '🛒',
  },
  {
    id: '5',
    title: 'Chat Application',
    description: 'Real-time messaging app with rooms and direct messages.',
    icon: '💬',
  },
  {
    id: '6',
    title: 'Blog Platform',
    description: 'A content management system for blogging enthusiasts.',
    icon: '📝',
  },
];

const Projects: React.FC = () => {
  return (
    <div className="projects">
      <h2 style={{ marginBottom: '16px', color: 'var(--win98-blue)' }}>My Projects</h2>
      <div className="projects__grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{project.icon}</div>
            <div className="project-card__title">{project.title}</div>
            <div className="project-card__desc">{project.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
