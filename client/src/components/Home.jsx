import { AppBar, IconButton, Paper, Button, Box } from "@mui/material";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../styles/Home.css";

const AppBarStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.7rem",
  backgroundColor: "white",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
  position: "sticky",
  borderRadius: "0px 0px 10px 10px",
};

const BannerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  margin: "2rem auto",
  width: "70%",
  height: "400px",
  backgroundColor: "#FF0000",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
  borderRadius: "30px",
};

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/pathfinder");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/DexTerMtor-Rahul/Pathfinder", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/dextermtor-rahulraj/", "_blank");
  };

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <AppBar position="static" style={AppBarStyle}>
          <div className="appbar-title">
            {" "}
            <span> Pathfinder</span>
            Visualizer
          </div>
          <div>
            <IconButton
              onClick={handleGitHubClick}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}>
              <GitHubIcon
                sx={{
                  fontSize: 30,
                  color: "#FF0000",
                  marginRight: "1rem",
                }}
              />
            </IconButton>
            <IconButton
              onClick={handleLinkedInClick}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}>
              <LinkedInIcon
                sx={{
                  fontSize: 30,
                  color: "#FF0000",
                  marginRight: "1rem",
                }}
              />
            </IconButton>
          </div>
        </AppBar>

        <Paper elevation={3} style={BannerStyle}>
          <div className="main-title">Pathfinder Visualizer</div>
          <Box className="description-title">
            <p>
              Explore and understand the power of shortest path algorithms with
              our interactive visualizer. Whether you're a student, a teacher,
              or just a curious mind, our app brings complex algorithms to life,
              making it easy to see how they work. Choose from popular
              algorithms like Dijkstra's, A*, and Bellman-Ford, and watch them
              find the shortest path in real-time. Dive into the world of graph
              theory and enhance your learning with our intuitive and engaging
              tool.
            </p>
          </Box>
          <div>
            <Button
              sx={{
                fontSize: "1.5rem",
                padding: "0.5rem 2rem",
                borderRadius: "10px",
                color: "#FF0000",
                backgroundColor: "white",

                "&:hover": {
                  backgroundColor: "#f77e7e",
                  color: "white",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                },
              }}
              color="primary"
              onClick={handleNavigate}>
              Start Visualization
            </Button>
          </div>
        </Paper>
      </div>
    </HelmetProvider>
  );
};

export default Home;
