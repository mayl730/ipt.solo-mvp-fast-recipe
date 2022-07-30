import { Link } from "react-router-dom";
import { Container} from 'react-bootstrap';

export default function Delete(props) {
    return (
      <div className="recipe-detail">
      <Container>
        <h2>Recipe Deleted!</h2>
         <Link to="/"><p>Back to Home</p></Link>
      </Container>
      </div>
    );
  }