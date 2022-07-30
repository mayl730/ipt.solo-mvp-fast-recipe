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
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"; 


function App() {
  //State
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredID, setFilteredID] = useState({});
  const [currentView, setView] = useState("HomeRecipes");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [selectedRecipeIngredients, setSelectedRecipeIngredients] = useState([]);

  //Effect
  useEffect(() => { 
    async function getAllRecipes() {
      listRecipes().then(data => setRecipes(data));
    }
    getAllRecipes();
  });

  // setView Statement
  let view;
  // if(currentView === "HomeRecipes") {
  //   view = <HomeRecipes
  //   images = {images}
  //   recipes = {recipes}
  //   setView = {setView}
  //   setSelectedRecipe = {setSelectedRecipe}
  //   setSelectedRecipeIngredients = {setSelectedRecipeIngredients}
  // />;
  // }
  if(currentView === "RecipeDetail") {
    view = <RecipeDetail setView = {setView}
    selectedRecipe = {selectedRecipe}
    filteredRecipes = {filteredRecipes}
    selectedRecipeIngredients = {selectedRecipeIngredients}
    />
  }
  if(currentView === "SearchResult") {
    view = <SearchResult filteredRecipes = {filteredRecipes}
    setView = {setView}
    setSelectedRecipe = {setSelectedRecipe}
    selectedRecipeIngredients = {setSelectedRecipeIngredients}
  />
  }
  if(currentView === "Admin") view = <Admin />
  if(currentView === "Edit") view = <Edit 
  selectedRecipe = {selectedRecipe}
  setView = {setView}
  setSelectedRecipe = {setSelectedRecipe}
  />


  return (

    <div className="App">
          <Router>
         <NavBar
         setView = {setView}
         />
         <SearchBar
         setView = {setView}
         filteredID = {filteredID}
         setFilteredID = {setFilteredID}
         setFilteredRecipes = {setFilteredRecipes}
         /> 
         <Routes>
           <Route path ="/" element = {<HomeRecipes
                images = {images}
                recipes = {recipes}
                setView = {setView}
                setSelectedRecipe = {setSelectedRecipe}
                setSelectedRecipeIngredients = {setSelectedRecipeIngredients}
              />} />
           <Route path="add-recipe" element={<Admin />} />
           <Route path="recipe-detail" element={<RecipeDetail
            selectedRecipe = {selectedRecipe}
            filteredRecipes = {filteredRecipes}
            selectedRecipeIngredients = {selectedRecipeIngredients}
            />} />
         </Routes>
         </Router>
         {/* { view }    */}
    </div>
  
  );
}

export default App;
