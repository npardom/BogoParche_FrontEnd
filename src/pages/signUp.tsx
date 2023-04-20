import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const s: React.CSSProperties = {
    backgroundColor: (passwordAgain != password) && (passwordAgain != "") ? "#f78b8b": "white",
    color: passwordAgain != password ? "white": "black",    
  };

  const getUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const getPasswordAgain = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordAgain(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {username, email, password}
    fetch("/api/signup", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
      "Content-Type": "application/json"
    } 
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.error){
        alert("Este correo ya se encuentra registrado.");
      } else if (result.data){
        alert("Cuenta creada con exito.");
        navigate("/login");
      }
    });
  };

  return (
    <div className="card">
      <div className="cardContainer">
        <div className="titleCard">Registrarse</div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={getUsername}
            value={username}
            placeholder="Nombre de usuario"
            className="loginField"
            required
          ></input>
          <input
            type="email" 
            onChange={getEmail}
            value={email}
            placeholder="Correo electrónico"
            className="loginField"
            required
          ></input>
          <input
            onChange={getPassword}
            value={password}
            placeholder="Contraseña"
            type="password"
            className="loginField"
            required
          ></input>
          <input
            onChange={getPasswordAgain}
            value={passwordAgain}
            placeholder="Confirmar contraseña"
            type="password"
            style={s}
            className="loginField"
            required
          ></input>
          <button disabled={(passwordAgain != password) && (passwordAgain != "")}className="genericButton loginButton2">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
