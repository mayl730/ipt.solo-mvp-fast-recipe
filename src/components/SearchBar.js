import { useState } from "react";
import { listRecipesByIds, listRecipesByIngredient, listRecipesByName } from '../utils/index';
const _ = require('lodash');
const axios = require('axios').default;

// handler function


export default function SearchBar(props) {
  const {setView, setFilteredRecipes} = props;
  // State
  const [ingredient, setIngredient] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ids, setId] = useState([])
 
  // Set Input Value
  const getIngredient = (event) => {
    setIngredient(event.target.value);
  }

  // Handler Function
  const checkID = () => {
    if(ids.length !==0){
      axios.all(ids).then(res=> console.log('checkID', res));
    }
  }
  const addIngredientId = async () => {
      //  listRecipesByIngredient(ingredient).then(res=> setId([...ids, ...res]));
      let ingre = await listRecipesByIngredient(ingredient).then(res=> res);
      let reciName = await listRecipesByName("Egg Fried Rice").then(res => res)
      
       await listRecipesByIds(ingre).then(res=> setFilteredRecipes(res));
  }


  return (
    <div className="search-bar">
       <input placeholder="Search Recipe Name"/>
       <input type="text" placeholder="Ingrident" onChange={getIngredient}/>
       <select>
        <option value="">--Calories--</option>
        <option value="fruit">Under 400</option>
        <option value="vegetable">400-600</option>
        <option value="meat">600-800</option>
        <option value="meat">over 900</option>
      </select>

      <p>id here: {JSON.stringify(ids)}</p>

      <button onClick={()=>{
        addIngredientId()
        setView("SearchResult")
        // listRecipesByIngredient(ingredient)
        // setId(listRecipesByIngredient(ingredient))
        // checkID()
        }}>Search</button>


    </div>
  );
}
