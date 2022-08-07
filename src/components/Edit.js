import { useState } from "react"
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { handleUploadImage, resizeFile, editRecipe } from '../utils/index';
import { Link } from "react-router-dom";

export default function Edit(props) {
const { selectedRecipe, setMessage } = props;
const [image, setImage] = useState(null);
const [request, setRequest] = useState(
    {
        title: selectedRecipe.title,
        description: selectedRecipe.description,
        calories: selectedRecipe.calories,
        type: selectedRecipe.type,
        instruction: selectedRecipe.instruction,
        image: selectedRecipe.url,
    }
)

// Handler Function
const handleChange = (event) => {
    setRequest(prev => ({...prev,
                        [event.target.name]:event.target.value}))
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

// Send Patch Request
const sendPatchRequest = async (url) => {
    console.log('Send Patch Function')
    setMessage("Updated");
    let req = { ...request,  
        id: selectedRecipe.id,
    }
    if (image !== null) {
        console.log('this is img url', url)
        req = {...req, image: url}
        console.log(req)
    }
    await editRecipe(req);
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
               value={request.title}
               onChange={handleChange}/>
    </Form.Group>

     <Row>
        <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea"
                              rows={3}
                              type="text"
                              name="description"
                              value={request.description}
                              onChange={handleChange}/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Instruction</Form.Label>
                <Form.Control as="textarea"
                              rows={3}
                              type="text"
                              name="instruction"
                              value={request.instruction}
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
                          value={request.calories}
                          onChange={handleChange}/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text"
                          name="type"
                          value={request.type}
                          onChange={handleChange}/>
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
        <Link to="/done">
        <Button onClick={()=>handleUploadImage(image, sendPatchRequest)}>
                Confirm
            </Button>
        </Link>
    </Form>
</Container>

     </div>
 )
}

