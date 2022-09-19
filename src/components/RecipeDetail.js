import { Link } from "react-router-dom";
import React from "react"
import { ButtonIcon } from './ui/Buttons';
import { H3, H4 } from './ui/Fonts';
import { removeRecipe } from '../utils/index';
import { MdModeEdit, MdDeleteForever, MdAccessTime } from "react-icons/md";

export default function RecipeDetail(props) {
  const { selectedRecipe, selectedRecipeIngredients } = props
  return (
    <div className="container mx-auto mb-10"
         key = {selectedRecipe.id}>
 
        <div className="mx-5 flex flex-col mt-0 desktop:flex-row desktop:space-x-5">
          <H3>{selectedRecipe.title}</H3>
          <div className="desktop:my-6">
            <Link to="/edit">
                <ButtonIcon
                      className="mr-2"
                      color="text-lime-500"
                      onClick={()=>{}}>
                  <MdModeEdit className="inline text-2xl align-middle mr-1"/><span className="text-base align-middle">Edit</span>
                </ButtonIcon>
            </Link>

            <Link to="/delete">
                <ButtonIcon
                        color="text-rose-500"
                        onClick={()=>{
                          removeRecipe(selectedRecipe.id)
                        }}>
                    <MdDeleteForever className="inline text-2xl align-middle mr-1"/><span className="text-base align-middle">Delete</span>
                  </ButtonIcon>
            </Link> 
          </div>
        </div>
        
        <div className="mx-5 desktop:mb-10 text-base font-cabin text-black-800">
          <MdAccessTime className="inline mr-1.5"></MdAccessTime>
          <span className="inline align-middle">38 minutes</span>
          <p className="inline align-middle mx-5">|</p>
          <p className="inline align-middle">{selectedRecipe.calories} kcal</p>
        </div>

        <div className="mx-5 mb-10">
          <img src={selectedRecipe.image} alt="food" className="rounded-2xl"></img>
          <div className="desktop:w-5/6">
           <p className="font-cabin text-lg text-black-800 leading-8 mt-5">{selectedRecipe.description}</p>
          </div>
  
          <H4>Ingredients</H4>
          
          <ul class="tracking-wide font-cabin text-lg text-black-800 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          { selectedRecipeIngredients.map((item, index) => {
            const content = (
                <>
                <span>{item.name}</span>
                <span> : </span>
                <span>{item.amount}</span>
                </>
            )
            if (index === 0) {
              return (
                <li class="pb-3 sm:pb-4">{content}</li>
                )
            }

            if (index === selectedRecipeIngredients.length-1) {
              return (
                <li class="pt-3 pb-0 sm:pt-4">{content}</li>
                )
            }
            
            return (
              <li class="py-3 sm:py-4">{content}</li>
              );
            }) }
          </ul>
        </div>

        <div className="mx-5 mb-10">
           <H4>Instructions</H4>
           <p className="font-cabin text-lg text-black-800 leading-8 mt-5 whitespace-pre-wrap">{selectedRecipe.instruction}</p>
        </div>
        

    </div>
  );
}
