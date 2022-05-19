import React from "react";

export default function SearchBar(props) {
  const {setView} = props;
  return (
    <div className="search-bar">
       <input placeholder="Search Recipe Name"/>
       <input placeholder="Ingridents (with spaces)"/>
       <select>
        <option value="">--Calories--</option>
        <option value="fruit">Under 400</option>
        <option value="vegetable">400-600</option>
        <option value="meat">600-800</option>
        <option value="meat">over 900</option>
      </select>

      <button onClick={()=>{setView("SearchResult")}}>Search</button>

    </div>
  );
}
