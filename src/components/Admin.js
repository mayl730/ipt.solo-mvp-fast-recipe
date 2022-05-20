import { useState, useEffect } from "react"
import { listRecipes, listIngredients } from '../utils/index';

export default function Admin(props) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [calories, setCalories] = useState("");
const [type, setType] = useState("");
const [ingredient, setIngredient] = useState("");
const [amount, setAmount] = useState("");
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

const sendAddRequest = async () => {
  const allRecipes = await listRecipes().then(res=>res);
  const reqRecipe = { id: allRecipes.length+1,
    title: title,
    description: description,
    calories : calories,
    type: type,
    }
  const reqRecipeIngre =  {
    ingredientID: ingredient,
    amount: amount,
  }
  console.log(reqRecipe);
  console.log(reqRecipeIngre);

}
  return (
    <div className="admin">
       <h2>Admin Page</h2>
       <h3>Add Recipe</h3>
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
    <button onClick={sendAddRequest}>Confirm</button>

    </div>
  );
}
