import userIcon from "../assets/icons/userIcon.png";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../assets/functionsAndConstants";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const loggedInUser = localStorage.getItem("username");
  const navigate = useNavigate();

  const goToActivities = () => {
    navigate("/añadirActividad");
  };
  
  const goToSuggestions = () => {
    navigate("/administrarSugerencias");
  };

  // If logged in, show user options
  if (loggedInUser) {
    var userName = loggedInUser;
    if (userName.length > 10){
      userName = loggedInUser.slice(0, 10) + "...";
    }
    return <button className="loginButton">
        <div className= "loginButtonText">
          {userName}
        </div>
        <img src={userIcon} className="userIcon" />
        <div className ="userOptionsContainer">
          <div className = "userOptionButton" onClick={goToActivities}>Añadir Actividad</div>
          <div className = "userOptionButton" onClick={goToSuggestions}>Administrar Sugerencias</div>
          <div className = "userOptionButton" onClick={handleLogout}>Cerrar Sesión</div>
        </div>
      </button>
  }
  // If not logged in, show login/signup button
  return (
    <NavLink to="/login">
      <button className="loginButton">
        <div className="loginButtonText">
          Ingresar/
          <br />
          <span className="textSpan">&nbsp;Registrarse</span>
        </div>
        <img src={userIcon} className="userIcon" />
      </button>
    </NavLink>
  );
}

export default LoginButton;
