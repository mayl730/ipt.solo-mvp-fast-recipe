import './App.css';
import { listRecipes } from './utils/index';
import { useEffect, useState } from 'react'
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import HomeRecipes from './components/HomeRecipes';
import RecipeDetail from './components/RecipeDetail';

function App() {
  //State
  const [recipes, setRecipes] = useState([]);
  const [currentView, setView] = useState("HomeRecipes");
  const [selectedRecipe, setSelectedRecipe] = useState("");

  //Effect
  useEffect(() => { 
    async function getAllRecipes() {
      listRecipes().then(data => setRecipes(data));
    }
    getAllRecipes();
    // console.log(recipes);
  });
  let view;

  if(currentView === "HomeRecipes") view = <HomeRecipes recipes = {recipes}/>;
  if(currentView === "RecipeDetail") view = <RecipeDetail />

  return (
    <div className="App">
         <NavBar />
         <SearchBar /> 
         { view }   
         {/* <RecipeDetail /> */}
         <SearchResult />
    </div>
  );
}

export default App;
