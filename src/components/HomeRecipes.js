import React from "react";

export default function HomeRecipes(props) {
  const {recipes, setView, setSelectedRecipe } = props;
  return (
    <div className="home-recipes">
       <h2>Latest Recipes</h2>
       { recipes.map((item, index) => {
          return (
            <div className="one-recipe"
                 onClick={()=>{
                   setSelectedRecipe(item)
                   setView("RecipeDetail")
                  }}
                 >
              <img src="https://picsum.photos/seed/picsum/180/130
" alt="food"></img>
              <h4>{item.title}</h4>
            </div>
          )
       })
       }
       {/* <p>{JSON.stringify(recipes[0])}</p> */}
    </div>
  );
}
