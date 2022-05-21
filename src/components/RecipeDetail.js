import React from "react"
import { Container, Button, Col, Row } from 'react-bootstrap';
import { removeRecipe } from '../utils/index';

export default function RecipeDetail(props) {
  const { setView, selectedRecipe } = props
  return (
    <div className="recipe-detail">
      <Container>
       <h2>Recipe Detail</h2>
       <Row>
         <Col>
         <img src="https://picsum.photos/seed/picsum/360/260
" alt="food"></img>
        <br></br>
       </Col>
      <Col className="text-left">
      <Button variant="success" onClick={()=>{
         setView("Edit")
       }}>Edit</Button> {' '}
       <Button variant="danger" onClick={()=>{
         removeRecipe(selectedRecipe.id)
         setView("HomeRecipes")
       }}>Delete</Button>
      <h3>{selectedRecipe.title}</h3>
       <p>{selectedRecipe.description}</p>
       <p>Ingridents: {selectedRecipe.ingredients}</p>
       <p>Calories: {selectedRecipe.calories}kcal</p></Col>
       </Row>
       <Col>
       <ul>
         <li>Step1: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
         <li>Step2: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
         <li>Step3: orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
       </ul>
       </Col>
       
       {/* <button onClick={()=>setView("SearchResult")}>Back</button> */}
       </Container>
    </div>
  );
}
