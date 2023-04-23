import { NavLink } from "react-router-dom";
import { hidePopUp } from "../assets/datos";

function YouNeedToRegister() {
  return (
    <div className ="registerPopUpWhole" id = "registerPopUpBackground" onClick ={hidePopUp}>
    <div className ="registerPopUpCard" id = "registerPopUp" onClick ={hidePopUp}>
      <div className ="registerPopUpContainer">
      <NavLink to="/signUp" className = "goToSignUp2">
        Registrate
      </NavLink>&nbsp;o&nbsp;
      <NavLink to="/login" className = "goToLogin">
        Ingresa
      </NavLink>&nbsp;para acceder a esta y más funcionalidades
    </div>
    </div>
    </div>
  )
}

export default YouNeedToRegister