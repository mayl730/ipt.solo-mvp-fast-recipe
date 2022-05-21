import React from "react";
import { Container, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NavBar(props) {
  const { setView } = props;
  return (
    <div className="nav-bar">
    <Container>
      <Row>
        <Col sm={9}>
     <p onClick={()=> {setView("HomeRecipes")}}>Fast Recipe</p>
     </Col>
     <Col sm={3}>
     <Button size="sm" onClick={()=> {setView("Admin")}}>Add Recipe +</Button>
     </Col>
     </Row>
     </Container>
    </div>
  );
}
