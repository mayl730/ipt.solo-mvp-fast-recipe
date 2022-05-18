import logo from './logo.svg';
import './App.css';
import { test } from './utils/index';
import { useEffect } from 'react'
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import HomeRecipes from './components/HomeRecipes';

function App() {
  useEffect(() => { 
    test();
 });
  return (
    <div className="App">
         <NavBar />
         <SearchBar />
         <HomeRecipes/>
         <SearchResult />

    </div>
  );
}

export default App;
