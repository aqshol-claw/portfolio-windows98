export interface Program {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
}

export interface WindowState {
  id: string;
  programId: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface DesktopIcon {
  id: string;
  programId: string;
  label: string;
  icon: string;
  position: { x: number; y: number };
}
