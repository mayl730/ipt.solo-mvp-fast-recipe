import _ from 'lodash';
import { useState, useEffect } from "react"
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { handleUploadImage,
         resizeFile,
         listIngredients,
         addRecipe,
         addIngredient,
         addIngredientToRecipe,
         addIngredientsToRecipe,
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
  let newArr = [...recipeIngredientList];
  newArr[index] = {...newArr[index], [event.target.name]:event.target.value}
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
  console.log(recipeID, list)
  // Create new Ingredient List for API Request
  let newList = list.map((item) => {
    let requestID;
     getIngredientIDbyName(item.name).then(data => {
        if(!data) {
          requestID = data;
        } else {
          requestID = data[0].id;
        }
      })

      // Create Ingredient when it's not exist in the database
      if(!requestID) { addIngredient({name: item.name})
                      .then(data =>{ requestID = data})}
      return {
        ingredientID: requestID,
        amount: item.amount
      }
  })

  // Make API calls
  await addIngredientsToRecipe(recipeID, newList);
}

const test = async() => {
  addIngredient({name: 'someshit6'}).then(data =>{ console.log('somethingAdded', data) })
}


const sendPostRequest = async (url) => {
  const reqRecipe = {...recipeRequest, image: url}
  // const reqRecipeIngre = {...recipeIngredientRequest}
  setMessage("Created")
  await addRecipe(reqRecipe).then((id)=>{
    handleAddIngredientsToRecipe(id, recipeIngredientList)});
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

            <Button onClick={()=>test()}>
                Test
              </Button>
            
          </Form>
       </Container>

    </div>
  );
}
