import React from "react";
import { listRecipeIngredientsByID } from '../utils/index';

export default function SearchResult(props) {
  const {filteredRecipes, setView, setSelectedRecipe, setSelectedRecipeIngredients} = props
  return (
    <div className="search-result">
       <h2>{filteredRecipes.length} Result(s)</h2>
       {filteredRecipes.map((item, index) => {
         return (
           <div className="recipe-card"
                onClick={()=>{
                  setSelectedRecipe(item)
                  setView("RecipeDetail")
                  listRecipeIngredientsByID(item.id).then(data =>setSelectedRecipeIngredients(data))
                }}
           >
             <img src={item.image} alt="food"></img>
             <h4>{item.title} id: {item.id}</h4>
            <p>Ingridents: {item.ingredients.map(function(item){return item;}).join(', ')}</p>
            <p>Calories: {JSON.stringify(item.calories)}</p>
           </div>
         )
       })
       
       }
       {/* <p>{JSON.stringify(filteredRecipes)}</p> */}
    </div>
  );
}
