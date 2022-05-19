import React from "react";

export default function SearchResult(props) {
  const {filteredRecipes} = props
  return (
    <div className="search-result">
       <h2>0 Result</h2>
       <p>{JSON.stringify(filteredRecipes)}</p>
    </div>
  );
}
