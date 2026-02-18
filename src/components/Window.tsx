import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../types';
import { getProgramById } from '../data/programs';

interface WindowProps {
  window: WindowState;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}

const Window: React.FC<WindowProps> = ({
  window: win,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onDrag,
}) => {
  const program = getProgramById(win.programId);
  const windowRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (windowRef.current) {
        const rect = windowRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          setDragConstraints({
            top: -win.position.y,
            left: -win.position.x,
            right: rect.width - win.position.x - win.size.width,
            bottom: rect.height - win.position.y - win.size.height - 28,
          });
        }
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [win.position.x, win.position.y, win.size.width, win.size.height]);

  if (!program) return null;

  const ProgramComponent = program.component;

  const isActive = true;

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          ref={windowRef}
          className={`window ${win.isMaximized ? 'window--maximized' : ''}`}
          style={{
            left: win.isMaximized ? 0 : win.position.x,
            top: win.isMaximized ? 0 : win.position.y,
            width: win.isMaximized ? '100%' : win.size.width,
            height: win.isMaximized ? 'calc(100% - 28px)' : win.size.height,
            zIndex: win.zIndex,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={() => onFocus(win.id)}
          onTouchStart={() => onFocus(win.id)}
        >
          <div
            className={`window__title-bar ${isActive ? 'window__title-bar--active' : ''}`}
            onMouseDown={(e) => {
              if (!win.isMaximized) {
                e.preventDefault();
              }
            }}
          >
            <div className="window__title">
              <span className="window__title-icon">{program.icon}</span>
              <span>{program.name}</span>
            </div>
            <div className="window__controls">
              <button
                className="window__btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize(win.id);
                }}
                title="Minimize"
              >
                _
              </button>
              <button
                className="window__btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onMaximize(win.id);
                }}
                title="Maximize"
              >
                □
              </button>
              <button
                className="window__btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(win.id);
                }}
                title="Close"
              >
                ×
              </button>
            </div>
          </div>
          {!win.isMaximized && (
            <motion.div
              drag
              dragMomentum={false}
              dragConstraints={dragConstraints}
              onDrag={(_, info) => {
                onDrag(win.id, {
                  x: win.position.x + info.delta.x,
                  y: win.position.y + info.delta.y,
                });
              }}
              style={{ cursor: 'move' }}
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="window__content" style={{ flex: 1 }}>
                  <ProgramComponent />
                </div>
              </div>
            </motion.div>
          )}
          {win.isMaximized && (
            <div className="window__content" style={{ flex: 1 }}>
              <ProgramComponent />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
