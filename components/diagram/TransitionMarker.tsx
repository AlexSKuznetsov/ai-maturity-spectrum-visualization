import React, { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useDiagramContext } from './DiagramContext';

const TransitionMarker: React.FC = () => {
  const { transitionX, config, activeLevel } = useDiagramContext();
  const textGroupRef = useRef<SVGGElement | null>(null);
  const wasActiveRef = useRef(false);
  const isTransitionActive = activeLevel?.id === 3;

  const textLines = useMemo(
    () => ['Tools stop being enough,', 'engineering becomes', 'unavoidable'],
    []
  );

  const maxChars = useMemo(() => {
    return textLines.reduce((max, line) => Math.max(max, line.length), 0);
  }, [textLines]);

  useLayoutEffect(() => {
    if (!textGroupRef.current) {
      return;
    }

    if (isTransitionActive && !wasActiveRef.current) {
      gsap
        .timeline({ defaults: { ease: 'power2.out', overwrite: 'auto' } })
        .to(textGroupRef.current, { scale: 1.04, duration: 0.2 })
        .to(textGroupRef.current, { scale: 1, duration: 0.2 });
    }

    wasActiveRef.current = isTransitionActive;
  }, [isTransitionActive]);

  const textX = transitionX + 10;
  const textY = config.height - config.padding - 60;
  const fontSize = 11;
  const lineHeight = 16;
  const paddingX = 10;
  const paddingY = 8;
  const boxWidth = maxChars * 6.4 + paddingX * 2;
  const boxHeight = lineHeight * textLines.length + paddingY * 2;

  return (
    <>
      <line
        data-anim="transition-line"
        x1={transitionX}
        y1={config.height - config.padding}
        x2={transitionX}
        y2={config.padding}
        className="stroke-slate-400 dark:stroke-slate-600"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <g
        ref={textGroupRef}
        data-anim="transition-text"
        transform={`translate(${textX}, ${textY})`}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        {isTransitionActive && (
          <rect
            x={-paddingX}
            y={-paddingY - fontSize}
            width={boxWidth}
            height={boxHeight}
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeDasharray="6 6"
            strokeWidth="1"
            className="text-slate-500 dark:text-slate-400"
          />
        )}
        <text
          className="text-[11px] fill-slate-500 dark:fill-slate-400 italic font-medium"
        >
          {textLines.map((line, index) => (
            <tspan key={line} x={0} dy={index === 0 ? 0 : '1.4em'}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    </>
  );
};

export default TransitionMarker;
