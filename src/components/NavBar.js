import React from "react";

export default function NavBar(props) {
  const { setView } = props;
  return (
    <div className="nav-bar">
     <p onClick={()=> {setView("HomeRecipes")}}>Nav: Fast Recipe</p>
     <button>Admin →</button>
    </div>
  );
}
