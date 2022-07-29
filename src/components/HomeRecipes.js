import React from "react";
import { listRecipeIngredientsByID } from '../utils/index';

export default function HomeRecipes(props) {
  const {recipes, setView, setSelectedRecipe, setSelectedRecipeIngredients} = props;
  return (
    <div className="home-recipes">

       <h2>Latest Recipes</h2>
       { recipes.map((item, index) => {
          return (
            <div className="one-recipe"
                 key={item.id}
                 onClick={()=>{
                   setSelectedRecipe(item)
                   setView("RecipeDetail")
                   listRecipeIngredientsByID(item.id).then(data =>setSelectedRecipeIngredients(data))
                  }}
                 >
              <img src={item.image} alt="food"></img>
              <h4>{item.title} {item.id}</h4>
            </div>
          )
       })
       }
    </div>
  );
}
