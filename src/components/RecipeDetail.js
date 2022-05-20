import React from "react";

export default function RecipeDetail(props) {
  const { setView, selectedRecipe } = props
  return (
    <div className="recipe-detail">
       <h2>Recipe Detail</h2>
       <img src="https://picsum.photos/seed/picsum/180/130
" alt="food"></img>
       <p>{JSON.stringify(selectedRecipe)}</p>
       <p>{selectedRecipe.title}</p>
       <p>{selectedRecipe.description}</p>
       <p>{selectedRecipe.calories}</p>
       <ul>
         <li>Step1: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
         <li>Step2: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
         <li>Step3: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
       </ul>
       {/* <button onClick={()=>setView("SearchResult")}>Back</button> */}
    </div>
  );
}
