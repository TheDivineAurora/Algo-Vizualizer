import React from 'react';
import './Body.css';
import { useVisualizer } from '../../contexts/VisualizerContext';

const Body = () => {
  const { sortingState } = useVisualizer();

  const getColorForState = (state) => {
    switch (state) {
      case "selected":
        return "rgb(255, 5, 238)"; 
      default:
        return "rgb(0, 208, 255)"; 
    }
  };

  return (
    <div id="bodyContainer" className="bodyContainer">
      {sortingState.array.map((item, index) => (
        <div
          key={index}
          className="bar"
          style={{
            height: `${Math.floor(item.value / 2)}px`,
            backgroundColor: getColorForState(item.state),
          }}
        />
      ))}
    </div>
  );
};

export default Body;
