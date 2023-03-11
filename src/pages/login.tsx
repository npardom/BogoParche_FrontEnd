import { NavLink } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {email, password}
    console.log(body);
      fetch("/api/login", {
       method: "POST",
       mode: "cors",
       body: JSON.stringify(body),
       headers: {
        "Content-Type": "application/json"
      } 
      }).then((res) => res.json())
      .then((confirmation) => setConfirmation(confirmation.token));;
  };

  return (
    <div className = "card">
      <div className = "cardContainer">
      <div className = "titleCard">Bienvenido</div>
      <form onSubmit={handleSubmit}>
        <input onChange={getEmail}
            value={email} placeholder = "Correo electrónico" className = "loginField">
        </input>
        <input onChange={getPassword}
            value={password} placeholder = "Contraseña" type = "password" className = "loginField">
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