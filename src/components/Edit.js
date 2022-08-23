import { useState, useEffect } from "react"
import _ from 'lodash';
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { handleUploadImage,
         resizeFile,
         editRecipe,
         getIngredientsByRecipeID,
         getIngredientIDbyName,
         addIngredient,
         removeIngridentsToRecipe
         } from '../utils/index';
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
const [recipeIngredientList,
    setRecipeIngredientList] = useState([
     {
       name: "",
       amount: ""
     }
    ])
    const [recipeIngredientHistory,
        setRecipeIngredientHistory] = useState([])

  //useEffect
  useEffect(() => { 
    async function getRecipeIngredients() {
        getIngredientsByRecipeID(selectedRecipe.id)
        .then((data) => {
            setRecipeIngredientList(data);
            let historyIDs = data.map(item => item.id)
            setRecipeIngredientHistory(historyIDs)
        })
    }
    getRecipeIngredients();;            
  }, []);


// Handler Function
const handleChange = (event) => {
    setRequest(prev => ({...prev,
                        [event.target.name]:event.target.value}))
}

const handleIngredientChange = index => event => {
    let newArr = [...recipeIngredientList];
    newArr[index] = {...newArr[index], [event.target.name]:event.target.value}
    setRecipeIngredientList(newArr);
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
        }
  
        if (!id) { 
          let newID = await addIngredient({ name: list[i].name })
          
          newList.push({
            ingredientID: newID,
            amount: list[i].amount }); 
        } 
      }  
    }
    return newList;
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

  const test = () => {
    console.log(recipeIngredientHistory);
    return;
  };


// Send Patch Request
const sendPatchRequest = async (url) => {
    console.log('Send Patch Function')
    await setMessage("Updated");
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

    <Row>
              <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file"
                            onChange={handleImageChange}/>
              </Form.Group>
              
            </Row>
        <Link to="/done">
            <Button onClick={()=>handleUploadImage(image, sendPatchRequest, true)}>
                    Confirm
            </Button>
        </Link>

        <Button onClick={()=>removeIngridentsToRecipe([197])}>
                    test
            </Button>
    </Form>
</Container>

     </div>
 )
}

