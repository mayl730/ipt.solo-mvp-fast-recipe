import React from 'react'
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { Label, Input } from './ui/Forms';
import { ButtonIcon } from './ui/Buttons';


export default function RecipeIngredientEdit(props) {
    const {recipeIngredientList,
            handleIngredientChange,
            removeIngredient,
            index} = props;
  return (
    <>
            <div>
               <Input
                name="name"
                type="text"
                value= {recipeIngredientList[index].name}
                onChange={handleIngredientChange(index)}
                />
           
            
                <Input
                name="amount"
                type="text"
                value={recipeIngredientList[index].amount}
                onChange={handleIngredientChange(index)}
                />
        
            
                <p className="text-orange-200 hover:text-orange-100 font-bold py-2 px-1 text-2xl cursor-pointer"
                   onClick={()=>removeIngredient(index)}>
                    &times;
                </p>
            </div>
              
            
     

    </>
  )
}
