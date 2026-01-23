import React from 'react';

interface DiagramLayerProps {
  name?: string;
  children: React.ReactNode;
}

const DiagramLayer: React.FC<DiagramLayerProps> = ({ name, children }) => {
  return <g data-layer={name}>{children}</g>;
};

export default DiagramLayer;
