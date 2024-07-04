import React, { useState, useEffect } from "react";
import "../styles/Pathfinding.css";
import Node from "./Node";

const Pathfinder = () => {
  const [grid, setGrid] = useState([]);
  const [srcDesClicked, setSrcDesClicked] = useState("");
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  const makeGrid = () => {
    const rowSize = 20;
    const colSize = 20;
    let newGrid = [];
    for (let row = 0; row < rowSize; row++) {
      let currentRow = [];
      for (let col = 0; col < colSize; col++) {
        currentRow.push({
          value: 1,
          row: row,
          col: col,
          isVisited: false,
          isShortestPath: false,
          isWall: false,
        });
        try {
          document.getElementById(`node-${row}-${col}`).className = "node__";
        } catch (e) {}
      }
      newGrid.push(currentRow);
    }

    const start_x = Math.floor(Math.random() * rowSize);
    const start_y = Math.floor(Math.random() * colSize);
    const end_x = Math.floor(Math.random() * rowSize);
    const end_y = Math.floor(Math.random() * colSize);

    newGrid[start_x][start_y].isStart = true;
    newGrid[end_x][end_y].isEnd = true;

    setGrid(newGrid);
    setStartNode(newGrid[start_x][start_y]);
    setEndNode(newGrid[end_x][end_y]);
  };

  const handleMouseDown = (row, col) => {
    let newGrid = [...grid];
    if (newGrid[row][col].isStart || newGrid[row][col].isEnd) {
      setSrcDesClicked("block");
    }
    if (!newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
    }
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    let newGrid = [...grid];
    if (srcDesClicked === "block") {
      newGrid[row][col].isStart = true;
      newGrid[row][col].isEnd = true;
      newGrid[row][col].isWall = false;
      setStartNode(newGrid[row][col]);
    } else {
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
    }
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseLeave = (row, col) => {
    let newGrid = [...grid];
    if (srcDesClicked !== "") {
      newGrid[row][col].isStart = false;
      newGrid[row][col].isEnd = false;
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setSrcDesClicked("");
  };

  useEffect(() => {
    makeGrid();
  }, []);

  return (
    <>
      <table>
        <tbody>
          {grid.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((element, i) => {
                  return (
                    <Node
                      key={i}
                      row={index}
                      col={i}
                      isWall={element.isWall}
                      isStart={element.isStart}
                      isEnd={element.isEnd}
                      isVisited={element.isVisited}
                      isShortestPath={element.isShortestPath}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseLeave={(row, col) => handleMouseLeave(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Pathfinder;
