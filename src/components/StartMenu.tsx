import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onProgramClick: (programId: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onProgramClick }) => {
  const menuItems = [
    { id: 'terminal', label: 'Terminal', icon: '💻' },
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '📁' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="start-menu"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="start-menu__items">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="start-menu__item"
                onClick={() => {
                  onProgramClick(item.id);
                  onClose();
                }}
              >
                <span className="start-menu__item-icon">{item.icon}</span>
                <span className="start-menu__item-label">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;
