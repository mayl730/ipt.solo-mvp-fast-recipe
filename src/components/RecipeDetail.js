import React from "react";

export default function RecipeDetail(props) {
  const { setView, selectedRecipe } = props
  return (
    <div className="recipe-detail">
       <h2>Recipe Detail</h2>
       <img src="https://api.lorem.space/image/burger?w=180&h=130
" alt="food"></img>
       <p>{JSON.stringify(selectedRecipe)}</p>
       <p>{selectedRecipe.title}</p>
       <p>{selectedRecipe.description}</p>
       <p>{selectedRecipe.calories}</p>
       <button onClick={()=>setView("SearchResult")}>Back</button>
    </div>
  );
}
