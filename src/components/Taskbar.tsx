import React, { useState, useEffect } from 'react';
import type { WindowState } from '../types';
import { getProgramById } from '../data/programs';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (windowId: string) => void;
  onStartClick: () => void;
  isStartActive: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  isStartActive,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="taskbar">
      <button
        className={`taskbar__start-btn ${isStartActive ? 'taskbar__start-btn--active' : ''}`}
        onClick={onStartClick}
      >
        <span className="taskbar__start-icon">🪟</span>
        <span>Start</span>
      </button>

      <div className="taskbar__programs">
        {windows.map((win) => {
          const program = getProgramById(win.programId);
          if (!program) return null;
          const isActive = activeWindowId === win.id;

          return (
            <button
              key={win.id}
              className={`taskbar__program ${isActive ? 'taskbar__program--active' : ''}`}
              onClick={() => onWindowClick(win.id)}
            >
              <span className="taskbar__program-icon">{program.icon}</span>
              <span className="taskbar__program-name">{program.name}</span>
            </button>
          );
        })}
      </div>

      <div className="taskbar__clock">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Taskbar;
