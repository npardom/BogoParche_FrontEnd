import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username")) {    
      navigate('/');
      window.location.reload();
    }
  });
  useEffect(() => {
    localStorage.setItem('username', username)
  }, [username])
  
  const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {email, password}
    fetch("/api/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
      "Content-Type": "application/json"
    } 
    }).then((res) => res.json())
    .then((confirmation) =>{
      setToken(confirmation.token)
      setUsername(confirmation.username)
    } 
    );
    
    
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