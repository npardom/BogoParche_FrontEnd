import { NavLink } from "react-router-dom";

function YouNeedToRegister() {

  function hideMyself () {
    var element = document.getElementById("registerPopUpBackground") as HTMLDivElement;
    element.classList.remove('appeared')
    element = document.getElementById("registerPopUp") as HTMLDivElement;
    element.classList.remove('movedDown');
  }

  return (
    <div className ="registerPopUpWhole" id = "registerPopUpBackground" onClick ={hideMyself}>
    <div className ="registerPopUpCard" id = "registerPopUp" onClick ={hideMyself}>
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