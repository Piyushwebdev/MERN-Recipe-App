import React, { useEffect, useState } from "react";
import RecipeReviewCard from "../components/RecipeReviewCard";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [alertmsg,setAlertmsg]=useState("")
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);


  return (
    <div>
          {alertmsg?<Alert variant="filled" severity="success" onClose={() => {setAlertmsg("")}}>
        {alertmsg}
      </Alert>:""}
      <h1 style={{paddingLeft:"1rem"}}>Recipes</h1>
      <div className="recipesBox">
        {recipes.map((recipe) => (
          <RecipeReviewCard recipe={recipe} userID={userID} savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes} setAlertmsg={setAlertmsg} alertmsg={alertmsg}/>
        ))}
      </div>
    </div>
  );
};
