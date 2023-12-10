import React, { useEffect, useRef } from "react";

const EcgTest = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const values = data?.digits?.split(" ").map(Number) || [];
    const amplitude = 30; // Amplitude of the wave
    const frequency = 0.05; // Frequency of the wave
    const speed = 2; // Speed of the animation
    let phase = 0; // Phase of the wave

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const index = Math.floor((x * values.length) / canvas.width);
        const value = values[index % values.length];

        const y = canvas.height / 2 + amplitude * value * Math.sin(frequency * x - phase);
        ctx.lineTo(x, y);
      }

      ctx.stroke();

      phase += speed; // Update phase for animation

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationId);
  }, [data?.digits]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={200}
      style={{ border: "1px solid black" }}
    />
  );
};

export default EcgTest;
