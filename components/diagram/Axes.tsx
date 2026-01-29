import React from 'react';
import { useDiagramContext } from './DiagramContext';

const Axes: React.FC = () => {
  const { config } = useDiagramContext();

  return (
    <>
      <line
        data-anim="axis-x"
        x1={config.padding}
        y1={config.height - config.padding}
        x2={config.width - config.padding / 2}
        y2={config.height - config.padding}
        className="stroke-slate-500 dark:stroke-slate-400"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <line
        data-anim="axis-y"
        x1={config.padding}
        y1={config.height - config.padding}
        x2={config.padding}
        y2={config.padding / 2}
        className="stroke-slate-500 dark:stroke-slate-400"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <text
        data-anim="axis-label-x"
        x={config.width / 2}
        y={config.height - config.padding + 30}
        textAnchor="middle"
        className="text-sm font-bold fill-slate-700 dark:fill-slate-300"
      >
        Task complexity / operational risk
      </text>
      <text
        data-anim="axis-label-y"
        x={config.padding - 30}
        y={config.height / 2}
        textAnchor="middle"
        className="text-sm font-bold fill-slate-700 dark:fill-slate-300"
        transform={`rotate(-90, ${config.padding - 30}, ${config.height / 2})`}
      >
        Engineering involvement
      </text>
    </>
  );
};

export default Axes;
