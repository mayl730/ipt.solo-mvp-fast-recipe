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
  const [currentView, setView] = useState("HomeRecipes");
  const [selectedRecipe, setSelectedRecipe] = useState([]);

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
  if(currentView === "HomeRecipes") view = <HomeRecipes
  recipes = {recipes}
  setView = {setView}/>;
  if(currentView === "RecipeDetail") view = <RecipeDetail setView = {setView}/>
  if(currentView === "SearchResult") view = <SearchResult />
  if(currentView === "Admin") view = <Admin />


  return (
    <div className="App">
         <NavBar setView = {setView}/>
         <SearchBar setView = {setView}/> 
         { view }   
    </div>
  );
}

export default App;
