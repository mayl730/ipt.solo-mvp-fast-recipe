import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NavBar(props) {
  const { setView } = props;
  return (
    <div className="nav-bar">
    <Container>
      <Row>
        <Col>
     {/* <p onClick={()=> {setView("HomeRecipes")}}>Fast Recipe</p> */}
     <Link to="/"><p>Fast Recipe</p></Link>
     </Col>
     <Col>
     <Button className="float-end" size="sm" onClick={()=> {setView("Admin")}}>Add Recipe +</Button>
        <Link to="add-recipe">Add Recipe+</Link>
     </Col>
     </Row>
     </Container>
    </div>
  );
}
