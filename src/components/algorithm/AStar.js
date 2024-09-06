import PriorityQueue from "js-priority-queue";

function isInsideGrid(i, j, grid) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

function manhattanDistance(node, endNode) {
  return Math.abs(node.row - endNode[0]) + Math.abs(node.col - endNode[1]);
}

const aStar = (grid, startNode, endNode) => {
  let arr = grid;
  let visited_nodes = [];
  let shortestPath = [];
  let start_node = startNode;
  let end_node = endNode;
  let pq = new PriorityQueue({
    comparator: function (a, b) {
      return a.totalCost - b.totalCost; // Changed from distance to totalCost
    },
  });

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      arr[i][j].distance = Infinity;
      arr[i][j].heuristic = manhattanDistance(arr[i][j], endNode);
      arr[i][j].totalCost = Infinity;
      arr[i][j].prevNode = null;
      arr[i][j].isVisited = false;
      arr[i][j].isShortestPath = false;
    }
  }

  arr[start_node[0]][start_node[1]].distance = 0;
  arr[start_node[0]][start_node[1]].totalCost =
    arr[start_node[0]][start_node[1]].heuristic;
  pq.queue(arr[start_node[0]][start_node[1]]);

  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];

  while (pq.length) {
    let cell = pq.dequeue();

    if (arr[cell.row][cell.col].isVisited) continue;
    arr[cell.row][cell.col].isVisited = true;
    visited_nodes.push(cell);

    if (cell.row === end_node[0] && cell.col === end_node[1]) {
      let node = cell;
      while (node !== null) {
        shortestPath.unshift(node);
        node = node.prevNode;
        if (node) {
          node.isShortestPath = true;
          node.isVisited = false;
        }
      }
      break;
    }

    for (let i = 0; i < 4; i++) {
      let x = cell.row + dx[i];
      let y = cell.col + dy[i];

      if (!isInsideGrid(x, y, arr)) continue;

      if (
        !arr[x][y].isVisited &&
        (!arr[x][y].isWall || (x === end_node[0] && y === end_node[1]))
      ) {
        const dist = arr[x][y].value; // Uniform cost for all steps
        const tentativeDistance = cell.distance + dist;
        if (tentativeDistance < arr[x][y].distance) {
          arr[x][y].prevNode = cell;
          arr[x][y].distance = tentativeDistance;
          arr[x][y].totalCost = tentativeDistance + arr[x][y].heuristic;
          pq.queue(arr[x][y]);
        }
      }
    }
  }

  return { visited_nodes, shortestPath };
};

export default aStar;
