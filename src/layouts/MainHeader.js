import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import { Avatar, Divider } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
function MainHeader() {
  // const [auth, setAuth] = React.useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      handleProfileMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
    >
      <Box sx={{ my: 1.5, px: 1.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dash" }} />
      <MenuItem
        onClick={handleProfileMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My profile
      </MenuItem>
      <MenuItem
        onClick={handleProfileMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>
      <Divider sx={{ borderStyle: "dash" }} />
      <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoderComm
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <Avatar
              src={user?.avatarUrl}
              alt="Avatar"
              onClick={handleProfileMenuOpen}
            />
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
