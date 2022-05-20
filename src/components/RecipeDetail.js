import React from "react";
import { removeRecipe } from '../utils/index';

export default function RecipeDetail(props) {
  const { setView, selectedRecipe } = props
  return (
    <div className="recipe-detail">
       <h2>Recipe Detail</h2>
       <img src="https://picsum.photos/seed/picsum/180/130
" alt="food"></img>
        <br></br>
       <button onClick={()=>{
         setView("Edit")
       }}>Edit</button>
       <button onClick={()=>{
         removeRecipe(selectedRecipe.id)
         setView("HomeRecipes")
       }}>Delete</button>
       <p>{selectedRecipe.title}</p>
       <p>{selectedRecipe.description}</p>
       <p>Ingridents: {selectedRecipe.ingredients}</p>
       <p>Calories: {selectedRecipe.calories}kcal</p>
       <ul>
         <li>Step1: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
         <li>Step2: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
         <li>Step3: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
       </ul>
       {/* <button onClick={()=>setView("SearchResult")}>Back</button> */}
    </div>
  );
}
