import React from "react";
import { Link } from "react-router-dom";
// import { Container, Button, Col, Row } from 'react-bootstrap';
import ButtonIcon from './ButtonIcon';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NavBar(props) {
  return (
    // <div className="nav-bar">
    // <Container>
    //   <Row>
    //     <Col>
    //       <Link to="/"><p>Fast Recipe</p></Link>
    //     </Col>
    //  <Col>
    //     <Link to="add-recipe">
    //       <Button className="float-end" size="sm">Add Recipe +</Button>
    //     </Link>
    //  </Col>
    //  </Row>
    //  </Container>
    // </div>
    <header>
      <nav class="bg-black border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/">
          <img src={require('../assets/img_logo1.png')} class="mr-3 h-6 sm:h-9" alt="fast recipe Logo" />
          </Link>
        </div>
        <Link to="add-recipe">
          <ButtonIcon>Add Recipe</ButtonIcon>
        </Link>
       
      </nav>
    </header>
  );
}
