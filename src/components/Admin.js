import { useState, useEffect } from "react"
import { Form, Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { listRecipes, listIngredients, addRecipe, addIngridentToRecipe } from '../utils/index';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

export default function Admin(props) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [calories, setCalories] = useState("");
const [type, setType] = useState("");
const [ingredient, setIngredient] = useState("");
const [amount, setAmount] = useState("");
const [image, setImage] = useState("");
const [allIngredients, setAllIngredients] = useState([]);

const [imageUpload, setImageUpload] = useState(null);

  const imagesListRef = ref(storage, "recipe_image/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `recipe_image/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
      });
    });
  };


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

const getImageUpload  = (event) => {
  setImageUpload(event.target.files[0]);
}

const sendAddRequest = async () => {
  const allRecipes = await listRecipes().then(res=>res);
  const recipeID = allRecipes[allRecipes.length-1].id +1;
  const reqRecipe = { id: recipeID,
    userID: 999,
    title: title,
    description: description,
    calories : calories,
    type: type,
    image: image,
    }
  const reqRecipeIngre =  {
    ingredientID: ingredient,
    amount: amount,
  }

  await addRecipe(reqRecipe);
  await addIngridentToRecipe(recipeID, reqRecipeIngre);
  console.log('recipe added!', recipeID, reqRecipeIngre);

}
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
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Recipe image</Form.Label>
              <Form.Control type="file"
                            onChange={getImageUpload}/>
              </Form.Group>
            </Row>
            <Button onClick={sendAddRequest}>
              Submit
            </Button>

            {/* <Alert key="success" variant="success">
              Recipe is Added!
            </Alert> */}
            
          </Form>
       </Container>


       {/* <form>
      <label>Recipe Name: 
        <input type="text"
               value={title}
               onChange={getTitle}/>
      </label>
    
      <label>Recipe description: 
        <textarea type="text"
                  value={description}
                  onChange={getDescription}/>
      </label>

      <label>Calories - kcal
        <input type="text"
        value={calories}
        onChange={getCalories}/>
      </label>
      <label>Type
        <input type="text"
        value={type}
        onChange={getType}/>
      </label>
      <label> Ingrident
      <select onChange={getIngredient}>
        { allIngredients.map((item) => {
          return (
            <option value={item.id}>{item.name}</option>
          )
        })
        }
      </select>
      </label>

      <label>Amount
        <input type="text"
        value={amount}
        onChange={getAmount}/>
      </label>

    </form>
    <button onClick={sendAddRequest}>Confirm</button> */}

    </div>
  );
}
