import _ from 'lodash';
import { useState, useEffect } from "react"
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { handleUploadImage,
         resizeFile,
         listIngredients,
         addRecipe,
         addIngridentToRecipe,
         getIngredientIDbyName } from '../utils/index';
import { Link } from "react-router-dom";



export default function Admin(props) {
const { setMessage } = props;
const [image, setImage] = useState(null);
const [allIngredients, setAllIngredients] = useState([]);

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
const [recipeIngredientRequest,
       setRecipeIngredientRequest] = useState(
      {
        ingredientID: "",
        amount: ""
      }
)

const [ingredientList, setIngredientList] = useState(["Default"])

const [recipeIngredientList,
       setRecipeIngredientList] = useState([
        {
          name: "",
          amount: ""
        }
       ])

useEffect(() => { 
  async function getAllIngredients() {
    listIngredients().then(data => setAllIngredients(data));
  }
  getAllIngredients();
});

// Handler Funciton

const handleChange = (event) => {
  setRequest(prev => ({...prev,
                      [event.target.name]:event.target.value}))
}

const handleIngredientChange = index => event => {
  console.log('index', index, 'value', event.target.value);
  let newArr = [...recipeIngredientList];
  newArr[index] = event.target.value;
  setRecipeIngredientList(newArr);
}

const handleImageChange = async (event) => {
  try {
    const file = event.target.files[0];
    const resizedImage = await resizeFile(file);
    setImage(resizedImage);
    console.log(image);
  } catch (err) {
    console.log(err);
  }
};

// Other Function
const addIngrident = () => {
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


const sendPostRequest = async (url) => {
  const reqRecipe = {...recipeRequest, image: url}
  const reqRecipeIngre = {...recipeIngredientRequest}
  setMessage("Created")
  await addRecipe(reqRecipe).then((id)=>{
    addIngridentToRecipe(id, reqRecipeIngre)});
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
            {/* <Row>
              <Col>
                <Form.Label>Ingredient</Form.Label>
                <Form.Select aria-label="Default select example"
                             name="ingredientID"
                             onChange={handleIngredientChange}>
                  { allIngredients.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                  }
                </Form.Select>
              </Col>

              <Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text"
                                  value={recipeIngredientRequest.amount}
                                  name="amount"
                                  onChange={handleIngredientChange}/>
                    </Form.Group>
                </Col>
              </Col>
            </Row> */}
            
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
                    recipeIngredientRequest = {ingre}
                    handleIngredientChange={handleIngredientChange}
                    index = {index}
                    removeIngredient={removeIngredient}/>
                  </Col>
                </Row>
              </div>
            ))}
            
           
            <Col>
              <Button onClick={()=>addIngrident()}>
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

            <Button onClick={()=>getIngredientIDbyName('Water').then((item)=> console.log(item))}>
                Test
              </Button>
            
          </Form>
       </Container>

    </div>
  );
}
