import React from 'react';
import type { DesktopIcon as DesktopIconType } from '../types';

interface DesktopIconProps {
  icon: DesktopIconType;
  onDoubleClick: (programId: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, onDoubleClick }) => {
  return (
    <div
      className="icon"
      style={{ left: icon.position.x, top: icon.position.y }}
      onDoubleClick={() => onDoubleClick(icon.programId)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onDoubleClick(icon.programId);
        }
      }}
    >
      <div className="icon__image">
        <span style={{ fontSize: '32px' }}>{icon.icon}</span>
      </div>
      <span className="icon__label">{icon.label}</span>
    </div>
  );
};

export default DesktopIcon;
