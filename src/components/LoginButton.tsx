import userIcon from "../assets/icons/userIcon.png";
import { NavLink } from "react-router-dom";

function LoginButton() {
  return (
    <NavLink to="/signUp">
      <button className="loginButton">
        <img src={userIcon} className="userIcon" />
        <div className="loginButtonText">
          Ingresar/
          <br />
          <span className="textSpan">&nbsp;Registrarse</span>
        </div>
      </button>
    </NavLink>
  );
}

export default LoginButton;
