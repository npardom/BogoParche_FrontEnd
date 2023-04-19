import userIcon from "../assets/icons/userIcon.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    setUser("");
    localStorage.clear();
    window.location.reload();
  };

  const goToActivities = () => {
    navigate("/añadirActividad");
  };

  const goToSuggestions = () => {
    navigate("/administrarSugerencias");
  };

  // If logged in
  if (user) {
    var userNameShort = user;
    if (user.length > 10){
      userNameShort = user.slice(0, 10) + "...";
    }
    return <button className="loginButton">
        <div className= "loginButtonText">
          {userNameShort}
        </div>
        <img src={userIcon} className="userIcon" />
        <div className ="userOptionsContainer">
          <div className = "userOptionButton" onClick={goToActivities}>Añadir Actividad</div>
          <div className = "userOptionButton" onClick={goToSuggestions}>Administrar Sugerencias</div>
          <div className = "userOptionButton" onClick={handleLogout}>Cerrar Sesión</div>
        </div>
      </button>
  }
  // If not logged in
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
