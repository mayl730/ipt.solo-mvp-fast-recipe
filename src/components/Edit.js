import { useState, useEffect } from "react"
import _ from 'lodash';
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { handleUploadImage,
         resizeFile,
         editRecipe,
         getIngredientsByRecipeID,
         removeIngredientsToRecipe,
         addIngredientsToRecipe,
         editIngredientToRecipe,
         addIngredientWhenNotExist
         } from '../utils/index';
import { Link } from "react-router-dom";
import { H3 } from './ui/Fonts';
import { Label, Input } from './ui/Forms';

export default function Edit(props) {
const { selectedRecipe, setMessage } = props;
const [image, setImage] = useState(null);
const [recipeIngredientHistory, setRecipeIngredientHistory] = useState([])
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

const handleAddIngredient = () => {
    setRecipeIngredientList(
      [...recipeIngredientList, {
      name: "",
      amount: ""
      }])
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

  const handleIngredientsToRecipe = async (recipeID, list) => {
    let newList = [];
    let editHistory = [];
    for (let i = 0; i < list.length; i++) {
        
        if(list.length === 0) {
            if(recipeIngredientHistory.length > 0){
                removeIngredientsToRecipe(recipeIngredientHistory)
            }
        }
         let newIngredient = await addIngredientWhenNotExist(list[i]);
       if(list[i].id) {
        //if id exist, patch it & remove that number in history arr
            await editIngredientToRecipe(list[i].id, newIngredient);
            editHistory.push(list[i].id)
       }  
       if(!list[i].id) {
        //if no id, run "add ingredient to recipe" funciton.
            newList.push(newIngredient)
        }
    }
    let itemsToBeRemoved = _.difference(recipeIngredientHistory, editHistory)
    await removeIngredientsToRecipe(itemsToBeRemoved);

    if(list.length > 0){
        if(newList.length <=0) return;
        await addIngredientsToRecipe(recipeID, newList)
    }
    if(list.length <= 0) {
        await addIngredientsToRecipe(recipeID, newList)
    }
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
    await handleIngredientsToRecipe(selectedRecipe.id, recipeIngredientList);
}

 return (
    <div className="edit container mx-auto">
     <H3 className="text-center">Edit a Recipe</H3>
     <div></div>
<Container>
    <Form>
    <Form.Group className="mb-3">
      <Label>Recipe Name</Label>
      <Input
      type="text"
      name="title"
      value={request.title}
      onChange={handleChange}
      ></Input>

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
            <Button onClick={()=>handleUploadImage(image, sendPatchRequest, true)}>
                    Confirm
            </Button>
        </Link>
    </Form>
</Container>

     </div>
 )
}

