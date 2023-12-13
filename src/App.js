import React, { useEffect, useState } from "react";
import ECGTrainging2 from "./components/ECG-Trainging2";
import "./App.css";
import { _getEcgData } from "./services/data";
import Test from "./components/Test";

const App = () => {
  const [waveData, setWaveData] = useState([
    // {
    //   name: "",
    //   digits: "",
    // },
  ]);
  useEffect(() => {
    _getEcgData().then((result) => {
      let data =
        result.data.component.series.component.sequenceSet.component.map(
          (item) => ({
            name: item.sequence.code["@code"],
            digits: item.sequence.value?.digits || "",
          })
        );
      const filteredData = data.filter(
        (item) => item.name !== "" && item.digits !== ""
      );
      setWaveData(filteredData);
      // console.log(filteredData);
    });
  }, []);
  return (
    <div className="main">
      <div className="ecg-container">
        {waveData.map((waveItem, index) => (
          <Test key={index} data={waveItem} />
        ))}
        {/* {waveData.map((waveItem, index) => (
          <ECGTrainging2 key={index} data={waveItem} />
        ))} */}
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
