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
    <header className="sticky top-0 z-50">
      <nav className="border-gray-200 px-10 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/">
          <img src={require('../assets/img_logo1.png')} className="mt-2 mr-3 h-10 sm:h-9" alt="fast recipe Logo" />
          </Link>
        
        <Link to="add-recipe">
          <ButtonIcon>Add Recipe</ButtonIcon>
        </Link>
       
        </div>
      </nav>
    </header>
  );
}
