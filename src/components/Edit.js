import { useState, useEffect } from "react"
import _ from 'lodash';
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { handleUploadImage,
         resizeFile,
         editRecipe,
         getIngredientsByRecipeID,
         removeIngredientsToRecipe,
         addIngredientsToRecipe,
         editIngredientToRecipe,
         addIngredientWhenNotExist
         } from '../utils/index';
import { Link, useNavigate } from "react-router-dom";
import { H3 } from './ui/Fonts';
import { Label, Input, InputFile, Textarea } from './ui/Forms';
import { ButtonConfirm, ButtonIcon } from './ui/Buttons';

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

// Send Patch Request
const sendPatchRequest = async (url) => {
    console.log('Send Patch Function, and this is the url:', url)
    await setMessage("Updated");
    let req = { ...request,  
        id: selectedRecipe.id,
    }
    if (image !== null) {
        req = {...req, image: url}
        console.log('change image request', req)
    }
    await editRecipe(req);
    await handleIngredientsToRecipe(selectedRecipe.id, recipeIngredientList);
}

// React Router Funciton
const navigate = useNavigate();

 return (
    <div className="edit container mx-auto">
     <H3 className="text-center">Edit a Recipe</H3>
    

   
 <div className="container mx-auto px-5 mb-5 desktop:w-1/2">

    <div className="mb-6">
      <Label>Recipe Name</Label>
      <Input
      type="text"
      name="title"
      value={request.title}
      onChange={handleChange}
      />
    </div>

    <div className="mb-6">
      <Label>Description</Label>
      <Textarea as="textarea"
              rows={4}
              type="text"
              name="description"
              value={request.description}
              onChange={handleChange}/>
    </div>

    <div className="mb-6">
      <Label>Instruction</Label>
      <Textarea as="textarea"
              rows={4}
              type="text"
              name="instruction"
              value={request.instruction}
              onChange={handleChange}/>
    </div>
     

        <div className="mb-6">
            <Label>Calories - kcal</Label>
            <Input  type="text"
                          name="calories"
                          value={request.calories}
                          onChange={handleChange}/>
        </div>
        <div className="mb-6">
            <Label>Type</Label>
            <Input  type="text"
                          name="type"
                          value={request.type}
                          onChange={handleChange}/>
        </div >

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
              <InputFile type = "file"
                         onChange={handleImageChange}
                         id = "formFile"
                         />
              </div>
        

            <div className="grid grid-cols-1">
            <Link to="/done">
              <ButtonConfirm 
                      className="container mx-auto w-full px-25 py-3 mb-5"
                      onClick={()=>handleUploadImage(image, sendPatchRequest, true)}>
                      Confirm
              </ButtonConfirm>
            </Link>
            <ButtonIcon 
                      className="container mx-auto"
                      onClick={() => navigate(-1)}>Back</ButtonIcon>
            </div>

    </div>

     </div>
 )
}

