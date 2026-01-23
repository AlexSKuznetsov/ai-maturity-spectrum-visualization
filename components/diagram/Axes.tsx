import React from 'react';
import { useDiagramContext } from './DiagramContext';

const Axes: React.FC = () => {
  const { config } = useDiagramContext();

  return (
    <>
      <line
        x1={config.padding}
        y1={config.height - config.padding}
        x2={config.width - config.padding / 2}
        y2={config.height - config.padding}
        className="stroke-slate-500 dark:stroke-slate-400"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <line
        x1={config.padding}
        y1={config.height - config.padding}
        x2={config.padding}
        y2={config.padding / 2}
        className="stroke-slate-500 dark:stroke-slate-400"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <text
        x={config.width / 2}
        y={config.height - 10}
        textAnchor="middle"
        className="text-sm font-bold fill-slate-700 dark:fill-slate-300"
      >
        Task complexity / operational risk
      </text>
      <text
        x={15}
        y={config.height / 2}
        textAnchor="middle"
        className="text-sm font-bold fill-slate-700 dark:fill-slate-300"
        transform={`rotate(-90, 15, ${config.height / 2})`}
      >
        Engineering involvement
      </text>
    </>
  );
};

export default Axes;
