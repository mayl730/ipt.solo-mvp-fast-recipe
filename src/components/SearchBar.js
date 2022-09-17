import { useState } from "react";
import { Link } from "react-router-dom";
// import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { listRecipesByIds, listRecipesByIngredient, listRecipesByName, listRecipesByCalories } from '../utils/index';
import { ButtonConfirm } from './ui/Buttons';
import { Input, Select } from './ui/Forms';
import { MdOutlineSearch } from "react-icons/md";
const _ = require('lodash');

// handler function


export default function SearchBar(props) {
  const {setFilteredRecipes} = props;
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
    

    // Get filtered recipe's ID
    let uniqIndexBefore = _.remove(_.uniq(_.concat(recipeIndex, recipeIdByName)), function(n){
      return n !== undefined;
    })
    
    // Filter result without calories is provided
    if(recipesByCalories.length === 0){
      await listRecipesByIds(uniqIndexBefore).then(res=> setFilteredRecipes(res));
      return;
    }
   
    // Filter result with calories
    let uniqIndexAfter = _.intersection(uniqIndexBefore, recipesByCalories);
    await listRecipesByIds(uniqIndexAfter).then(res=> setFilteredRecipes(res));
    return;
  }


  return (
    <div className="container mx-auto">
      <div className="flex flex-col desktop:flex-row desktop:space-x-4">
        <div className="mx-5 mb-5 desktop:basis-4/12 desktop:mx-0 desktop:mb-0">
         <Input placeholder="Search Recipe by Name (e.g. Pasta)"
              type="text"
              onChange={getName}>
         </Input>
        </div>

      <div className="mx-5 mb-5 desktop:basis-3/12 desktop:mx-0 desktop:mb-0">
        <Input type="text"
                placeholder="Ingredient"
                onChange={getIngredient}>
        </Input>
      </div>

      <div className="mx-5 mb-5 desktop:basis-3/12 desktop:mx-0 desktop:mb-0">
        <Select onChange={getCalories}>
            <option value="[null, null]">--Calories--</option>
            <option value="[400, 0]">Under 400kcal</option>
            <option value="[600, 400]">400 - 600kcal</option>
            <option value="[800, 600]">600 - 800kcal</option>
            <option value="[10000, 900]">Over 900kcal</option>
       </Select>
      </div>

    <div className="mx-5 mb-5">
      <Link to="search-result">
          <ButtonConfirm 
          className="mx-5 mb-5 w-full"
          onClick={()=>{
            getFilteredRecipes()
            }}><MdOutlineSearch className="inline w-5 h-4" />Search
          </ButtonConfirm>
        </Link>
    </div>
     

      </div>
{/* 
      <Container>
        <Form>
          <Row>
          <Col sm={5}>
          <Form.Group className="mb-3" controlId="search-name">
            <Form.Control
            type="text"
            placeholder="Search By Recipe Name"
            onChange={getName}/>
          </Form.Group>
          </Col>

          <Col sm={3}>
          <Form.Group className="mb-3">
            <Form.Control type="text"
            placeholder="Ingredient"
            onChange={getIngredient} />
          </Form.Group>
          </Col>
          <Col sm={3}>
          <Form.Select aria-label="Default select example"  onChange={getCalories}>
            <option value="[null, null]">--Calories--</option>
            <option value="[400, 0]">Under 400kcal</option>
            <option value="[600, 400]">400 - 600kcal</option>
            <option value="[800, 600]">600 - 800kcal</option>
            <option value="[10000, 900]">Over 900kcal</option>
          </Form.Select>
          </Col>
          <Col sm={1}>
            
          </Col>
          </Row>
        </Form>
      </Container> */}


    </div>
  );
}
