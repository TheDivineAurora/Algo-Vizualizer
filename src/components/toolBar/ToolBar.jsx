import React, { useState } from 'react';
import './ToolBar.css';
import { useVisualizer } from '../../contexts/VisualizerContext';

const ToolBar = () => {
  const { sortingState, startPlaying, changeSpeed, changeAlgorithm, updateBarCount } = useVisualizer();
  const [selectedSpeed, setSelectedSpeed] = useState("normal");
  const [inputBarCount, setInputBarCount] = useState(25);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble_sort");

  const handleSpeedChange = (value) => {
    setSelectedSpeed(value);
    changeSpeed(value);
  };

  const handleBarCountChange = (value) => {
    let newBarCount = parseInt(value, 10);
    if (newBarCount < 0) {
      newBarCount = 0;
    } else if (newBarCount > 100) {
      newBarCount = 100;
    }
    setInputBarCount(newBarCount);
    updateBarCount(newBarCount);
  };

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    changeAlgorithm(algorithm);
  };

  const handleStart = () => {
    if (!sortingState.sorting)
      startPlaying();
  };

  return (
    <div id="toolBar" className="toolBarContainer">
      <div className="toolBarOptions">
        <div
          className={`toolBarItem ${selectedAlgorithm === "bubble_sort" ? "selectedAlgorithm" : ""}`}
          onClick={() => handleAlgorithmChange("bubble_sort")}
        >
          Bubble Sort
        </div>
        <div
          className={`toolBarItem ${selectedAlgorithm === "merge_sort" ? "selectedAlgorithm" : ""}`}
          onClick={() => handleAlgorithmChange("merge_sort")}
        >
          Merge Sort
        </div>
        <div
          className={`toolBarItem ${selectedAlgorithm === "quick_sort" ? "selectedAlgorithm" : ""}`}
          onClick={() => handleAlgorithmChange("quick_sort")}
        >
          Quick Sort
        </div>
        <div
          className={`toolBarItem ${selectedAlgorithm === "selection_sort" ? "selectedAlgorithm" : ""}`}
          onClick={() => handleAlgorithmChange("selection_sort")}
        >
          Selection Sort
        </div>
        <div
          className={`toolBarItem ${selectedAlgorithm === "insertion_sort" ? "selectedAlgorithm" : ""}`}
          onClick={() => handleAlgorithmChange("insertion_sort")}
        >
          Insertion Sort
        </div>
        <div
          className={`toolBarItem ${selectedAlgorithm === "radix_sort" ? "selectedAlgorithm" : ""}`}
          onClick={() => handleAlgorithmChange("radix_sort")}
        >
          Radix Sort
        </div>
      </div>
      <div className="toolBarControls">
        <div className="speedControl">
          <label>Speed:</label>
          <select value={selectedSpeed} onChange={(e) => handleSpeedChange(e.target.value)}>
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>
        <div className="barCountControl">
          <label>Bar Count:</label>
          <input
            type="number"
            value={inputBarCount}
            onChange={(e) => handleBarCountChange(e.target.value)}
            min="0"
            max="100"
          />
        </div>
        <button className="playButton" onClick={handleStart}>Play</button>
      </div>
    </div>
  );
};

export default ToolBar;
