import React from 'react';
import { clsx } from 'clsx';
import { useDiagramContext } from './DiagramContext';

const LevelBlock: React.FC<{ levelId: number }> = ({ levelId }) => {
  const {
    levelsWithCoords,
    activeLevel,
    hoveredLevelId,
    setHoveredLevelId,
    onSelect,
    config
  } = useDiagramContext();

  const level = levelsWithCoords.find((item) => item.id === levelId);

  if (!level) {
    return null;
  }

  const isActive = activeLevel?.id === level.id;
  const isHovered = hoveredLevelId === level.id;
  const isDimmed = activeLevel && !isActive;

  return (
    <g
      key={level.id}
      onClick={() => onSelect(level)}
      onMouseEnter={() => setHoveredLevelId(level.id)}
      onMouseLeave={() => setHoveredLevelId(null)}
      className="cursor-pointer transition-all duration-300"
      style={{ opacity: isDimmed ? 0.4 : 1 }}
    >
      {(isHovered || isActive) && (
        <line
          x1={level.x + config.blockWidth / 2}
          y1={level.y + config.blockHeight}
          x2={level.x + config.blockWidth / 2}
          y2={config.height - config.padding}
          stroke={level.color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.8"
        />
      )}
      {(isHovered || isActive) && (
        <line
          x1={level.x}
          y1={level.y + config.blockHeight / 2}
          x2={config.padding}
          y2={level.y + config.blockHeight / 2}
          stroke={level.color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.8"
        />
      )}

      <rect
        x={level.x}
        y={level.y}
        width={level.width}
        height={level.height}
        rx="8"
        style={{ fill: isActive ? level.color : undefined }}
        className={clsx(
          'transition-all duration-300 ease-out',
          isActive
            ? 'stroke-none'
            : 'fill-white dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-600'
        )}
        strokeWidth={isActive ? 0 : 1.5}
        filter={
          isActive
            ? 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))'
            : 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))'
        }
      />

      <circle
        cx={level.x + config.blockWidth / 2}
        cy={level.y - 15}
        r="12"
        fill={level.color}
        className="shadow-sm"
      />
      <text
        x={level.x + config.blockWidth / 2}
        y={level.y - 15}
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="bold"
        dominantBaseline="central"
      >
        {level.id}
      </text>

      <text
        x={level.x + config.blockWidth / 2}
        y={level.y + config.blockHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isActive ? 'white' : undefined}
        className={isActive ? '' : 'fill-slate-700 dark:fill-slate-200'}
        fontSize="12"
        fontWeight="600"
        style={{ pointerEvents: 'none' }}
      >
        <tspan x={level.x + config.blockWidth / 2} dy="-0.2em">
          {level.shortTitle.split(' ')[0]}
        </tspan>
        <tspan x={level.x + config.blockWidth / 2} dy="1.2em">
          {level.shortTitle.split(' ').slice(1).join(' ')}
        </tspan>
      </text>
    </g>
  );
};

const LevelBlocks: React.FC = () => {
  const { levelsWithCoords } = useDiagramContext();

  return (
    <>
      {levelsWithCoords.map((level) => (
        <LevelBlock key={level.id} levelId={level.id} />
      ))}
    </>
  );
};

export default LevelBlocks;
