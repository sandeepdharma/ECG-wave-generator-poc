import React, { useEffect, useState } from "react";
import ECGTrainging2 from "./components/ECG-Trainging2";
import data from "./hl7tojson.json";
import "./App.css";

const App = () => {
  const [waveData, setWaveData] = useState([
    {
      name: "",
      digits: "",
    },
  ]);

  useEffect(() => {
    const newData =
      data?.AnnotatedECG.component.series.component.sequenceSet.component.map(
        (item) => ({
          name: item.sequence.code["@code"],
          digits: item.sequence.value?.digits || "",
        })
      );

    const filteredData = newData.filter(
      (item) => item.name !== "" && item.digits !== ""
    );
    setWaveData(filteredData);
  }, []);

  return (
    <div className="main">
      <div className="ecg-container">
        {waveData.map((waveItem, index) => (
          <ECGTrainging2 key={index} data={waveItem} />
        ))}
      </div>
      <div className="scaling-container">
        <div className="bpm">bpm</div>
        <div className="st">st</div>
        <div className="spo2">spo2</div>
        <div className="nbm">nbm</div>
      </div>
    </div>
  );
};

export default App;
