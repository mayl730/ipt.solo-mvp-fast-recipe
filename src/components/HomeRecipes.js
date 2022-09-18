import React from "react";
import { Link } from "react-router-dom";
import { listRecipeIngredientsByID } from '../utils/index';

export default function HomeRecipes(props) {
  const {recipes, setSelectedRecipe, setSelectedRecipeIngredients} = props;
  return (
    <div className="container mx-auto mt-5">
       <h2 className="text-3xl font-montserrat font-bold text-center text-black-800 my-7">Latest Recipes</h2>
       <div className="grid grid-cols-1 gap-8 desktop:grid-cols-2 relative">
        { recipes.map((item, index) => {
            return (
              <Link to="recipe-detail">
                <div className=""
                    key={item.id}
                    onClick={()=>{
                      setSelectedRecipe(item)
                      listRecipeIngredientsByID(item.id)
                      .then(data =>setSelectedRecipeIngredients(data))
                      }}
                    >
             
                  <figure className="relative">
                    <img src={item.image} alt="food" className="rounded-2xl"></img>
                    <figcaption className="absolute w-full bottom-0 px-5 pb-5 text-2xl font-montserrat text-white bg-gradient-to-t from-black-900 rounded-b-xl">{item.title}</figcaption>
                  </figure>
                </div>
                {/* <figure class="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
                    key={item.id}
                    onClick={()=>{
                      setSelectedRecipe(item)
                      listRecipeIngredientsByID(item.id)
                      .then(data =>setSelectedRecipeIngredients(data))
                      }}>
      
                        <img src={item.image} alt="food" className="absolute inset-0 h-full w-full object-cover rounded-2xl"></img>
                     
                </figure> */}
              </Link>
            )
        })
        }
       </div>
    </div>
  );
}
