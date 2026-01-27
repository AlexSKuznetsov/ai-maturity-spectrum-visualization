import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import DiagramCanvas from './DiagramCanvas';

interface DiagramAnimationsProps {
  children: React.ReactNode;
}

const DiagramAnimations: React.FC<DiagramAnimationsProps> = ({ children }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const zones = gsap.utils.toArray<SVGRectElement>('[data-anim="zone"]');
      const axisX = gsap.utils.toArray<SVGLineElement>('[data-anim="axis-x"]');
      const axisY = gsap.utils.toArray<SVGLineElement>('[data-anim="axis-y"]');
      const axisLabelX = gsap.utils.toArray<SVGTextElement>('[data-anim="axis-label-x"]');
      const axisLabelY = gsap.utils.toArray<SVGTextElement>('[data-anim="axis-label-y"]');
      const connectorSolid = gsap.utils.toArray<SVGPathElement>('[data-anim="connector-solid"]');
      const connectorDash = gsap.utils.toArray<SVGPathElement>('[data-anim="connector-dash"]');
      const transitionLine = gsap.utils.toArray<SVGLineElement>('[data-anim="transition-line"]');
      const transitionText = gsap.utils.toArray<SVGTextElement>('[data-anim="transition-text"]');
      const levels = gsap.utils.toArray<SVGGElement>('[data-anim="level"]');
      const badges = gsap.utils.toArray<SVGCircleElement>('[data-anim="level-badge"]');

      const lineTargets = [...axisX, ...axisY, ...transitionLine];

      const initDraw = (line: SVGGeometryElement) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      };

      gsap.set(zones, { opacity: 0, x: -6 });
      gsap.set(levels, { opacity: 0, y: 6, scale: 0.98, transformOrigin: '50% 50%' });
      gsap.set(badges, { scale: 0.9, transformOrigin: '50% 50%' });
      gsap.set(connectorDash, { opacity: 0 });
      gsap.set([...axisLabelX, ...axisLabelY], { opacity: 0, y: 4 });
      gsap.set(transitionText, { opacity: 0 });

      lineTargets.forEach(initDraw);
      connectorSolid.forEach(initDraw);

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

      timeline
        .to(zones, { opacity: 1, x: 0, duration: 0.25, stagger: 0.05 })
        .to(lineTargets, { strokeDashoffset: 0, duration: 0.35, stagger: 0.05 }, '-=0.05')
        .to([...axisLabelX, ...axisLabelY], { opacity: 1, y: 0, duration: 0.2 }, '-=0.2')
        .to(connectorSolid, { strokeDashoffset: 0, duration: 0.4 }, '-=0.1')
        .to(connectorDash, { opacity: 1, duration: 0.2 }, '-=0.15')
        .to(transitionLine, { strokeDashoffset: 0, duration: 0.25 }, '-=0.1')
        .to(transitionText, { opacity: 1, duration: 0.2, stagger: 0.05 }, '-=0.1')
        .to(levels, { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06 }, '-=0.05')
        .to(badges, { scale: 1, duration: 0.2, stagger: 0.06 }, '-=0.25');

      gsap.to(connectorDash, {
        strokeDashoffset: -48,
        duration: 3,
        repeat: -1,
        ease: 'none'
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full h-full">
      <DiagramCanvas>{children}</DiagramCanvas>
    </div>
  );
};

export default DiagramAnimations;
