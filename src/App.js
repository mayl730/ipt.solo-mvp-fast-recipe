import './App.css';
import './css/main.css';
import { listRecipes } from './utils/index';
import { useEffect, useState } from 'react'
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import HomeRecipes from './components/HomeRecipes';
import RecipeDetail from './components/RecipeDetail';
import Admin from './components/Admin';
import Edit from './components/Edit';
import Delete from './components/Delete';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 


function App() {
  //State
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredID, setFilteredID] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [selectedRecipeIngredients, setSelectedRecipeIngredients] = useState([]);

  //Effect
  useEffect(() => { 
    async function getAllRecipes() {
      listRecipes().then(data => setRecipes(data));
    }
    getAllRecipes();
  });

  return (

    <div className="App">
        <Router>
         <NavBar/>
         <SearchBar
         filteredID = {filteredID}
         setFilteredID = {setFilteredID}
         setFilteredRecipes = {setFilteredRecipes}
         /> 
          <Routes>

            <Route path ="/" element = {<HomeRecipes
                  images = {images}
                  recipes = {recipes}
                  setSelectedRecipe = {setSelectedRecipe}
                  setSelectedRecipeIngredients = {setSelectedRecipeIngredients}
                />} />
            <Route path="add-recipe" element={<Admin />} />

            <Route path="recipe-detail" element={<RecipeDetail
              selectedRecipe = {selectedRecipe}
              filteredRecipes = {filteredRecipes}
              selectedRecipeIngredients = {selectedRecipeIngredients}
              />} />

            <Route path="search-result" element={<SearchResult
              filteredRecipes = {filteredRecipes}
              setSelectedRecipe = {setSelectedRecipe}
              selectedRecipeIngredients = {setSelectedRecipeIngredients}
             />} />

             <Route path="edit" element={<Edit 
              selectedRecipe = {selectedRecipe}
              setSelectedRecipe = {setSelectedRecipe}
              />} />

             <Route path="delete" element={<Delete />} />
          </Routes>
        </Router>
    </div>
  
  );
}

export default App;
