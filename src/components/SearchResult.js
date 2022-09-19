import React from "react";
import { Link } from "react-router-dom";
import { listRecipeIngredientsByID } from '../utils/index';
import { P1, H2, H4 } from './ui/Fonts';
import { MdAccessTime } from "react-icons/md";

export default function SearchResult(props) {
  const {filteredRecipes, setSelectedRecipe, setSelectedRecipeIngredients} = props
  return (
    <div className="container mx-auto px-5">

      <H2 className="">{filteredRecipes.length} Recipe(s)</H2>
       {filteredRecipes.map((item, index) => {
         return (
          <Link to="/recipe-detail">
           <div className="grid grid-cols-1 mb-10 desktop:grid-cols-2 hover:opacity-80"
                onClick={()=>{
                  setSelectedRecipe(item)
                  listRecipeIngredientsByID(item.id).then(data =>setSelectedRecipeIngredients(data))
                }}
           >
             <img src={item.image} alt="food" className="rounded-2xl"></img>

            <div className="desktop:ml-10">
              <H4>{item.title}</H4>
              <div className="opacity-80 text-base font-cabin text-black-800">
                <MdAccessTime className="inline mr-1.5"></MdAccessTime>
                <span className="inline align-middle">38 minutes</span>
                <p className="inline align-middle mx-3">|</p>
                <p className="inline align-middle">{JSON.stringify(item.calories)} kcal</p>
              </div>
     
              <P1>{item.description.substring(0, 250)}</P1>
              <P1 className="opacity-60">Ingridents: {item.ingredients.map(function(item){return item;}).join(', ')}</P1>
            </div>

           </div>
          </Link>

         )
       })
       }
    </div>
  );
}
