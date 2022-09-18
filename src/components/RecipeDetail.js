import { Link } from "react-router-dom";
import React from "react"
import { Container, Button, Col, Row } from 'react-bootstrap';
import { ButtonConfirm, ButtonIcon } from './ui/Buttons';
import { removeRecipe } from '../utils/index';
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

export default function RecipeDetail(props) {
  const { selectedRecipe, selectedRecipeIngredients } = props
  return (
    <div className="container mx-auto"
         key = {selectedRecipe.id}>

       
     
        <br></br>
 
        <div className="flex flex-col mt-5 desktop:flex-row desktop:space-x-5">
          <h3 className="font-montserrat text-4xl text-black-800 my-3">{selectedRecipe.title}</h3>  
          <div className="my-2">
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

        <img src={selectedRecipe.image} alt="food"></img>

       <h4>Description</h4>
       <p>{selectedRecipe.description}</p>

       <h4>Ingredients</h4>
       { selectedRecipeIngredients.map((item) => {
        return (
          <div>
            <span>{item.name}</span>
            <span>: </span>
            <span>{item.amount}</span>
          </div>
        )
       }) }
       <h4>Calories</h4>
       <p>{selectedRecipe.calories}kcal</p>

    <h4>Instructions</h4>
    <p class="recipe__instructions">{selectedRecipe.instruction}</p>

    </div>
  );
}
