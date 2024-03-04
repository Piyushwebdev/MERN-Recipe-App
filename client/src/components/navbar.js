import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from '@mui/material/Button';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {/* <Link to="/about">About</Link>  */}
      <Link to="/recipes">Recipes</Link> 
      <Link to="/saved-recipes">Saved Recipes</Link>
      <Link to="/create-recipe">Add Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <Button variant="contained" sx={{ ":hover": {
          backgroundColor: "#FFA500",
          borderColor: "#FFA500",
        },backgroundColor:"#FF830F"}} onClick={logout}> Logout </Button>
      )}
    </div>
  );
};
