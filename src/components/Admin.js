import { useState, useEffect } from "react"
import { Form, Col, Row, Container, Button} from 'react-bootstrap';
import { listRecipes, listIngredients, addRecipe, addIngridentToRecipe } from '../utils/index';
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
const [imageURL, setImageURL] = useState("something");
const [allIngredients, setAllIngredients] = useState([]);

const [imageUpload, setImageUpload] = useState("");

const uploadFile = () => {
 
  if (imageUpload == null) return;
  const imageRef = ref(storage, `/recipe_image/${imageUpload.name + v4()}`);
  const uploadTask = uploadBytes(imageRef, imageUpload);
  
  uploadTask.on("state_changed", (snapshot)=> {
      getDownloadURL(snapshot.ref).then((url)=>alert(url));
  })
};

const handleSubmit = (event) => {
  event.preventDefault();
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
  // if (imageUpload == null) return;
  // const imageRef = ref(storage, `/recipe_image/${imageUpload.name + v4()}`);
  // const uploadTask = uploadBytesResumable(imageRef, imageUpload);
  
  // uploadTask.on("state_changed", (snapshot)=> {
  //     getDownloadURL(snapshot.ref).then((url)=>setImageURL(url));
  // })

  const allRecipes = await listRecipes().then(res=>res);
  const recipeID = allRecipes[allRecipes.length-1].id +1;
  const reqRecipe = { id: recipeID,
    userID: 999,
    title: title,
    description: description,
    calories : calories,
    type: type,
    image: "https://firebasestorage.googleapis.com/v0/b/fast-recipe-7aa79.appspot.com/o/recipe_image%2Fsushi-egg.jpg?alt=media&token=d4fd11c0-5254-4073-bc90-ede230e38bc8",
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
            {/* <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Recipe image</Form.Label>
              <Form.Control type="file"
                            onChange={getImageUpload}/>
              </Form.Group>
            </Row> */}
            <Row>
              {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Test Image</Form.Label>
              <Form.Control type="file"
                            onChange={getImageUpload}/>
              </Form.Group> */}
              <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={getImageUpload}
              />
              <button type="submit" onClick={uploadFile}>Upload Image</button>
              </form>
            </Row>
            
            <Button onClick={sendAddRequest}>
              Submit
            </Button>
            
          </Form>
       </Container>

    </div>
  );
}
