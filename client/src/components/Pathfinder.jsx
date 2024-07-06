import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/Pathfinding.css";
import Node from "./Node";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TableContainer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Dijkstra from "./algorithm/Dijkstras";

const tableStyle = {
  margin: "auto",
  padding: "10px",
  width: "fit-content",
};

const Pathfinder = () => {
  const [grid, setGrid] = useState([]);
  const [mainClicked, setMainClicked] = useState("");
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(0);
  const [shortestPathNodes, setShortestPathNodes] = useState(0);
  const animating = useRef(false);

  const makeGrid = useCallback(() => {
    if (animating.current) return;

    // take the size of the according to the screen size
    const rowSize = Math.floor((window.innerHeight - 70) / 30);
    const colSize = Math.floor(window.innerWidth / 30);

    let newGrid = [];
    for (let row = 0; row < rowSize; row++) {
      let currentRow = [];
      for (let col = 0; col < colSize; col++) {
        currentRow.push({
          value: Math.floor(Math.random() * 10) + 1,
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
    setStartNode([start_x, start_y]);
    setEndNode([end_x, end_y]);
    setVisitedNodes(0);
    setShortestPathNodes(0);
  }, []);

  const handleMouseDown = (row, col) => {
    if (animating.current) return;

    let newGrid = [...grid];
    if (newGrid[row][col].isStart) {
      setMainClicked("start");
    } else if (newGrid[row][col].isEnd) {
      setMainClicked("end");
    }

    if (!newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
    }
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || animating.current) return;

    let newGrid = [...grid];
    if (mainClicked === "start") {
      newGrid[row][col].isStart = true;
      newGrid[row][col].isWall = false;
      setStartNode([row, col]);
    } else if (mainClicked === "end") {
      newGrid[row][col].isEnd = true;
      newGrid[row][col].isWall = false;
      setEndNode([row, col]);
    } else {
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
    }
    setGrid(newGrid);
  };

  const handleMouseLeave = (row, col) => {
    if (animating.current) return;
    let newGrid = [...grid];
    if (mainClicked !== "") {
      newGrid[row][col].isStart = false;
      newGrid[row][col].isEnd = false;
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    if (animating.current) return;
    setMouseIsPressed(false);
    setMainClicked("");
  };

  useEffect(() => {
    makeGrid();
    const handleResize = () => makeGrid();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [makeGrid]);

  //function for using dijkstra algorithm and visualizing it

  const dijkstraSearch = (e) => {
    e.preventDefault();
    if (animating.current) return;

    const { visited_nodes, shortestPath } = Dijkstra(grid, startNode, endNode);
    animating.current = true;

    const animate = async () => {
      for (const node of visited_nodes) {
        if (
          !grid[node.row][node.col].isStart &&
          !grid[node.row][node.col].isEnd
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node_visited";
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      for (const node of shortestPath) {
        if (
          !grid[node.row][node.col].isStart &&
          !grid[node.row][node.col].isEnd
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node_path";
        }
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      setVisitedNodes(visited_nodes.length);
      setShortestPathNodes(shortestPath.length);
      animating.current = false;
    };

    animate();
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FF0000",
          borderRadius: "10px",
          boxShadow: "none",
        }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "block" },
            }}>
            Pathfinder
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: "flex-start",
            }}>
            <Button color="inherit" component={NavLink} to="/" exact="true">
              Home
            </Button>
            <Button color="inherit" onClick={makeGrid}>
              Clear
            </Button>
          </Box>

          <Box
            component="form"
            sx={{ display: { xs: "none", sm: "flex" } }}
            onSubmit={dijkstraSearch}>
            <Button type="submit" color="inherit" variant="outlined">
              Find Path
            </Button>
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}>
            <Box
              sx={{
                width: 250,
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}>
              <List>
                <ListItem button component={NavLink} to="/" exact="true">
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={makeGrid}>
                  <ListItemText primary="Clear" />
                </ListItem>
                <ListItem button onClick={dijkstraSearch}>
                  <ListItemText primary="Find Path" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>

      <TableContainer style={tableStyle}>
        <table>
          <tbody>
            {grid.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((element, i) => {
                    return (
                      <Node
                        value={element.value}
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
      </TableContainer>
    </div>
  );
};

export default Pathfinder;
