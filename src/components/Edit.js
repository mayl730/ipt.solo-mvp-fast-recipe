import { useState } from "react"
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
     <p>print {JSON.stringify(selectedRecipe)}</p>
     <form>
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
    </form>
    <button onClick={()=>{
         sendRequest(); 
    }}>Confirm</button>
     </div>
 )
}

// value={selectedRecipe.title}