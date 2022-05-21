import React from "react";
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NavBar(props) {
  const { setView } = props;
  return (
    <div className="nav-bar">
    <Container>
     <p onClick={()=> {setView("HomeRecipes")}}>Fast Recipe</p>
     <Button size="sm" className="float-end" onClick={()=> {setView("Admin")}}>Add Recipe +</Button>
     </Container>
    </div>
  );
}
