import './App.css';
import './css/main.css';
import { listRecipes } from './utils/index';
import { useEffect, useState } from 'react'
import ScrollToTop from "./components/ui/ScrollToTop";
import NavBar from "./components/NavBar";
import HomeKV from "./components/HomeKV";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import HomeRecipes from './components/HomeRecipes';
import RecipeDetail from './components/RecipeDetail';
import Admin from './components/Admin';
import Edit from './components/Edit';
import Delete from './components/Delete';
import Done from './components/Done';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 


function App() {
  //State
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredID, setFilteredID] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [selectedRecipeIngredients, setSelectedRecipeIngredients] = useState([]);
  const [message, setMessage] = useState("");

  //useEffect
  useEffect(() => { 
    async function getAllRecipes() {
      listRecipes().then(data => setRecipes(data));
    }
    getAllRecipes();
  });

  return (

    <div className="bg-[url('/src/assets/img_bg1.png')] bg-no-repeat">
        <Router>
        <ScrollToTop />

         <NavBar/>
         <SearchBar
            filteredID = {filteredID}
            setFilteredID = {setFilteredID}
            setFilteredRecipes = {setFilteredRecipes}
            /> 
        
          <Routes>

            <Route exact path ="/" element = {
            <>
            <HomeKV/>
             <HomeRecipes
                  images = {images}
                  recipes = {recipes}
                  setSelectedRecipe = {setSelectedRecipe}
                  setSelectedRecipeIngredients = {setSelectedRecipeIngredients}
                />
            </>
            } />
            <Route path="add-recipe" element={<Admin
            setMessage = {setMessage}/>} />

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
              selectedRecipeIngredients = {selectedRecipeIngredients}
              setMessage = {setMessage}
              />} />

             <Route path="delete" element={<Delete />} />

             <Route path="done" element={<Done 
              message = {message}
              setMessage = {setMessage}
             />} />
          </Routes>
          <Footer />
        </Router>
    </div>
  
  );
}

export default App;
