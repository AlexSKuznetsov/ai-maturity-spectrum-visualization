import React, { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useDiagramContext } from './DiagramContext';

const YouAreHereMarker: React.FC = () => {
  const { levelsWithCoords, assessedLevel, config } = useDiagramContext();
  const markerRef = useRef<SVGGElement | null>(null);

  const assessedLevelData = useMemo(() => {
    if (!assessedLevel) return null;
    return levelsWithCoords.find((level) => level.id === assessedLevel);
  }, [levelsWithCoords, assessedLevel]);

  useLayoutEffect(() => {
    if (!markerRef.current || !assessedLevelData) return;

    // Start hidden
    gsap.set(markerRef.current, { opacity: 0, scale: 0 });

    // Animate in after blocks have loaded (blocks finish ~1.5s)
    gsap.to(markerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)',
      delay: 1.8
    });

    // Start pulse animation after marker appears
    const pulse = markerRef.current.querySelector('[data-pulse]');
    if (pulse) {
      gsap.set(pulse, { scale: 1, opacity: 1 });
      gsap.to(pulse, {
        scale: 1.5,
        opacity: 0,
        duration: 1.2,
        repeat: -1,
        ease: 'power1.out',
        delay: 2.3
      });
    }
  }, [assessedLevelData]);

  if (!assessedLevelData) {
    return null;
  }

  // Position at top-right corner of the block
  const markerX = assessedLevelData.x + config.blockWidth - 5;
  const markerY = assessedLevelData.y + 5;

  return (
    <g
      ref={markerRef}
      transform={`translate(${markerX}, ${markerY})`}
      pointerEvents="none"
      data-anim="you-are-here"
    >
      {/* Pulse ring */}
      <circle
        data-pulse
        cx="0"
        cy="0"
        r="10"
        className="fill-none stroke-amber-400 stroke-2"
      />

      {/* Main badge circle */}
      <circle
        cx="0"
        cy="0"
        r="10"
        className="fill-amber-500 dark:fill-amber-400"
        filter="url(#youAreHereShadow)"
      />

      {/* Checkmark icon */}
      <path
        d="M -4 0 L -1 3 L 5 -3"
        fill="none"
        className="stroke-white dark:stroke-slate-900"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Shadow filter definition */}
      <defs>
        <filter id="youAreHereShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
    </g>
  );
};

export default YouAreHereMarker;
