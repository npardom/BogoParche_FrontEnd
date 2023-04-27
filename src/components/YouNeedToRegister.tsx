import { NavLink } from "react-router-dom";
import { togglePopUp } from "../assets/functionsAndConstants";

// This pop-up shows up when trying to access a function or button
// which requires having previously logged in
function YouNeedToRegister() {
  return (
    <div className ="registerPopUpWhole" id = "registerPopUpBackground" onClick ={()=>togglePopUp("registerPopUp",true)}>
    <div className ="registerPopUpCard" id = "registerPopUp" onClick ={()=>togglePopUp("registerPopUp",true)}>
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