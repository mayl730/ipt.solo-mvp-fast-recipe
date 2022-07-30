import { useEffect } from 'react'
import { Link } from "react-router-dom";
import React from "react"
import { Container, Button, Col, Row } from 'react-bootstrap';
import { removeRecipe } from '../utils/index';

export default function RecipeDetail(props) {
  const { setView, selectedRecipe, selectedRecipeIngredients } = props
  return (
    <div className="recipe-detail"
         key = {selectedRecipe.id}>
      <Container>
       <h2>Recipe Detail</h2>
       <Row>
         <Col>
         <img src={selectedRecipe.image} alt="food"></img>
        <br></br>
       </Col>
      <Col className="text-left">

      <Link to="/edit">
      <Button variant="success" onClick={()=>{
       }}>Edit</Button>
       </Link> {' '}
       <Button variant="danger" onClick={()=>{
         removeRecipe(selectedRecipe.id)
         setView("HomeRecipes")
       }}>Delete</Button>
       <h3>{selectedRecipe.title}</h3>
       <p>{selectedRecipe.description}</p>
       <h4>Ingredients</h4>
       { selectedRecipeIngredients.map((item) => {
        return (
          <div>
            <span>{item.name}</span>
            <span>{item.amount}</span>
          </div>
        )
       }) }
       <p>Calories: {selectedRecipe.calories}kcal</p></Col>
       </Row>
     
       <Container fluid="sm">
  <Row>
    <Col>
    <p>{selectedRecipe.instruction}</p>
    </Col>
  </Row>
</Container>
       
    
       </Container>
    </div>
  );
}
