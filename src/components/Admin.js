import { useState, useEffect } from "react"
import { Form, Col, Row, Container, Button} from 'react-bootstrap';
import { resizeFile, listIngredients, addRecipe, addIngridentToRecipe } from '../utils/index';
import storage from "../firebase.js";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

export default function Admin(props) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [calories, setCalories] = useState("");
const [type, setType] = useState("");
const [ingredient, setIngredient] = useState("");
const [amount, setAmount] = useState("");
const [instruction, setInstruction] = useState("");
const [image, setImage] = useState(null);
const [imageURL, setImageURL] = useState("");
const [allIngredients, setAllIngredients] = useState([]);

useEffect(() => { 
  async function getAllIngredients() {
    listIngredients().then(data => setAllIngredients(data));
  }
  getAllIngredients();
});

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

const getIngredient  = (event) => {
  setIngredient(event.target.value);
}

const getAmount  = (event) => {
  setAmount(event.target.value);
}

const getInstruction  = (event) => {
  setInstruction(event.target.value);
}

const handleImageChange = (event) => {
  if (event.target.files[0]) {
      resizeFile(event.target.files[0]).then((image) => {
      return setImage(image);
    })
    console.log('image is resized!', image);
  }
};

const sendAddRequest = async () => {
  const reqRecipe = {
    userID: 999,
    title: title,
    description: description,
    calories : calories,
    type: type,
    instruction: instruction,
    image: imageURL,
    }
  const reqRecipeIngre =  {
    ingredientID: ingredient,
    amount: amount,
  }
  
  await addRecipe(reqRecipe).then((id)=>{
    addIngridentToRecipe(id, reqRecipeIngre)});
}

const handleUploadImage = async () => {
  if (image == null) return;
  const imageRef = ref(storage, `recipe_image/${image.name + v4()}`);
  
  uploadBytes(imageRef, image).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      setImageURL(url);
      console.log('url', imageURL);
      sendAddRequest();
    });
  });

};

  return (
    <div className="admin">
       <h2>Add Recipe</h2>
       <Container>
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control type="text"
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
              <Col>
                <Form.Label>Ingredient</Form.Label>
                <Form.Select aria-label="Default select example"
                onChange={getIngredient}>
                  { allIngredients.map((item) => {
                    return (
                      <option value={item.id}>{item.name}</option>
                    )
                  })
                  }
                </Form.Select>
              </Col>

              <Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control  type="text"
                                  value={amount}
                                  onChange={getAmount}/>
                    </Form.Group>
                </Col>
              </Col>
            </Row>
            {/* <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Recipe image</Form.Label>
              <Form.Control type="file"
                            onChange={getImageUpload}/>
              </Form.Group>
            </Row> */}
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file"
                            onChange={handleImageChange}/>
              </Form.Group>
              {/* <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={getImageUpload}
              />
              <button type="submit" onClick={uploadFile}>Upload Image</button>
              </form> */}
            </Row>
            {/* <Button onClick={handleUploadImage}>
              UploadImage
            </Button> */}
            <Button onClick={handleUploadImage}>
              Submit
            </Button>
            
          </Form>
       </Container>

    </div>
  );
}
