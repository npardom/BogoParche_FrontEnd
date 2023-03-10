import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className = "card">
      <div className = "cardContainer">
      <div className = "titleCard">Bienvenido</div>
      <form>
        <input placeholder = "Correo electrónico" className = "loginField">
        </input>
        <input placeholder = "Contraseña" type = "password" className = "loginField">
        </input>
        <button className = "loginButton2">Ingresar</button>
      </form>
      <div className = "noAccountQuestion">¿No tienes cuenta?&nbsp; 
      <NavLink to="/signUp" className = "goToSignUp">Registrarse</NavLink>
      </div>
      </div>
    </div>
  )
}

export default Login