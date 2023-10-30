import React, { useState } from "react";

function Grid({ grid, onClick }) {
  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <button className="square" key={cellIndex} onClick={onClick}>
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [grid, setGrid] = useState([]);
  const [color, setColor] = useState("#007BFF");

  const rows = grid.length;
  const columns = grid[0]?.length || 0;

  const addRow = () => {
    if (grid.length === 0) {
      setGrid([[" "]]);
    } else {
      const newRow = new Array(grid[0]?.length || 0).fill(" ");
      setGrid([...grid, newRow]);
    }
  };

  const removeRow = () => {
    if (grid.length === 0) return
    const newGrid = [...grid];
    newGrid.pop();
    setGrid(newGrid);
  }

  const addColumn = () => {
    if (grid.length === 0) {
      setGrid([[" "]]);
    } else {
      const newGrid = grid.map((row) => [...row, " "]);
      setGrid(newGrid);
    }
  };

  const removeColumn = () => {
    if (grid.length === 0) return
    const newGrid = grid.map((row) => {
      const newRow = [...row];
      newRow.pop();
      return newRow;
    });
    setGrid(newGrid[0].length === 0 ? [] : newGrid);
  }

  const changeColor = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);
    
    const colorPickerButton = document.getElementById("colorPickerButton");
    colorPickerButton.style.backgroundColor = selectedColor;

    // Dynamically change text color based on button background color
    const rgb = parseInt(selectedColor.substring(1), 16);   
    const r = (rgb >> 16) & 0xff;  
    const g = (rgb >>  8) & 0xff;  
    const b = (rgb >>  0) & 0xff; 

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (luma > 230) {  
      colorPickerButton.style.boxShadow = "inset 0 0 0 1px #007BFF";
    } else {
      colorPickerButton.style.boxShadow = "none";
    }

    colorPickerButton.style.color = luma < 128 ? 'white' : 'black';
  };

  const onClickCell = (event) => {
    event.target.style.backgroundColor = color;
  }

  return (
    <div className="game">
      <div className="menus">
        <span>{`R: ${rows}`} / {`C: ${columns}`}</span>
        <button onClick={addRow}>Add Row</button>
        <button onClick={addColumn}>Add Column</button>
        <button onClick={removeRow}>Remove Row</button>
        <button onClick={removeColumn}>Remove Column</button>
        <div className="color-button-wrapper">
            <button id="colorPickerButton" className="color-button">Pick Color</button>
            <input id="colorPicker" type="color" className="hidden-color-picker" onInput={changeColor} />
        </div>  
      </div>
      <Grid grid={grid} onClick={onClickCell} />
    </div>
  );
}
