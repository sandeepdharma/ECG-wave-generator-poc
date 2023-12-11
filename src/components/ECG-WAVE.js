import React, { useEffect, useRef } from "react";

const EcgWave = () => {
  const canvasRef = useRef(null);
  const y = [
    -2,
    -2,
    -2,
    -2,
    -3,
    -4,
    -3,
    -5,
    -5,
    -4,
    // -6,
    // -9,
    // -9,
    // -8,
    // -6,
    // -4,
    // -6,
    // -10,
    // -10,
    // -9,
    // -9,
    // -9,
    // -7,
    // -7,
    // -7,
    // -7,
    // -6,
    // -3,
    // -3,
    // -2,
    // 0,
    // 1,
    // 1,
    // 2,
    // 0,
    // -2,
    // -4,
    // -5,
    // -5,
    // -3,
    // -4,
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawEcgWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // X-axis scaling factor
      const scaleX = canvas.width / y.length; // Adjust this factor based on canvas width and number of data points
      // Y-axis scaling factor
      const scaleY = canvas.height / y.length; // Adjust this factor based on canvas height and maximum y value

      // Loop through the data points in y array
      y.forEach((value, index) => {
        // Calculate x position based on index
        const xPos = (index + 1) * scaleX;
        // Calculate y position based on value and y scaling factor
        const yPos = canvas.height / 2 + value * scaleY;

        // Draw points or lines connecting them
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      });

      // Set line color, width, and stroke
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawEcgWave();
  }, []); // Empty dependency array, assuming y is a constant

  return <canvas ref={canvasRef} width={400} height={1400} />;
};

export default EcgWave;
