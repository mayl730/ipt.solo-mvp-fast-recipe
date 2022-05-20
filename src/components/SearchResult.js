import React from "react";

export default function SearchResult(props) {
  const {filteredRecipes} = props
  return (
    <div className="search-result">
       <h2>{filteredRecipes.length} Result(s)</h2>
       {filteredRecipes.map((item, index) => {
         return (
           <div className="recipe-card">
             <img src="https://picsum.photos/seed/picsum/180/130
" alt="food"></img>
<h4>{item.title}</h4>
            <p>Ingridents: {JSON.stringify(item.ingredients)}</p>
            <p>Calories: {JSON.stringify(item.calories)}</p>
           </div>
         )
       })
       
       }
       <p>{JSON.stringify(filteredRecipes)}</p>
    </div>
  );
}
