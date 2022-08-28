import { Link } from "react-router-dom";
import React from "react"
import { Container, Button, Col, Row } from 'react-bootstrap';
import { removeRecipe } from '../utils/index';

export default function RecipeDetail(props) {
  const { selectedRecipe, selectedRecipeIngredients } = props
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

       <Link to="/delete">
        <Button variant="danger" onClick={()=>{
          removeRecipe(selectedRecipe.id)
        }}>Delete</Button>
       </Link>

       <h3>{selectedRecipe.title}</h3>
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
       <p>{selectedRecipe.calories}kcal</p></Col>
       </Row>
     
       <Container fluid="sm">
  <Row>
    <Col>
    <p class="recipe__instructions">{selectedRecipe.instruction}</p>
    </Col>
  </Row>
</Container>
       
    
</Container>
    </div>
  );
}
