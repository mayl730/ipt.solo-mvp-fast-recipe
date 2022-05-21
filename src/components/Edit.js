import { useState } from "react"
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { editRecipe, findRecipeByID } from '../utils/index';

export default function Edit(props) {
const { setSelectedRecipe, selectedRecipe, setView } = props;
const [title, setTitle] = useState(selectedRecipe.title);
const [description, setDescription] = useState(selectedRecipe.description);
const [calories, setCalories] = useState(selectedRecipe.calories);
const [type, setType] = useState(selectedRecipe.type);

const getTitle = (event) => {
    setTitle(event.target.value);
}
const getDescription  = (event) => {
    setDescription(event.target.value);
}
const getCalories  = (event) => {
    setCalories(event.target.value);
}
const getType  = (event) => {
    setType(event.target.value);
}

// function
const sendRequest = async () => {
    const req = { id: selectedRecipe.id,
                    title: title,
                    description: description,
                    calories : calories,
                    type: type,
                    }
    await editRecipe(req)
    setTimeout(async() => {
        const newRecipe = await findRecipeByID(selectedRecipe.id)
    setSelectedRecipe(...newRecipe);
    setView("RecipeDetail");
      }, "1000")
}

 return (
    <div className="edit">
     <h3>Edit a Recipe</h3>
<Container>
    <Form>
    <Form.Group className="mb-3">
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control  type="text"
               value={title}
               onChange={getTitle}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} type="text"
                  value={description}
                  onChange={getDescription}/>
    </Form.Group>
    <Row>
        <Col>
            <Form.Group className="mb-3">
            <Form.Label>Calories - kcal</Form.Label>
            <Form.Control type="text"
            value={calories}
            onChange={getCalories}/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text"
                          value={type}
                          onChange={getType}/>
            </Form.Group>
        </Col>
    </Row>
    <Button
           onClick={()=>{
            sendRequest(); 
       }}>
            Confirm
          </Button>
    </Form>
</Container>

     </div>
 )
}

// value={selectedRecipe.title}