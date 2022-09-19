import _ from 'lodash';
import { useState } from "react"
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { handleUploadImage,
         resizeFile,
         addRecipe,
         addIngredientsToRecipe,
         addIngredientWhenNotExist } from '../utils/index';
import { Link, useNavigate } from "react-router-dom";
import { H3 } from './ui/Fonts';
import { Label, Input, InputFile, Textarea } from './ui/Forms';
import { ButtonConfirm, ButtonIcon } from './ui/Buttons';

export default function Admin(props) {
const { setMessage } = props;
const [image, setImage] = useState(null);

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
const [recipeIngredientList,
       setRecipeIngredientList] = useState([
        {
          name: "",
          amount: ""
        }
       ])

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
  // Create new Ingredient List for API Request
  const newList = []
  if (list.length <= 0) return newList;

  for (let i = 0; i < list.length; i++) {
    let newItem = await addIngredientWhenNotExist(list[i]);
    newList.push(newItem); 
  }
  return newList;
}

const sendPostRequest = async (url) => {
  setMessage("Created")
  const reqRecipe = {...recipeRequest, image: url}
  const recipeID = await addRecipe(reqRecipe);
  const newList = await handleAddIngredientsToRecipe(recipeID, recipeIngredientList)
  await addIngredientsToRecipe(recipeID, newList);
}

// React Router Funciton
const navigate = useNavigate();

  return (
    <div className="edit container mx-auto">
     <H3 className="text-center">Add a Recipe</H3>
     <div className="container mx-auto px-5 mb-5 desktop:w-1/2">
    
            <div className="mb-6">
                <Label>Recipe Name</Label>
                <Input type="text"
                      name="title"
                      value={recipeRequest.title}
                      onChange={handleChange}/>
            </div>
  
        
                <div className="mb-6" controlId="exampleForm.ControlTextarea1">
                    <Label>Description</Label>
                    <Textarea as="textarea"
                              rows={4}
                              type="text"
                              name="description"
                              value={recipeRequest.description}
                              onChange={handleChange}/>
                </div>
           
            
                <div className="mb-6" controlId="exampleForm.ControlTextarea1">
                    <Label>Instruction</Label>
                    <Textarea as="textarea"
                              rows={4}
                              type="text"
                              name="instruction"
                              value={recipeRequest.instruction}
                              onChange={handleChange}/>
                </div>
         
      
     
                  <div className="mb-6">
                  <Label>Calories - kcal</Label>
                  <Input type="text"
                                name="calories"
                                value={recipeRequest.calories}
                                onChange={handleChange}/>
                  </div>
     
                  <div className="mb-6">
                  <Label>Type</Label>
                  <Input type="text"
                                name="type"
                                value={recipeRequest.type}
                                onChange={handleChange}/>
                  </div>
          
                 
             <div className="flex flex-row">
                <Label className="w-3/6">Ingredient</Label>
                <Label className="w-2/6">Amount</Label>
                <Label className="w-1/6"></Label>
              </div>
              <div className="grid grid-cols-1 gap-3 mb-5">
                {recipeIngredientList.map((ingre, index) => (
                  <div>
                        <RecipeIngredientEdit 
                        key = {index}
                        recipeIngredientList = {recipeIngredientList}
                        handleIngredientChange={handleIngredientChange}
                        index = {index}
                        removeIngredient={removeIngredient}/>
                  </div>
                ))}
             </div>
            
          
             <ButtonConfirm type="button" onClick={()=>handleAddIngredient()}>
                Add Ingredient
              </ButtonConfirm>
           
              <div className="my-10">
              <Label>Upload Image</Label>
              <InputFile type="file"
                            onChange={handleImageChange}
                            id = "formFile"/>
              </div>

            <div className="grid grid-cols-1">
            <Link to="/done">
              <ButtonConfirm
                className="container mx-auto w-full px-25 py-3 mb-5"
                onClick={()=>handleUploadImage(image, sendPostRequest)}>
                Submit
              </ButtonConfirm>
            </Link>
            <ButtonIcon 
                      className="container mx-auto"
                      onClick={() => navigate(-1)}>Back</ButtonIcon>
            </div>
            
       </div>

    </div>
  );
}
