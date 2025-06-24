'use client';

import { useRef, useEffect, useState } from 'preact/hooks';

interface ParticleTextProps {
  text: string;
  baseFontSize?: number;
  fontFamily?: string;
  particleSize?: number;
  particleCount?: number;
  className?: string;
  padding?: number;
  animated?: boolean;
}

export default function ParticleText({
  text,
  baseFontSize = 8, // Base size as percentage of viewport width
  fontFamily = 'Arial Black, sans-serif',
  particleSize = 1,
  particleCount = 3000,
  className = '',
  padding = 15,
  animated = true,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get theme colors from CSS custom properties
    const getThemeColors = () => {
      const computedStyle = getComputedStyle(document.documentElement);

      // Extract HSL values and convert to usable format
      const primary = computedStyle.getPropertyValue('--primary').trim();
      const accent = computedStyle.getPropertyValue('--accent').trim();
      const foreground = computedStyle.getPropertyValue('--foreground').trim();

      // Parse HSL values (format: "220 80% 50%")
      const parseHSL = (hslString: string) => {
        const parts = hslString.split(' ');
        return {
          h: parseInt(parts[0]) || 220,
          s: parseInt(parts[1]) || 80,
          l: parseInt(parts[2]) || 50,
        };
      };

      const primaryHSL = parseHSL(primary);
      const accentHSL = parseHSL(accent);
      const foregroundHSL = parseHSL(foreground);

      return {
        primary: primaryHSL,
        accent: accentHSL,
        foreground: foregroundHSL,
      };
    };

    const updateCanvasSize = () => {
      // Calculate responsive font size based on viewport width
      const viewportWidth = window.innerWidth;
      const calculatedFontSize = Math.min(
        Math.max(viewportWidth * (baseFontSize / 100), 30),
        120
      );

      // Measure text dimensions
      ctx.font = `900 ${calculatedFontSize}px ${fontFamily}`;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = calculatedFontSize;

      // Set canvas size with padding
      const canvasWidth = Math.ceil(textWidth + padding * 2);
      const canvasHeight = Math.ceil(textHeight + padding * 2);

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Update container size
      container.style.width = `${canvasWidth}px`;
      container.style.height = `${canvasHeight}px`;

      setDimensions({ width: canvasWidth, height: canvasHeight });

      return calculatedFontSize;
    };

    let currentFontSize = updateCanvasSize();

    let particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      life: number;
      maxLife: number;
      colorIndex: number;
      opacity: number;
      opacitySpeed: number;
      pulsePhase: number;
    }[] = [];

    let textImageData: ImageData | null = null;

    function createTextImage() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'white'; // Use white for text measurement
      ctx.save();

      ctx.font = `900 ${currentFontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Center the text in the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.fillText(text, centerX, centerY);
      ctx.restore();

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function createParticle() {
      if (!ctx || !canvas || !textImageData) return null;

      const data = textImageData.data;

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const maxLife = Math.random() * 200 + 100;
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * particleSize + 0.5,
            life: maxLife,
            maxLife: maxLife,
            colorIndex: Math.floor(Math.random() * 3), // 0: primary, 1: accent, 2: foreground
            opacity: Math.random() * 0.6 + 0.4,
            opacitySpeed: (Math.random() - 0.5) * 0.01,
            pulsePhase: Math.random() * Math.PI * 2,
          };
        }
      }

      return null;
    }

    function createInitialParticles() {
      // Scale particle count based on text area
      const textArea = dimensions.width * dimensions.height;
      const scaleFactor = textArea / (800 * 200);
      const adjustedParticleCount = Math.floor(
        particleCount * Math.min(scaleFactor, 1)
      );

      for (let i = 0; i < adjustedParticleCount; i++) {
        const particle = createParticle();
        if (particle) particles.push(particle);
      }
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;

      animationTimeRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const themeColors = getThemeColors();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth return to base position
        p.x += (p.baseX - p.x) * 0.1;
        p.y += (p.baseY - p.y) * 0.1;

        if (animated) {
          // Animate opacity with subtle pulse effect
          const pulseEffect =
            Math.sin(animationTimeRef.current * 2 + p.pulsePhase) * 0.2;
          p.opacity += p.opacitySpeed;
          p.opacity = Math.max(0.3, Math.min(0.9, p.opacity));

          const finalOpacity = Math.max(0.4, p.opacity + pulseEffect);

          // Create theme-based colors
          let color: { h: number; s: number; l: number };

          switch (p.colorIndex) {
            case 0: // Primary color with slight variation
              color = {
                h:
                  themeColors.primary.h +
                  Math.sin(animationTimeRef.current + p.pulsePhase) * 10,
                s: Math.max(
                  40,
                  themeColors.primary.s +
                    Math.sin(animationTimeRef.current * 0.5 + p.pulsePhase) * 20
                ),
                l: Math.max(
                  30,
                  Math.min(
                    80,
                    themeColors.primary.l +
                      Math.sin(animationTimeRef.current * 0.3 + p.pulsePhase) *
                        15
                  )
                ),
              };
              break;
            case 1: // Accent color with variation
              color = {
                h:
                  themeColors.accent.h +
                  Math.sin(animationTimeRef.current * 0.7 + p.pulsePhase) * 15,
                s: Math.max(
                  30,
                  themeColors.accent.s +
                    Math.sin(animationTimeRef.current * 0.4 + p.pulsePhase) * 25
                ),
                l: Math.max(
                  25,
                  Math.min(
                    75,
                    themeColors.accent.l +
                      Math.sin(animationTimeRef.current * 0.6 + p.pulsePhase) *
                        20
                  )
                ),
              };
              break;
            default: // Foreground-based color (more subtle)
              color = {
                h:
                  themeColors.primary.h +
                  Math.sin(animationTimeRef.current * 0.3 + p.pulsePhase) * 30,
                s: Math.max(
                  20,
                  60 +
                    Math.sin(animationTimeRef.current * 0.2 + p.pulsePhase) * 20
                ),
                l: Math.max(
                  40,
                  Math.min(
                    70,
                    55 +
                      Math.sin(animationTimeRef.current * 0.4 + p.pulsePhase) *
                        15
                  )
                ),
              };
          }

          ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${finalOpacity})`;
        } else {
          // Static theme color
          const primaryColor = themeColors.primary;
          ctx.fillStyle = `hsl(${primaryColor.h}, ${primaryColor.s}%, ${primaryColor.l}%)`;
        }

        // Add slight size variation for more organic feel
        const sizeVariation = animated
          ? 1 + Math.sin(animationTimeRef.current * 1.5 + p.pulsePhase) * 0.2
          : 1;
        const finalSize = p.size * sizeVariation;

        ctx.fillRect(
          p.x - finalSize / 2,
          p.y - finalSize / 2,
          finalSize,
          finalSize
        );

        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle();
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      // Maintain particle count
      const textArea = dimensions.width * dimensions.height;
      const scaleFactor = textArea / (800 * 200);
      const targetParticleCount = Math.floor(
        particleCount * Math.min(scaleFactor, 1)
      );

      while (particles.length < targetParticleCount) {
        const newParticle = createParticle();
        if (newParticle) particles.push(newParticle);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    createTextImage();
    createInitialParticles();
    animate();

    const handleResize = () => {
      currentFontSize = updateCanvasSize();
      createTextImage();
      particles = [];
      createInitialParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    text,
    baseFontSize,
    fontFamily,
    particleSize,
    particleCount,
    padding,
    animated,
    dimensions.width,
    dimensions.height,
  ]);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ background: 'transparent' }}>
      <canvas
        ref={canvasRef}
        className="block"
        style={{ background: 'transparent' }}
        aria-label={`Particle text displaying: ${text}`}
      />
    </div>
  );
}
