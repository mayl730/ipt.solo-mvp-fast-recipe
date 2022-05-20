import { useState } from "react"
import { editRecipe } from '../utils/index';

export default function Edit(props) {
const { selectedRecipe } = props;
const [titlee, setTitle] = useState(selectedRecipe.title);
const [descriptionn, setDescription] = useState("");
const [caloriess, setCalories] = useState([]);
const [typee, setType] = useState([]);

const getTitle = (event) => {
    setTitle(event.target.value);
}
//function
const sendRequest = () => {
// const [request, setRequest] = useState({
//             id: 8,
//             title: "Miso Soup",
//             description: "Changed Description",
//             calories : 200,
//             type: "Lunch"
// });
}

 return (
    <div className="edit">
     <h3>Edit a Recipe</h3>
     <p>print {JSON.stringify(selectedRecipe)}</p>
     <form>
      <label>Recipe Name: 
        <input type="text" value={titlee} onChange={getTitle}/>
      </label>
    
      <label>Recipe description: 
        <textarea type="text" />
      </label>

      <label>Calories - kcal
        <input type="text" />
      </label>
    </form>
    <button onClick={editRecipe}>Confirm</button>
     </div>
 )
}

// value={selectedRecipe.title}