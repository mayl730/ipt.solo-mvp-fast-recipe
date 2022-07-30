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
     <Link to="/"><p>Fast Recipe</p></Link>
     </Col>
     <Col>
        <Link to="add-recipe"><Button className="float-end" size="sm">Add Recipe +</Button></Link>
     </Col>
     </Row>
     </Container>
    </div>
  );
}
