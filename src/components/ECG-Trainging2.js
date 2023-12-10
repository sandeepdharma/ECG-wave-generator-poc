// import React, { useEffect, useRef, useState } from "react";

// const ECGTrainging2 = ({ data }) => {
//   const [graphName, setGraphName] = useState("");
//   const canvasRef = useRef(null);
//   const graphContainerRef = useRef(null);

//   useEffect(() => {
//     let parts = data.name.split("_");
//     if (parts.length >= 3) {
//       let extracted = parts.slice(2).join(" ");
//       setGraphName(extracted);
//     }

//     const canvas = canvasRef.current;
//     const graphContainerWidth = graphContainerRef.current.clientWidth;
//     const graphContainerHeight = graphContainerRef.current.clientHeight;
//     canvas.width = graphContainerWidth;
//     canvas.height = graphContainerHeight;

//     let digitsWithoutQuotes = data?.digits?.replace(/"/g, "");
//     let digitsWithCommas = digitsWithoutQuotes?.replace(/\s+/g, ",");
//     let cleanDigits = digitsWithCommas?.replace(/\n|\s{2,}/g, "");
//     let arrayOfNumbers = cleanDigits?.split(",").map(Number);
//     const minValue = Math.min(...arrayOfNumbers);
//     const maxValue = Math.max(...arrayOfNumbers);
//     const valueRange = maxValue - minValue;
//     const verticalScale = canvas.height / valueRange;
//     const verticalOffset = Math.abs(minValue) * verticalScale;

//     const wave = canvas.getContext("2d");
//     const start_value = arrayOfNumbers[0];
//     const distance = canvas.width / arrayOfNumbers.length;
//     const start_point = 0;
//     wave.strokeStyle = "green";
//     wave.lineWidth = 1;
//     wave.strokeStyle = "#00ff00";
//     wave.setTransform(1, 0, 0, -1, 0, canvas.height);
//     wave.beginPath();
//     wave.moveTo(start_point, (start_value + verticalOffset) * verticalScale);
//     wave.lineJoin = "round";
//     arrayOfNumbers.forEach((value, index) => {
//       const new_distance = start_point + distance * (index + 1);
//       const scaledValue = (value + verticalOffset) * verticalScale;
//       wave.lineTo(new_distance, scaledValue);
//     });

//     wave.stroke();
//     wave.closePath();
//   }, [data]);

//   return (
//     <div className="graph-container" ref={graphContainerRef}>
//       <p className="name">{graphName}</p>
//       <canvas className="graph" ref={canvasRef} id="canvas" />
//     </div>
//   );
// };

// export default ECGTrainging2;

import React, { useEffect, useRef, useState } from "react";

const ECGTrainging2 = ({ data }) => {
  const [graphName, setGraphName] = useState("");
  const canvasRef = useRef(null);
  const graphContainerRef = useRef(null);
  const animationRef = useRef(null);
  const phaseRef = useRef(0);
  const animationSpeed = 3; // Adjust animation speed as needed

  useEffect(() => {
    let parts = data.name.split("_");
    if (parts.length >= 3) {
      let extracted = parts.slice(2).join(" ");
      setGraphName(extracted);
    }

    const canvas = canvasRef.current;
    const wave = canvas.getContext("2d");
    const graphContainerWidth = graphContainerRef.current.clientWidth;
    const graphContainerHeight = graphContainerRef.current.clientHeight;
    canvas.width = graphContainerWidth;
    canvas.height = graphContainerHeight;

    let digitsWithoutQuotes = data?.digits?.replace(/"/g, "");
    let digitsWithCommas = digitsWithoutQuotes?.replace(/\s+/g, ",");
    let cleanDigits = digitsWithCommas?.replace(/\n|\s{2,}/g, "");
    let arrayOfNumbers = cleanDigits?.split(",").map(Number);
    const minValue = Math.min(...arrayOfNumbers);
    const maxValue = Math.max(...arrayOfNumbers);
    const valueRange = maxValue - minValue;
    const verticalScale = canvas.height / valueRange;
    const verticalOffset = Math.abs(minValue) * verticalScale;
    const distance = canvas.width / arrayOfNumbers.length;
    // console.log(arrayOfNumbers);
    const drawWave = () => {
      wave.clearRect(0, 0, canvas.width, canvas.height);
      wave.strokeStyle = "green";
      wave.lineWidth = 1;
      wave.strokeStyle = "#00ff00";
      wave.setTransform(1, 0, 0, -1, 0, canvas.height);
      wave.beginPath();
      wave.moveTo(0, (arrayOfNumbers[0] + verticalOffset) * verticalScale);
      wave.lineJoin = "round";
      arrayOfNumbers.forEach((value, index) => {
        const x = distance * (index + 1) - phaseRef.current;
        const scaledValue = (value + verticalOffset) * verticalScale;
        wave.lineTo(x, scaledValue);
      });
      wave.stroke();
      wave.closePath();
    };

    const animate = () => {
      phaseRef.current += animationSpeed;
      drawWave();
      animationRef.current = requestAnimationFrame(animate);

      // Reset the phase to create the looping effect
      if (phaseRef.current >= distance) {
        phaseRef.current = 0;
      }
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [data]);

  return (
    <div className="graph-container" ref={graphContainerRef}>
      <p className="name">{graphName}</p>
      <canvas className="graph" ref={canvasRef} id="canvas" />
    </div>
  );
};

export default ECGTrainging2;
