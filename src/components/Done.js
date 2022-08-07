import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

export default function Done(props) {
    const { message } = props
    return (
      <div className="recipe-detail">
        <Container>
          <h2>Recipe is { message }!</h2>
          <Link to="/"><p>Back To Home</p></Link>
        </Container>
      </div>
    );
  }