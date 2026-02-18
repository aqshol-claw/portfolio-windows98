import { useState, useCallback } from 'react';
import type { WindowState, DesktopIcon } from '../types';

const WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 350;
const BASE_Z_INDEX = 10;

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(BASE_Z_INDEX);

  const openWindow = useCallback((programId: string) => {
    const existingWindow = windows.find((w) => w.programId === programId && !w.isMinimized);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    const minimizedWindow = windows.find((w) => w.programId === programId && w.isMinimized);
    if (minimizedWindow) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === minimizedWindow.id ? { ...w, isMinimized: false } : w
        )
      );
      focusWindow(minimizedWindow.id);
      return;
    }

    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);

    const newWindow: WindowState = {
      id: `${programId}-${Date.now()}`,
      programId,
      isMinimized: false,
      isMaximized: false,
      position: {
        x: 50 + (windows.length % 5) * 30,
        y: 50 + (windows.length % 5) * 30,
      },
      size: { width: WINDOW_WIDTH, height: WINDOW_HEIGHT },
      zIndex: newZIndex,
    };

    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [windows, highestZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
    if (activeWindowId === windowId) {
      const remaining = windows.filter((w) => w.id !== windowId);
      if (remaining.length > 0) {
        const lastWindow = remaining[remaining.length - 1];
        setActiveWindowId(lastWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, windows]);

  const focusWindow = useCallback((windowId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setActiveWindowId(windowId);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: newZIndex, isMinimized: false } : w
      )
    );
  }, [highestZIndex]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      )
    );
    const remaining = windows.filter((w) => w.id !== windowId && !w.isMinimized);
    if (remaining.length > 0) {
      setActiveWindowId(remaining[remaining.length - 1].id);
    } else {
      setActiveWindowId(null);
    }
  }, [windows]);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, position } : w
      )
    );
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, size } : w
      )
    );
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  };
};

export const desktopIcons: DesktopIcon[] = [
  { id: 'terminal-icon', programId: 'terminal', label: 'Terminal', icon: '💻', position: { x: 20, y: 20 } },
  { id: 'about-icon', programId: 'about', label: 'About Me', icon: '👤', position: { x: 20, y: 110 } },
  { id: 'projects-icon', programId: 'projects', label: 'Projects', icon: '📁', position: { x: 20, y: 200 } },
];
