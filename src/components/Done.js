import { Link } from "react-router-dom";
import { ButtonIcon } from './ui/Buttons';

export default function Done(props) {
    const { message } = props
    return (
      <div className="container mx-auto">
          <h2 className="text-3xl font-montserrat font-bold text-center text-black-800 my-7">Recipe is { message }!</h2>
          <Link to="/">
            <ButtonIcon className="container mx-auto">Back to Home</ButtonIcon>
          </Link>
      </div>

    );
  }