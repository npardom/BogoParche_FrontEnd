import { useState, useEffect } from "react";

function SignUp() {

  const [confirmation, setConfirmation] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [messsageIfNotMatch, setMesssageIfNotMatch] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === passwordAgain) {
      const body = {username, email, password}
      console.log(body);
      //fetch("/api/signup", {
      //  method: "POST",
      //  mode: "cors",
      //  body: JSON.stringify(body),
      //});
      
      // Get token
      console.log(fetch("/api")
      .then((res) => res.json())
      .then((dato) => setConfirmation(dato.data)));

    } else {
      setMesssageIfNotMatch("passwords don't match");
    }
  };

  return (
    <div className="card">
      <div className="cardContainer">
        <div className="titleCard">Registrarse</div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={getUsername}
            value={username}
            placeholder="Nombre de Usuario"
            className="loginField"
          ></input>
          <input
            onChange={getEmail}
            value={email}
            placeholder="Correo electrónico"
            className="loginField"
          ></input>
          <input
            onChange={getPassword}
            value={password}
            placeholder="Contraseña"
            type="password"
            className="loginField"
          ></input>
          <input
            onChange={getPasswordAgain}
            value={passwordAgain}
            placeholder="Confirmar contraseña"
            type="password"
            className="loginField"
          ></input>
          <div className = "nonMatchingPasswords"></div>
          <button className="loginButton2">Crear cuenta</button>
          <div className = "nonMatchingPasswords">{messsageIfNotMatch}</div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
