import { useState, useEffect } from "react"
import { Form, Col, Row, Container, Button} from 'react-bootstrap';
import { handleUploadImage, resizeFile, listIngredients, addRecipe, addIngridentToRecipe } from '../utils/index';



export default function Admin(props) {
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

const handleIngredientChange = (event) => {
  setRecipeIngredientRequest(prev => ({...prev,
                      [event.target.name]:event.target.value}))
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

const sendPostRequest = async (url) => {
  const reqRecipe = {...recipeRequest, image: url}
  const reqRecipeIngre = {...recipeIngredientRequest}
  console.log(reqRecipe, reqRecipeIngre)
  
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
            <Row>
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
            </Row>
           
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file"
                            onChange={handleImageChange}/>
              </Form.Group>
              
            </Row>
            <Button onClick={()=>handleUploadImage(image, sendPostRequest)}>
              Submit
            </Button>
            
          </Form>
       </Container>

    </div>
  );
}
