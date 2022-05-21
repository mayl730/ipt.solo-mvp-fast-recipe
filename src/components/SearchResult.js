import React from "react";

export default function SearchResult(props) {
  const {filteredRecipes, setView, setSelectedRecipe} = props
  return (
    <div className="search-result">
       <h2>{filteredRecipes.length} Result(s)</h2>
       {filteredRecipes.map((item, index) => {
         return (
           <div className="recipe-card"
                onClick={()=>{
                  setSelectedRecipe(item)
                  setView("RecipeDetail")
                }}
           >
             <img src="https://picsum.photos/seed/picsum/180/130
" alt="food"></img>
<h4>{item.title}</h4>
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
