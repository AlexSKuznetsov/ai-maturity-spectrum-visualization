import React from 'react';
import { useDiagramContext } from './DiagramContext';

interface DiagramCanvasProps {
  children: React.ReactNode;
}

const DiagramCanvas: React.FC<DiagramCanvasProps> = ({ children }) => {
  const { levels, levelsWithCoords, config } = useDiagramContext();

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="w-full h-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-500 dark:fill-slate-400" />
          </marker>

          {levels.map((level) => (
            <linearGradient key={`grad-${level.id}`} id={`grad-${level.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={level.color} stopOpacity="0.02" />
              <stop offset="100%" stopColor={level.color} stopOpacity="0.15" />
            </linearGradient>
          ))}

          <mask id="connector-mask">
            <rect x="0" y="0" width={config.width} height={config.height} fill="white" />
            {levelsWithCoords.map((level) => (
              <rect
                key={`mask-${level.id}`}
                x={level.x}
                y={level.y}
                width={level.width}
                height={level.height}
                rx="8"
                fill="black"
              />
            ))}
          </mask>
        </defs>

        {children}
      </svg>
    </div>
  );
};

export default DiagramCanvas;
