import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from '@mui/material/Button';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe Blog
          </Typography>
          {!cookies.access_token ? (
            <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit' }}>Login/Register</Link>
          ) : (
            <Button variant="contained" onClick={logout}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={closeDrawer}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={closeDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/recipes" onClick={closeDrawer}>
            <ListItemText primary="Recipes" />
          </ListItem>
          <ListItem button component={Link} to="/saved-recipes" onClick={closeDrawer}>
            <ListItemText primary="Saved Recipes" />
          </ListItem>
          <ListItem button component={Link} to="/create-recipe" onClick={closeDrawer}>
            <ListItemText primary="Add Recipe" />
          </ListItem>
          <Divider />
          {!cookies.access_token && (
            <ListItem button component={Link} to="/auth" onClick={closeDrawer}>
              <ListItemText primary="Login/Register" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
};
