import logo from './logo.svg';
import './App.css';
import { test } from './utils/index';
import { useEffect } from 'react'

function App() {
  useEffect(() => { 
    test();
 });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Fast Recipe
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
