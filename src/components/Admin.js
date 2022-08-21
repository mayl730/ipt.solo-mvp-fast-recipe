import _ from 'lodash';
import { useState} from "react"
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { handleUploadImage,
         resizeFile,
         addRecipe,
         addIngredient,
         addIngredientsToRecipe,
         getIngredientIDbyName } from '../utils/index';
import { Link } from "react-router-dom";

export default function Admin(props) {
const { setMessage } = props;
const [image, setImage] = useState(null);

const [recipeRequest, setRequest] = useState(
  {
      title: "",
      description: "",
      calories: "",
      type: "",
      instruction: "",
      image: null,
  }
)
const [recipeIngredientList,
       setRecipeIngredientList] = useState([
        {
          name: "",
          amount: ""
        }
       ])

// Handler Funciton

const handleChange = (event) => {
  setRequest(prev => ({...prev,
                      [event.target.name]:event.target.value}))
}

const handleIngredientChange = index => event => {
  let newArr = [...recipeIngredientList];
  newArr[index] = {...newArr[index], [event.target.name]:event.target.value}
  setRecipeIngredientList(newArr);
}

const handleImageChange = async (event) => {
  try {
    const file = event.target.files[0];
    const resizedImage = await resizeFile(file);
    setImage(resizedImage);
  } catch (err) {
    console.log(err);
  }
};

// Other Function
const handleAddIngredient = () => {
  setRecipeIngredientList(
    [...recipeIngredientList, {
    name: "",
    amount: ""
    }])
}
const removeIngredient = (index) => {
  let newArr = recipeIngredientList;
  _.pullAt(newArr, index)
  setRecipeIngredientList(newArr);
}

const handleAddIngredientsToRecipe = async (recipeID, list) => {
  // Create new Ingredient List for API Request
  const newList = []
  if (list.length <= 0) return newList;

  for (let i = 0; i < list.length; i++) {
    if(list[i].name) {
      let id = await getIngredientIDbyName(list[i].name);

      if (id) {
        newList.push({
          ingredientID: id,
          amount: list[i].amount
        });
        console.log('No new ingredient', id);}

      if (!id) { 
        let newID = await addIngredient({ name: list[i].name })
        
        newList.push({
          ingredientID: newID,
          amount: list[i].amount }); 

        console.log('New Ingredient', newID)
      } 
    }  
  }
  return newList;
}

const sendPostRequest = async (url) => {
  setMessage("Created")
  const reqRecipe = {...recipeRequest, image: url}
  const recipeID = await addRecipe(reqRecipe);
  const newList = await handleAddIngredientsToRecipe(recipeID, recipeIngredientList)
  await addIngredientsToRecipe(recipeID, newList);

}
  return (
    <div className="admin">
       <h2>Add Recipe</h2>
       <Container>
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control type="text"
                      name="title"
                      value={recipeRequest.title}
                      onChange={handleChange}/>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text"
                              name="description"
                              value={recipeRequest.description}
                              onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Instruction</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text"
                              name="instruction"
                              value={recipeRequest.instruction}
                              onChange={handleChange}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                  <Form.Group className="mb-3">
                  <Form.Label>Calories - kcal</Form.Label>
                  <Form.Control type="text"
                                name="calories"
                                value={recipeRequest.calories}
                                onChange={handleChange}/>
                  </Form.Group>
              </Col>
              <Col>
                  <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control type="text"
                                name="type"
                                value={recipeRequest.type}
                                onChange={handleChange}/>
                  </Form.Group>
              </Col>
            </Row>
                 
            <Row>
              <Col><Form.Label>Ingredient</Form.Label></Col>
              <Col><Form.Label>Amount</Form.Label></Col>
              <Col><Form.Label></Form.Label></Col>
            </Row>

            {recipeIngredientList.map((ingre, index) => (
              <div>
                <Row>
                  <Col>
                    <RecipeIngredientEdit 
                    key = {index}
                    recipeIngredientList = {recipeIngredientList}
                    handleIngredientChange={handleIngredientChange}
                    index = {index}
                    removeIngredient={removeIngredient}/>
                  </Col>
                </Row>
              </div>
            ))}
            
           
            <Col>
              <Button onClick={()=>handleAddIngredient()}>
                Add Ingredient
              </Button>
              </Col>
           
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file"
                            onChange={handleImageChange}/>
              </Form.Group>
              
            </Row>
            <Link to="/done">
              <Button onClick={()=>handleUploadImage(image, sendPostRequest)}>
                Submit
              </Button>
            </Link>

            <Button onClick={()=>handleAddIngredientsToRecipe(1, recipeIngredientList)}>
                Test
            </Button>
            
          </Form>
       </Container>

    </div>
  );
}
