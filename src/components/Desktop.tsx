import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import { useWindowManager, desktopIcons } from '../hooks/useWindowManager';

const Desktop: React.FC = () => {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
  } = useWindowManager();

  const [isStartOpen, setIsStartOpen] = useState(false);

  const handleIconDoubleClick = useCallback(
    (programId: string) => {
      openWindow(programId);
    },
    [openWindow]
  );

  const handleWindowClick = useCallback(
    (windowId: string) => {
      const win = windows.find((w) => w.id === windowId);
      if (win?.isMinimized) {
        focusWindow(windowId);
      } else if (activeWindowId === windowId) {
        minimizeWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    },
    [windows, activeWindowId, focusWindow, minimizeWindow]
  );

  const handleStartClick = useCallback(() => {
    setIsStartOpen((prev) => !prev);
  }, []);

  const handleStartMenuClose = useCallback(() => {
    setIsStartOpen(false);
  }, []);

  const handleProgramClick = useCallback(
    (programId: string) => {
      openWindow(programId);
    },
    [openWindow]
  );

  return (
    <div className="desktop" onClick={() => setIsStartOpen(false)}>
      {desktopIcons.map((icon) => (
        <div key={icon.id} onClick={(e) => e.stopPropagation()}>
          <DesktopIcon
            icon={icon}
            onDoubleClick={handleIconDoubleClick}
          />
        </div>
      ))}

      <AnimatePresence>
        {windows.map((win) => (
          <div key={win.id} onClick={(e) => e.stopPropagation()}>
            <Window
              window={win}
              onClose={closeWindow}
              onFocus={focusWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onDrag={updateWindowPosition}
            />
          </div>
        ))}
      </AnimatePresence>

      <div style={{ position: 'absolute', bottom: '28px', left: 0 }} onClick={(e) => e.stopPropagation()}>
        <StartMenu
          isOpen={isStartOpen}
          onClose={handleStartMenuClose}
          onProgramClick={handleProgramClick}
        />
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <Taskbar
          windows={windows}
          activeWindowId={activeWindowId}
          onWindowClick={handleWindowClick}
          onStartClick={handleStartClick}
          isStartActive={isStartOpen}
        />
      </div>
    </div>
  );
};

export default Desktop;
