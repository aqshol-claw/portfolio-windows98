import type { Program } from '../types';
import Terminal from '../programs/Terminal';
import AboutMe from '../programs/AboutMe';
import Projects from '../programs/Projects';

export const programs: Program[] = [
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '💻',
    component: Terminal,
  },
  {
    id: 'about',
    name: 'About Me',
    icon: '👤',
    component: AboutMe,
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: '📁',
    component: Projects,
  },
];

export const getProgramById = (id: string): Program | undefined => {
  return programs.find((p) => p.id === id);
};
