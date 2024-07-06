import React from "react";

const Node = ({
  value,
  row,
  col,
  isWall,
  isStart,
  isEnd,
  isVisited,
  isShortestPath,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onMouseUp,
}) => {
  const cName = isStart
    ? "start"
    : isEnd
    ? "end"
    : isWall
    ? "wall"
    : isShortestPath
    ? "path"
    : isVisited
    ? "visited"
    : "";

  return (
    <td
      className={`node_${cName}`}
      id={`node-${row}-${col}`}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseLeave(row, col)}>
      {/* {value} */}
    </td>
  );
};

export default Node;
