import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ recipe,userID,savedRecipes,setSavedRecipes,setAlertmsg,alertmsg }) {
  const [expanded, setExpanded] = useState({});

const handleExpandClick = (id) => {
  setExpanded(expanded => ({
    ...expanded,
    [id]: !expanded[id],
  }));
};
  const timeheading = `Cooking Time: ${recipe.cookingTime} minutes`;

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
      setAlertmsg("Recipe successfully saved")
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  var cardStyle = {
    display: 'block',
    width: '300px',
    transitionDuration: '0.3s',
    height: "auto",
    marginBlock: "2.5rem" 
}

  return (
    <Card style={cardStyle}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#FF830F" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.name}
        subheader={timeheading}
      />
      <CardMedia
        component="img"
        height="200"
        image={recipe.imageUrl}
        alt="Paella dish"
        sx={{objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.descriptions}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => saveRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}
        
        >  
          <FavoriteIcon  sx={{ color:isRecipeSaved(recipe._id) ? "#FF830F" : "grey"}}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={(recipe) => handleExpandClick(recipe.id)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded[recipe.id]} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          {recipe.ingredients?.map((ingredient) => {
            return <Typography>{ingredient}</Typography>;
          })}
          <Typography paragraph sx={{ marginTop: "16px" }}>
            Method:
          </Typography>
          <Typography>{recipe.instructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
