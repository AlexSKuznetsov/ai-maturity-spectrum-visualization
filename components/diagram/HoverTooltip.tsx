import React, { useMemo } from 'react';
import { useDiagramContext } from './DiagramContext';

const HoverTooltip: React.FC = () => {
  const { levelsWithCoords, hoveredLevelId, config } = useDiagramContext();

  const hoveredLevel = useMemo(() => {
    return levelsWithCoords.find((level) => level.id === hoveredLevelId);
  }, [levelsWithCoords, hoveredLevelId]);

  if (!hoveredLevel) {
    return null;
  }

  return (
    <g
      transform={`translate(${hoveredLevel.x + config.blockWidth / 2}, ${hoveredLevel.y - 8})`}
      pointerEvents="none"
      className="transition-opacity duration-200"
    >
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
  );
};

export default HoverTooltip;
