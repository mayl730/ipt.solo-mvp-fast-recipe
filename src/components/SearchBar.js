import { useState } from "react";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { listRecipesByIds, listRecipesByIngredient, listRecipesByName, listRecipesByCalories } from '../utils/index';
const _ = require('lodash');

// handler function


export default function SearchBar(props) {
  const {setView, setFilteredRecipes} = props;
  // State
  const [ingredient, setIngredient] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [caloriesRange, setCalories] = useState([]);
 
  // Set Input Value
  const getIngredient = (event) => {
    setIngredient(event.target.value);
  }
  const getName = (event) => {
    setRecipeName(event.target.value);
  }

  const getCalories = (event) => {
    setCalories(JSON.parse(event.target.value));
  }

  // Handler Function

  const getFilteredRecipes = async () => {
    let recipesByCalories = await listRecipesByCalories(...caloriesRange).then(res=>res);

    if(ingredient==="" && recipeName ===""){
      await listRecipesByIds(recipesByCalories).then(res=> setFilteredRecipes(res));
      return;
    }

    let recipeIndex = await listRecipesByIngredient(ingredient).then(res=> res);
    let recipeIdByName = await listRecipesByName(recipeName).then(res => res);
      
    let uniqIndexBefore = _.remove(_.uniq(_.concat(recipeIndex, recipeIdByName)), function(n){
      return n !== undefined;
    })

    if(recipesByCalories.length === 0){
      await listRecipesByIds(uniqIndexBefore).then(res=> setFilteredRecipes(res));
      return;
    }

    let uniqIndexAfter = _.intersection(uniqIndexBefore, recipesByCalories);
    await listRecipesByIds(uniqIndexAfter).then(res=> setFilteredRecipes(res));
    return;
  }


  return (
    <div className="search-bar">
       <input type="text" placeholder="Search Recipe Name" onChange={getName}/>
       <input type="text" placeholder="Ingrident" onChange={getIngredient}/>
      <select onChange={getCalories}>
        <option value="[null, null]">--Calories--</option>
        <option value="[400, 0]">Under 400kcal</option>
        <option value="[600, 400]">400 - 600kcal</option>
        <option value="[800, 600]">600 - 800kcal</option>
        <option value="[10000, 900]">Over 900kcal</option>
      </select>

      <button onClick={()=>{
        getFilteredRecipes()
        setView("SearchResult")
        }}>Search</button>
      <Container>
        <Form>
          <Row>
          <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          </Col>

          <Col>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          </Col>
          <Col>
          <Form.Select aria-label="Default select example">
  <option>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</Form.Select>
          </Col>
          <Col>
          <Button variant="primary" type="submit">
            Search
          </Button>
          </Col>
          </Row>
        </Form>
      </Container>


    </div>
  );
}
