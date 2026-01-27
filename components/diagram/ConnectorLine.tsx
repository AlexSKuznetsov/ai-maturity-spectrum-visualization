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
        data-anim="connector-solid"
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="2"
        fill="none"
        mask="url(#connector-mask)"
      />
      <path
        d={connectorPath}
        data-anim="connector-dash"
        className="stroke-slate-400/70 dark:stroke-slate-400/60"
        strokeWidth="2"
        fill="none"
        strokeDasharray="10 14"
        mask="url(#connector-mask)"
      />
    </>
  );
};

export default ConnectorLine;
