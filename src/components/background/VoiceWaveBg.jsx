import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const VoiceWaveBg = () => {
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    let animationFrame;

    const waves = [
      { amplitude: 28, wavelength: 320, speed: 0.6, color: "rgba(226, 232, 240, 0.12)" },
      { amplitude: 22, wavelength: 260, speed: 0.4, color: "rgba(209, 213, 219, 0.1)" },
      { amplitude: 18, wavelength: 180, speed: 0.5, color: "rgba(156, 163, 175, 0.08)" },
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (time) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "lighter";

      waves.forEach((wave, waveIndex) => {
        context.beginPath();
        context.strokeStyle = wave.color;
        context.lineWidth = 1.4;

        for (let x = 0; x <= canvas.width; x += 2) {
          const angle = (x / wave.wavelength) * Math.PI * 2 + time * 0.001 * wave.speed;
          const y =
            canvas.height / 2 +
            Math.sin(angle) * wave.amplitude * Math.sin(time * 0.0004 + waveIndex);
          context.lineTo(x, y);
        }
        context.stroke();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 mix-blend-screen opacity-80"
    />
  );
};

export default VoiceWaveBg;


