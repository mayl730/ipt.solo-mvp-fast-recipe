import React from 'react'
import { Form, Col, Row, Container, Button } from 'react-bootstrap';


export default function RecipeIngredientEdit(props) {
    const {recipeIngredientRequest,
            handleIngredientChange,
            removeIngredient,
            index} = props;
  return (
    <>
        <Row>
            <Col>
                <Form.Control
                name="ingredient"
                type="text"
                value= {recipeIngredientRequest.name}
                onChange={handleIngredientChange(index)}
                />
            </Col>
            <Col>
                <Form.Control
                name="amount"
                type="text"
                value={recipeIngredientRequest.amount}
                onChange={handleIngredientChange(index)}
                />
            </Col>
            <Col>
                <Button onClick={()=>removeIngredient(index)}>
                    &times;
                </Button>
            </Col>
        </Row>

    </>
  )
}
