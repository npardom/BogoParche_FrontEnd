import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
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
    .then((confirmation) => setConfirmation(confirmation.token));
    // store the user in localStorage
    localStorage.setItem('user', email)
    navigate('/');
    window.location.reload();
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