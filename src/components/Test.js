import React, { useEffect, useRef, useState } from "react";

const ECGSimulation = ({ data }) => {
  let digitsWithoutQuotes = data?.digits?.replace(/"/g, "");
  let digitsWithCommas = digitsWithoutQuotes?.replace(/\s+/g, ",");
  let cleanDigits = digitsWithCommas?.replace(/\n|\s{2,}/g, "");
  let arrayOfNumbers = cleanDigits?.split(",").map(Number);
  const [graphName, setGraphName] = useState("");
  const canvasRef = useRef(null);
  const graphContainerRef = useRef(null);
  const phaseRef = useRef(0);
  const [count, setCount] = useState(0);
  const fps = 500;
  setTimeout(() => {
    setCount(count + 1);
  }, 19000);
  useEffect(() => {
    const ecgData = arrayOfNumbers;
    const canvas = canvasRef.current;
    const wave = canvas.getContext("2d");
    const minValue = Math.min(...ecgData);
    const maxValue = Math.max(...ecgData);
    const valueRange = maxValue - minValue;
    const verticalScale = canvas.height / valueRange;
    const verticalOffset = Math.abs(minValue) * verticalScale;
    const distance = canvas.width / ecgData.length;
    wave.fillStyle = "black";
    wave.fillRect(0, 0, canvas.width, canvas.height);

    let parts = data.name.split("_");
    if (parts.length >= 3) {
      let extracted = parts.slice(2).join(" ");
      setGraphName(extracted);
    }
    let n = 1;

    const drawWave = () => {
      setTimeout(() => {
        wave.lineWidth = 1;
        wave.strokeStyle = "#00ff00";
        wave.setTransform(1, 0, 0, -1, 0, canvas.height);
        n += 1;
        if (n >= ecgData.length) {
          n = 1;
        }
        wave.beginPath();
        wave.moveTo(0, (ecgData[0] + verticalOffset) * verticalScale);
        wave.lineJoin = "round";
        ecgData.forEach((value, index) => {
          const x = distance * (index + 1) - phaseRef.current;
          const y = (value + verticalOffset) * verticalScale;
          wave.lineTo(x, y);
          console.log(x, y);
        });

        wave.stroke();
        wave.clearRect(n + 1, 0, 10, canvas.height);
        requestAnimationFrame(drawWave);
      }, [1000 / fps]);
    };
    drawWave();
  }, [arrayOfNumbers, data.name, count]);

  return (
    <div className="graph-container" ref={graphContainerRef}>
      <p className="name">{graphName}</p>
      <canvas className="graph" ref={canvasRef} id="canvas" />
    </div>
  );
};

export default ECGSimulation;
