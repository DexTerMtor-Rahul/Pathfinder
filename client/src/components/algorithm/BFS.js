function isInsideGrid(i, j, grid) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

function bfs(grid, startNode, endNode) {
  let arr = grid;
  let visited_nodes = [];
  let shortestPath = [];
  let queue = [];

  // Reset the grid
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      arr[i][j].prevNode = null;
      arr[i][j].isVisited = false;
      arr[i][j].isShortestPath = false;
    }
  }

  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];

  // Initialize queue with the start node
  queue.push(arr[startNode[0]][startNode[1]]);
  arr[startNode[0]][startNode[1]].isVisited = true;

  while (queue.length > 0) {
    let cell = queue.shift();
    visited_nodes.push(cell);

    // Check if we reached the end node
    if (cell.row === endNode[0] && cell.col === endNode[1]) {
      let node = cell;
      while (node !== null) {
        shortestPath.unshift(node);
        node.isShortestPath = true;
        node.isVisited = false;
        node = node.prevNode;
      }
      break;
    }

    // Explore neighbors in BFS manner
    for (let i = 0; i < 4; i++) {
      let newX = cell.row + dx[i];
      let newY = cell.col + dy[i];

      if (
        isInsideGrid(newX, newY, arr) &&
        !arr[newX][newY].isVisited &&
        !arr[newX][newY].isWall
      ) {
        arr[newX][newY].isVisited = true;
        arr[newX][newY].prevNode = cell;
        queue.push(arr[newX][newY]);
      }
    }
  }

  return { visited_nodes, shortestPath };
}

export default bfs;
