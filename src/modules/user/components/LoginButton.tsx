import {userIcon, adminIcon} from "../imports";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogout, isAdmin, loggedInUser } from "../../../assets/functionsAndConstants";

function LoginButton() {
  const navigate = useNavigate();

  const goToActivities = () => {
    navigate("/añadirActividad");
  };
  
  const goToSuggestions = () => {
    navigate("/administrarSugerencias");
  };

  // If logged in, show user options
  if (loggedInUser()) {
    var userName = loggedInUser() as string;
    if (userName.length > 10){
      userName = userName.slice(0, 10) + "...";
    }
    return <button className="loginButton">
        <div className= "loginButtonText">
          {userName}
        </div>
        <img src={isAdmin()? adminIcon:userIcon} className="userIcon" />
        <div className ="userOptionsContainer">
          {isAdmin()?
            <>
              <div className = "userOptionButton" onClick={goToActivities}>Añadir Actividad</div>
              <div className = "userOptionButton" onClick={goToSuggestions}>Administrar Sugerencias</div>
            </>
          : <></>
          }
          <div className = "userOptionButton closeSessionButton" onClick={handleLogout}>Cerrar Sesión</div>
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
