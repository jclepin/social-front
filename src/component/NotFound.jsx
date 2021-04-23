import Basic from "../app/template/Basic";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Basic>
      <big>La page n'a pas été trouvée</big>
      <h1>404</h1>
      <Link to='/'>Retour à l'accueil</Link>
    </Basic>
  );
};

export default NotFound;
