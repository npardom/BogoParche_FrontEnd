import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Receiving the email and password from the form
  const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Sending login info and receiving tokens
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {email, password}
    fetch("/api/auth/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
      "Content-Type": "application/json"
    } 
    }).then((res) => res.json())
    .then((confirmation) => {
      if (confirmation.error){
        alert("Usuario y/o contraseña inválidas. Inténtelo de nuevo.");
      } else {
        localStorage.setItem('username', confirmation.username);
        localStorage.setItem('access', confirmation.access);
        localStorage.setItem('refresh', confirmation.refresh);
        localStorage.setItem('isAdmin', confirmation.isAdmin);
        navigate("/");
        window.location.reload();
      }
    }) 
  };

  return (
    <div className = "card">
      <div className = "cardContainer">
      <div className = "titleCard">Bienvenido</div>
      <form onSubmit={handleSubmit}>
        <input type="email" onChange={getEmail}
            value={email} placeholder = "Correo electrónico" className = "loginField" required>
        </input>
        <input onChange={getPassword}
            value={password} placeholder = "Contraseña" type = "password" className = "loginField"
            required>
        </input>
        <button className = "genericButton loginButton2">Ingresar</button>
      </form>
      <div className = "noAccountQuestion">¿No tienes cuenta?&nbsp; 
      <NavLink to="/signUp" className = "goToSignUp">Registrarse</NavLink>
      </div>
      </div>
    </div>
  )
}

export default Login