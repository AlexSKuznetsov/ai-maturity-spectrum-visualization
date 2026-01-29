import React, { useLayoutEffect, useRef } from 'react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { useDiagramContext } from './DiagramContext';

const LevelBlock: React.FC<{ levelId: number }> = ({ levelId }) => {
  const {
    levelsWithCoords,
    activeLevel,
    hoveredLevelId,
    setHoveredLevelId,
    onSelect,
    config
  } = useDiagramContext();

  const level = levelsWithCoords.find((item) => item.id === levelId);

  if (!level) {
    return null;
  }

  const isActive = activeLevel?.id === level.id;
  const isHovered = hoveredLevelId === level.id;
  const isDimmed = activeLevel && !isActive;
  const groupRef = useRef<SVGGElement | null>(null);
  const wasActiveRef = useRef(false);
  const borderTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (!groupRef.current) {
      return;
    }

    if (!isHovered && !isActive) {
      return;
    }

    const guides = groupRef.current.querySelectorAll<SVGLineElement>('[data-anim="level-guide"]');

    if (!guides.length) {
      return;
    }

    gsap.fromTo(
      guides,
      { opacity: 0, strokeDashoffset: 6 },
      {
        opacity: 0.8,
        strokeDashoffset: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto'
      }
    );
  }, [isHovered, isActive]);

  useLayoutEffect(() => {
    if (!groupRef.current) {
      return;
    }

    const border = groupRef.current.querySelector<SVGRectElement>('[data-anim="level-border"]');
    const borderGradient = groupRef.current.querySelector<SVGLinearGradientElement>(
      '[data-anim="level-border-gradient"]'
    );

    if (isActive && !wasActiveRef.current) {
      const badge = groupRef.current.querySelector<SVGCircleElement>('[data-anim="level-badge"]');

      gsap
        .timeline({ defaults: { ease: 'power2.out', overwrite: 'auto' } })
        .to(groupRef.current, { scale: 1.03, duration: 0.18 }, 0)
        .to(groupRef.current, { scale: 1, duration: 0.18 }, 0.18)
        .to(badge, { scale: 1.08, duration: 0.2 }, 0)
        .to(badge, { scale: 1, duration: 0.2 }, 0.2);
    }

    if (isActive && borderGradient && border) {
      const centerX = level.x + level.width / 2;
      const centerY = level.y + level.height / 2;

      borderTweenRef.current?.kill();
      gsap.set(borderGradient, {
        attr: { gradientTransform: `rotate(0 ${centerX} ${centerY})` }
      });
      borderTweenRef.current = gsap.to(borderGradient, {
        attr: { gradientTransform: `rotate(360 ${centerX} ${centerY})` },
        duration: 5,
        repeat: -1,
        ease: 'none'
      });
    }

    if (!isActive) {
      borderTweenRef.current?.kill();
      borderTweenRef.current = null;
    }

    wasActiveRef.current = isActive;
  }, [isActive]);

  return (
    <g
      key={level.id}
      data-anim="level"
      ref={groupRef}
      onClick={() => onSelect(level)}
      onMouseEnter={() => setHoveredLevelId(level.id)}
      onMouseLeave={() => setHoveredLevelId(null)}
      className="cursor-pointer transition-all duration-300"
      style={{ opacity: isDimmed ? 0.4 : 1 }}
    >
      {(isHovered || isActive) && (
        <line
          data-anim="level-guide"
          x1={level.x + config.blockWidth / 2}
          y1={level.y + config.blockHeight}
          x2={level.x + config.blockWidth / 2}
          y2={config.height - config.padding}
          stroke={level.color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.8"
        />
      )}
      {(isHovered || isActive) && (
        <line
          data-anim="level-guide"
          x1={level.x}
          y1={level.y + config.blockHeight / 2}
          x2={config.padding}
          y2={level.y + config.blockHeight / 2}
          stroke={level.color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.8"
        />
      )}

      <rect
        data-anim="level-rect"
        x={level.x}
        y={level.y}
        width={level.width}
        height={level.height}
        rx="8"
        style={{ fill: isActive ? level.color : undefined }}
        className={clsx(
          'transition-all duration-300 ease-out',
          isActive
            ? 'stroke-none'
            : 'fill-white dark:fill-dark-warm stroke-slate-400 dark:stroke-slate-700'
        )}
        strokeWidth={isActive ? 0 : 1}
        filter={
          isActive
            ? 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))'
            : 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))'
        }
      />

      {isActive && (
        <>
          <defs>
            <linearGradient
              id={`level-border-${level.id}`}
              data-anim="level-border-gradient"
              gradientUnits="userSpaceOnUse"
              x1={level.x}
              y1={level.y}
              x2={level.x + level.width}
              y2={level.y}
              gradientTransform={`rotate(0 ${level.x + level.width / 2} ${level.y + level.height / 2})`}
            >
              <stop offset="0%" stopColor={level.color} stopOpacity="0.2" />
              <stop offset="50%" stopColor={level.color} stopOpacity="1" />
              <stop offset="100%" stopColor={level.color} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect
            data-anim="level-border"
            x={level.x}
            y={level.y}
            width={level.width}
            height={level.height}
            rx="8"
            fill="none"
            stroke={`url(#level-border-${level.id})`}
            strokeWidth="2.5"
            pointerEvents="none"
          />
        </>
      )}

      <circle
        data-anim="level-badge"
        cx={level.x + config.blockWidth / 2}
        cy={level.y - 15}
        r="12"
        fill={level.color}
        className="shadow-sm"
      />
      <text
        data-anim="level-text"
        x={level.x + config.blockWidth / 2}
        y={level.y - 15}
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="bold"
        dominantBaseline="central"
      >
        {level.id}
      </text>

      <text
        data-anim="level-text"
        x={level.x + config.blockWidth / 2}
        y={level.y + config.blockHeight / 2 - 3}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isActive ? 'white' : undefined}
        className={isActive ? '' : 'fill-slate-700 dark:fill-slate-200'}
        fontSize="12"
        fontWeight="600"
        style={{ pointerEvents: 'none' }}
      >
        <tspan x={level.x + config.blockWidth / 2} dy="-0.2em">
          {level.shortTitle.split(' ')[0]}
        </tspan>
        <tspan x={level.x + config.blockWidth / 2} dy="1.2em">
          {level.shortTitle.split(' ').slice(1).join(' ')}
        </tspan>
      </text>
    </g>
  );
};

const LevelBlocks: React.FC = () => {
  const { levelsWithCoords } = useDiagramContext();

  return (
    <>
      {levelsWithCoords.map((level) => (
        <LevelBlock key={level.id} levelId={level.id} />
      ))}
    </>
  );
};

export default LevelBlocks;
