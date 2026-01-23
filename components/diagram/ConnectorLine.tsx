import React from 'react';
import { useDiagramContext } from './DiagramContext';

const ConnectorLine: React.FC = () => {
  const { connectorPath } = useDiagramContext();

  if (!connectorPath) {
    return null;
  }

  return (
    <>
      <path
        d={connectorPath}
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="2"
        fill="none"
        mask="url(#connector-mask)"
      />
      <path
        d={connectorPath}
        className="stroke-slate-400/70 dark:stroke-slate-400/60"
        strokeWidth="2"
        fill="none"
        strokeDasharray="10 14"
        mask="url(#connector-mask)"
      >
        <animate attributeName="stroke-dashoffset" values="0; -48" dur="3s" repeatCount="indefinite" />
      </path>
    </>
  );
};

export default ConnectorLine;
