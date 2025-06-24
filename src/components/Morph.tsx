'use client';

import { type JSX, useEffect, useRef } from 'react';
import '../style.css';

export default function Morph({
  texts,
  size = 90,
}: {
  texts: string[];
  size?: number;
}): JSX.Element {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const morphTime = 2;
  const cooldownTime = 0.5;

  let textIndex = texts.length - 1;
  let lastFrameTime = performance.now();
  let morph = 0;
  let cooldown = cooldownTime;

  useEffect(() => {
    const elts = {
      text1: text1Ref.current,
      text2: text2Ref.current,
    };

    // Set initial font size
    if (elts.text1) {
      elts.text1.style.fontSize = `${size}px`;
    }
    if (elts.text2) {
      elts.text2.style.fontSize = `${size}px`;
    }

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const setMorph = (fraction: number) => {
      if (elts.text2) {
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 10, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.7) * 100}%`;
      }

      fraction = 1 - fraction;

      if (elts.text1) {
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 10, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.7) * 100}%`;
        elts.text1.textContent = texts[textIndex % texts.length];
      }

      if (elts.text2) {
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      }
    };

    const doCooldown = () => {
      morph = 0;

      if (elts.text2) {
        elts.text2.style.filter = '';
        elts.text2.style.opacity = '100%';
      }

      if (elts.text1) {
        elts.text1.style.filter = '';
        elts.text1.style.opacity = '0%';
      }
    };

    let animationFrame: number;

    const animate = () => {
      const shouldIncrementIndex = cooldown > 0;
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastFrameTime) / 1000;
      lastFrameTime = currentTime;

      cooldown -= deltaTime;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }
        doMorph();
      } else {
        doCooldown();
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [texts, size]);

  return (
    <div className="relative inline-block">
      <div
        id="container"
        ref={containerRef}
        className="relative flex items-center justify-center"
        style={{ minHeight: `${size * 1.2}px` }}>
        <span
          id="text1"
          ref={text1Ref}
          style={{
            fontSize: `${size}px`,
            lineHeight: '1.1',
          }}
        />
        <span
          id="text2"
          ref={text2Ref}
          style={{
            fontSize: `${size}px`,
            lineHeight: '1.1',
          }}
        />
      </div>

      <svg className="absolute opacity-0 pointer-events-none">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
