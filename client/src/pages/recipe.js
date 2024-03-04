import React, { useEffect, useState } from "react";
import RecipeReviewCard from "../components/RecipeReviewCard";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

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
      <h1>Recipes</h1>
      <div className="recipesBox">
        {recipes.map((recipe) => (
          <RecipeReviewCard recipe={recipe} userID={userID} savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes}/>
        ))}
      </div>
    </div>
  );
};
