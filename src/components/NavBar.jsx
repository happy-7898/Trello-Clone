import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  function handleGoHome() {
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}
            onClick={handleGoHome}
          >
            <HomeIcon />
          </IconButton>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              Trello
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
