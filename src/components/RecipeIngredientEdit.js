import React from 'react'
import { Form, Col, Row, Container, Button } from 'react-bootstrap';


export default function RecipeIngredientEdit(props) {
    const {recipeIngredientList,
            handleIngredientChange,
            removeIngredient,
            index} = props;
  return (
    <>
        <Row>
            <Col>
                <Form.Control
                name="name"
                type="text"
                value= {recipeIngredientList[index].name}
                onChange={handleIngredientChange(index)}
                />
            </Col>
            <Col>
                <Form.Control
                name="amount"
                type="text"
                value={recipeIngredientList[index].amount}
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
