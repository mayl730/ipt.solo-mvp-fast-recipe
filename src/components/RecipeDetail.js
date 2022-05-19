import React from "react";

export default function RecipeDetail(props) {
  const { setView } = props
  return (
    <div className="recipe-detail">
       <h2>Recipe Detail</h2>
       <button onClick={()=>setView("SearchResult")}>Back To Result Page</button>
    </div>
  );
}
