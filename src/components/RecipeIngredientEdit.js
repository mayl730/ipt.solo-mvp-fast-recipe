import React from 'react'
import { Form, Col, Row, Container, Button } from 'react-bootstrap';


export default function RecipeIngredientEdit(props) {
    const { recipeIngredient } = props;
  return (
    <>
        <Row>
            <Col>
                <Form.Control type="text"/>
            </Col>
            <Col>
                <Form.Control type="text"/>
            </Col>
            <Col>
                <Button>
                    &times;
                </Button>
            </Col>
        </Row>

    </>
  )
}
