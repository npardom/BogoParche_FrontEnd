import userIcon from "../assets/icons/userIcon.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect} from "react";

function LoginButton() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    setUser("");
    localStorage.clear();
    window.location.reload();
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
        <div className = "userOptionButton" onClick={handleLogout}>Cerrar Sesión</div>
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
