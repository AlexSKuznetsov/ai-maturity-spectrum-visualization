import React, { useMemo, useState } from 'react';
import { AI_LEVELS } from '../constants';
import { LevelData } from '../types';
import { clsx } from 'clsx';

interface DiagramProps {
  activeLevel: LevelData | null;
  onLevelSelect: (level: LevelData) => void;
}

const Diagram: React.FC<DiagramProps> = ({ activeLevel, onLevelSelect }) => {
  const [hoveredLevelId, setHoveredLevelId] = useState<number | null>(null);

  // SVG Config
  const width = 800;
  const height = 500;
  const padding = 60;
  const blockWidth = 100;
  const blockHeight = 60;
  const blockOffset = 40; // Space between Y-axis and first block
  const blockYOffset = 30; // Space between X-axis and first block (lift up)
  
  // Calculate block positions
  const levelsWithCoords = useMemo(() => {
    return AI_LEVELS.map((level, index) => {
      // Calculate X: Start after padding + offset, distribute remaining space
      const startX = padding + blockOffset;
      const endX = width - padding; // Keep right padding consistent
      const availableWidth = endX - startX - blockWidth;
      
      const xStep = availableWidth / (AI_LEVELS.length - 1);
      const x = startX + index * xStep;

      // Calculate Y: Start slightly above bottom axis, End at top padding
      const startY = (height - padding) - blockHeight - blockYOffset;
      const endY = padding;
      const yStep = (startY - endY) / (AI_LEVELS.length - 1);
      const y = startY - (index * yStep);
      
      return { ...level, x, y, width: blockWidth, height: blockHeight };
    });
  }, []);

  // Calculate background zones
  const bgZones = useMemo(() => {
    return levelsWithCoords.map((level, index) => {
      let startX = 0;
      let endX = 0;

      if (index === 0) {
        startX = padding;
      } else {
        const prev = levelsWithCoords[index - 1];
        startX = (prev.x + prev.width + level.x) / 2;
      }

      if (index === levelsWithCoords.length - 1) {
        endX = width - padding/2; // Extend to end of axis
      } else {
        const next = levelsWithCoords[index + 1];
        endX = (level.x + level.width + next.x) / 2;
      }

      return {
        id: level.id,
        x: startX,
        width: endX - startX,
        color: level.color
      };
    });
  }, [levelsWithCoords]);


  // Connectors points
  const connectorPath = useMemo(() => {
    let path = `M ${levelsWithCoords[0].x + blockWidth/2} ${levelsWithCoords[0].y + blockHeight/2}`;
    levelsWithCoords.forEach((level) => {
        path += ` L ${level.x + blockWidth/2} ${level.y + blockHeight/2}`;
    });
    return path;
  }, [levelsWithCoords]);

  // Transition Point (Between Level 2 and 3)
  const transitionIndex = 1; // Index 1 is Level 2, Index 2 is Level 3
  const transitionX = (levelsWithCoords[transitionIndex].x + levelsWithCoords[transitionIndex + 1].x + blockWidth) / 2;
  
  const hoveredLevel = useMemo(() => {
    return levelsWithCoords.find(l => l.id === hoveredLevelId);
  }, [levelsWithCoords, hoveredLevelId]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Axes Definitions */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
          
          {/* Gradient Definitions */}
          {AI_LEVELS.map((level) => (
            <linearGradient 
              key={`grad-${level.id}`} 
              id={`grad-${level.id}`} 
              x1="0" 
              y1="0" 
              x2="0" 
              y2="1"
            >
              <stop offset="0%" stopColor={level.color} stopOpacity="0.02" />
              <stop offset="100%" stopColor={level.color} stopOpacity="0.15" />
            </linearGradient>
          ))}

          <mask id="connector-mask">
            <rect x="0" y="0" width={width} height={height} fill="white" />
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

        {/* Background Zones */}
        {bgZones.map((zone) => (
          <rect 
            key={zone.id}
            x={zone.x}
            y={padding/2}
            width={zone.width}
            height={height - padding - padding/2}
            fill={`url(#grad-${zone.id})`}
            className="transition-opacity duration-300"
          />
        ))}

        {/* Connector Line - Masked so it sits behind blocks */}
        <path
          d={connectorPath}
          className="stroke-slate-300 dark:stroke-slate-600"
          strokeWidth="2"
          fill="none"
          mask="url(#connector-mask)"
        />

        {/* Axes Lines - Darker and Bolder */}
        <line 
          x1={padding} 
          y1={height - padding} 
          x2={width - padding/2} 
          y2={height - padding} 
          className="stroke-slate-500 dark:stroke-slate-400"
          strokeWidth="3" 
          markerEnd="url(#arrowhead)" 
        />
        <line 
          x1={padding} 
          y1={height - padding} 
          x2={padding} 
          y2={padding/2} 
          className="stroke-slate-500 dark:stroke-slate-400"
          strokeWidth="3" 
          markerEnd="url(#arrowhead)" 
        />

        {/* Axis Labels - Bigger and Darker */}
        <text x={width / 2} y={height - 10} textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">
          Task complexity / operational risk
        </text>
        <text 
          x={15} 
          y={height / 2} 
          textAnchor="middle" 
          className="text-sm font-bold fill-slate-700 dark:fill-slate-300" 
          transform={`rotate(-90, 15, ${height / 2})`}
        >
          Engineering involvement
        </text>

        {/* Engineering Transition Zone Indicator */}
        <line 
          x1={transitionX} 
          y1={height - padding} 
          x2={transitionX} 
          y2={padding} 
          className="stroke-slate-400 dark:stroke-slate-600"
          strokeWidth="2" 
          strokeDasharray="4 4" 
        />
        <text 
          x={transitionX + 10} 
          y={height - padding - 60} 
          className="text-[11px] fill-slate-500 dark:fill-slate-400 italic font-medium" 
        >
          <tspan x={transitionX + 10} dy="0">Tools stop being enough,</tspan>
          <tspan x={transitionX + 10} dy="1.4em">engineering becomes</tspan>
          <tspan x={transitionX + 10} dy="1.4em">unavoidable</tspan>
        </text>

        {/* Blocks - Rendered last to be on top */}
        {levelsWithCoords.map((level) => {
            const isActive = activeLevel?.id === level.id;
            const isHovered = hoveredLevelId === level.id;
            const isDimmed = activeLevel && !isActive;

            return (
              <g 
                key={level.id}
                onClick={() => onLevelSelect(level)}
                onMouseEnter={() => setHoveredLevelId(level.id)}
                onMouseLeave={() => setHoveredLevelId(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: isDimmed ? 0.4 : 1 }}
              >
                {/* Connection Line to X Axis (Helper) */}
                {(isHovered || isActive) && (
                  <line 
                    x1={level.x + blockWidth/2} 
                    y1={level.y + blockHeight} 
                    x2={level.x + blockWidth/2} 
                    y2={height - padding} 
                    stroke={level.color} 
                    strokeWidth="1.5" 
                    strokeDasharray="3 3"
                    opacity="0.8"
                  />
                )}
                {/* Connection Line to Y Axis (Helper) */}
                {(isHovered || isActive) && (
                  <line 
                    x1={level.x} 
                    y1={level.y + blockHeight/2} 
                    x2={padding} 
                    y2={level.y + blockHeight/2} 
                    stroke={level.color} 
                    strokeWidth="1.5" 
                    strokeDasharray="3 3"
                    opacity="0.8"
                  />
                )}

                {/* Main Block - Card Style */}
                <rect 
                  x={level.x} 
                  y={level.y} 
                  width={level.width} 
                  height={level.height} 
                  rx="8"
                  style={{ fill: isActive ? level.color : undefined }}
                  className={clsx(
                    "transition-all duration-300 ease-out",
                    isActive 
                      ? "stroke-none" 
                      : "fill-white dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-600"
                  )}
                  strokeWidth={isActive ? 0 : 1.5}
                  filter={isActive ? "drop-shadow(0px 4px 6px rgba(0,0,0,0.15))" : "drop-shadow(0px 1px 2px rgba(0,0,0,0.05))"}
                />

                {/* Level Number */}
                <circle 
                  cx={level.x + blockWidth / 2} 
                  cy={level.y - 15} 
                  r="12" 
                  fill={level.color} 
                  className="shadow-sm"
                />
                <text 
                  x={level.x + blockWidth / 2} 
                  y={level.y - 15} 
                  textAnchor="middle" 
                  fill="white" 
                  fontSize="11" 
                  fontWeight="bold"
                  dominantBaseline="central"
                >
                  {level.id}
                </text>

                {/* Text Label inside block */}
                <text 
                  x={level.x + blockWidth / 2} 
                  y={level.y + blockHeight / 2} 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  fill={isActive ? "white" : undefined}
                  className={isActive ? "" : "fill-slate-700 dark:fill-slate-200"}
                  fontSize="12" 
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                   <tspan x={level.x + blockWidth / 2} dy="-0.2em">{level.shortTitle.split(' ')[0]}</tspan>
                   <tspan x={level.x + blockWidth / 2} dy="1.2em">{level.shortTitle.split(' ').slice(1).join(' ')}</tspan>
                </text>
              </g>
            );
        })}

        {/* Tooltip */}
        {hoveredLevel && (
            <g transform={`translate(${hoveredLevel.x + blockWidth / 2}, ${hoveredLevel.y - 8})`} pointerEvents="none" className="transition-opacity duration-200">
                <rect 
                    x={-(hoveredLevel.shortTitle.length * 3.5 + 16)} 
                    y="-30" 
                    width={hoveredLevel.shortTitle.length * 7 + 32} 
                    height="26" 
                    rx="4" 
                    className="fill-slate-800 dark:fill-slate-700 shadow-xl"
                />
                <path d="M -5 -5 L 0 0 L 5 -5" className="fill-slate-800 dark:fill-slate-700" />
                <text 
                    x="0" 
                    y="-17" 
                    textAnchor="middle" 
                    fill="white" 
                    fontSize="11" 
                    fontWeight="500"
                    dominantBaseline="middle"
                >
                    {hoveredLevel.shortTitle}
                </text>
            </g>
        )}
      </svg>
    </div>
  );
};

export default Diagram;