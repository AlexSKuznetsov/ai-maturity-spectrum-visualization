import React from 'react';
import { useDiagramContext } from './DiagramContext';

const TransitionMarker: React.FC = () => {
  const { transitionX, config } = useDiagramContext();

  return (
    <>
      <line
        x1={transitionX}
        y1={config.height - config.padding}
        x2={transitionX}
        y2={config.padding}
        className="stroke-slate-400 dark:stroke-slate-600"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <text
        x={transitionX + 10}
        y={config.height - config.padding - 60}
        className="text-[11px] fill-slate-500 dark:fill-slate-400 italic font-medium"
      >
        <tspan x={transitionX + 10} dy="0">
          Tools stop being enough,
        </tspan>
        <tspan x={transitionX + 10} dy="1.4em">
          engineering becomes
        </tspan>
        <tspan x={transitionX + 10} dy="1.4em">
          unavoidable
        </tspan>
      </text>
    </>
  );
};

export default TransitionMarker;
