import React from 'react';
import { useDiagramContext } from './DiagramContext';

const BackgroundZones: React.FC = () => {
  const { bgZones, config } = useDiagramContext();

  return (
    <>
      {bgZones.map((zone) => (
        <rect
          key={zone.id}
          data-anim="zone"
          x={zone.x}
          y={config.padding / 2}
          width={zone.width}
          height={config.height - config.padding - config.padding / 2}
          fill={`url(#grad-${zone.id})`}
          className="transition-opacity duration-300"
        />
      ))}
    </>
  );
};

export default BackgroundZones;
