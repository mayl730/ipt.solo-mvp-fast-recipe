import React from "react";
import { Link } from "react-router-dom";
import { listRecipeIngredientsByID } from '../utils/index';

export default function HomeRecipes(props) {
  const {recipes, setSelectedRecipe, setSelectedRecipeIngredients} = props;
  return (
    <div className="home-recipes container">
       <h2 className="text-3xl font-bold underline">Latest Recipes</h2>
       { recipes.map((item, index) => {
          return (
            <Link to="recipe-detail">
              <div className="one-recipe"
                  key={item.id}
                  onClick={()=>{
                    setSelectedRecipe(item)
                    listRecipeIngredientsByID(item.id)
                    .then(data =>setSelectedRecipeIngredients(data))
                    }}
                  >
                <img src={item.image} alt="food"></img>
                <h4>{item.title}</h4>
              </div>
            </Link>
          )
       })
       }
    </div>
  );
}
