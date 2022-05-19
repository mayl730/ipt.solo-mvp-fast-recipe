import React from "react";

export default function HomeRecipes(props) {
  const {recipes, setView} = props;
  return (
    <div className="home-recipes">
       <h2>Latest Recipes</h2>
       { recipes.map((item, index) => {
          return (
            <div className="one-recipe" onClick={()=>{setView("RecipeDetail")}}>
              <img src="https://api.lorem.space/image/burger?w=180&h=130
" alt="food"></img>
              <h4>{item.title}</h4>
            </div>
          )
       })
       }
       <p>{JSON.stringify(recipes[0])}</p>
    </div>
  );
}
