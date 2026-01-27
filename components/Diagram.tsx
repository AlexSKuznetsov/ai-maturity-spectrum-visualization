import React from 'react';
import { AI_LEVELS } from '../constants';
import { LevelData } from '../types';
import Axes from './diagram/Axes';
import BackgroundZones from './diagram/BackgroundZones';
import ConnectorLine from './diagram/ConnectorLine';
import DiagramAnimations from './diagram/DiagramAnimations';
import DiagramLayer from './diagram/DiagramLayer';
import DiagramRoot from './diagram/DiagramRoot';
import HoverTooltip from './diagram/HoverTooltip';
import LevelBlocks from './diagram/LevelBlocks';
import TransitionMarker from './diagram/TransitionMarker';

interface DiagramProps {
  activeLevel: LevelData | null;
  onLevelSelect: (level: LevelData) => void;
}

const Diagram: React.FC<DiagramProps> = ({ activeLevel, onLevelSelect }) => {
  return (
    <DiagramRoot levels={AI_LEVELS} activeLevel={activeLevel} onSelect={onLevelSelect}>
      <DiagramAnimations>
        <DiagramLayer name="background">
          <BackgroundZones />
        </DiagramLayer>
        <DiagramLayer name="lines">
          <ConnectorLine />
          <Axes />
          <TransitionMarker />
        </DiagramLayer>
        <DiagramLayer name="blocks">
          <LevelBlocks />
        </DiagramLayer>
        <DiagramLayer name="tooltip">
          <HoverTooltip />
        </DiagramLayer>
      </DiagramAnimations>
    </DiagramRoot>
  );
};

export default Diagram;
