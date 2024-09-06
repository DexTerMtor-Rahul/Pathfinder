function isInsideGrid(i, j, grid) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

function dfs(grid, startNode, endNode) {
  let visited_nodes = [];
  let shortestPath = [];
  let found = false;

  // Reset the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j].prevNode = null;
      grid[i][j].isVisited = false;
      grid[i][j].isShortestPath = false;
    }
  }

  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];

  // Recursive DFS Helper
  const dfsHelper = (x, y) => {
    if (
      found ||
      !isInsideGrid(x, y, grid) ||
      grid[x][y].isVisited ||
      grid[x][y].isWall
    ) {
      return;
    }

    visited_nodes.push(grid[x][y]);
    grid[x][y].isVisited = true;

    // Check if we've reached the end node
    if (x === endNode[0] && y === endNode[1]) {
      found = true;
      let node = grid[x][y];
      while (node !== null) {
        shortestPath.unshift(node);
        node.isShortestPath = true;
        node = node.prevNode;
      }
      return;
    }

    // Explore neighbors in DFS
    for (let i = 0; i < 4; i++) {
      let newX = x + dx[i];
      let newY = y + dy[i];

      if (
        isInsideGrid(newX, newY, grid) &&
        !grid[newX][newY].isVisited &&
        !grid[newX][newY].isWall
      ) {
        grid[newX][newY].prevNode = grid[x][y];
        dfsHelper(newX, newY);
      }
    }
  };

  dfsHelper(startNode[0], startNode[1]);

  return { visited_nodes, shortestPath };
}

export default dfs;
