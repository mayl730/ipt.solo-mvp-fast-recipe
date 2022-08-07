import { useState } from "react"
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { handleUploadImage, resizeFile, editRecipe, findRecipeByID } from '../utils/index';

export default function Edit(props) {
const { setSelectedRecipe, selectedRecipe, setView } = props;
const [request, setRequest] = useState(
    {
        title: "",
        description: "",
        calories: "",
        type: "",
        instruction: "",
    }
)
const [title, setTitle] = useState(selectedRecipe.title);
const [description, setDescription] = useState(selectedRecipe.description);
const [calories, setCalories] = useState(selectedRecipe.calories);
const [type, setType] = useState(selectedRecipe.type);
const [instruction, setInstruction] = useState(selectedRecipe.instruction);
const [image, setImage] = useState(null);

const getTitle = (event) => {
    setTitle(event.target.value);
}
const getDescription  = (event) => {
    setDescription(event.target.value);
}
const getCalories  = (event) => {
    setCalories(event.target.value);
}
const getInstruction  = (event) => {
    setInstruction(event.target.value);
}
const getImage  = (event) => {
    setImage(event.target.value);
}
const getType  = (event) => {
    setType(event.target.value);
}

const handleChange = (event) => {
    setRequest(prev=>({...prev, [event.target.name]:event.target.value}))
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

// function
const sendRequest = async () => {
    const req = { 
        id: selectedRecipe.id,
        title: title,
        description: description,
        calories : calories,
        instruction: instruction,
        type: type,
    }
    if (!image) {
        req['image'] = image
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
        <Form.Control
               type="text"
               name="title"
               value={title}
               onChange={getTitle}/>
    </Form.Group>
     <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} type="text"
                            value={description}
                            onChange={getDescription}/>
            </Form.Group>
            </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Instruction</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text"
                              value={instruction}
                              onChange={getInstruction}/>
                </Form.Group>
              </Col>
            </Row>
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
    <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file"
                            onChange={handleImageChange}/>
              </Form.Group>
              
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