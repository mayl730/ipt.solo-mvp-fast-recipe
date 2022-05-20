import './App.css';
import { listRecipes } from './utils/index';
import { useEffect, useState } from 'react'
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import HomeRecipes from './components/HomeRecipes';
import RecipeDetail from './components/RecipeDetail';
import Admin from './components/Admin';

function App() {
  //State
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredID, setFilteredID] = useState({});
  const [currentView, setView] = useState("HomeRecipes");
  const [selectedRecipe, setSelectedRecipe] = useState("");

  //Effect
  useEffect(() => { 
    async function getAllRecipes() {
      listRecipes().then(data => setRecipes(data));
    }
    getAllRecipes();
  });

  // handler function

  // setView Statement
  let view;
  if(currentView === "HomeRecipes") {
    view = <HomeRecipes
    recipes = {recipes}
    setView = {setView}
    setSelectedRecipe = {setSelectedRecipe}
  />;
  }
  if(currentView === "RecipeDetail") view = <RecipeDetail setView = {setView}
  selectedRecipe = {selectedRecipe}
  filteredRecipes = {filteredRecipes}/>
  if(currentView === "SearchResult") view = <SearchResult filteredRecipes = {filteredRecipes}
  setView = {setView}
  setSelectedRecipe = {setSelectedRecipe}
  />
  if(currentView === "Admin") view = <Admin />


  return (
    <div className="App">
         <NavBar
         setView = {setView}
         />
         <SearchBar
         setView = {setView}
         filteredID = {filteredID}
         setFilteredID = {setFilteredID}
         setFilteredRecipes = {setFilteredRecipes}
         /> 
         { view }   
    </div>
  );
}

export default App;
