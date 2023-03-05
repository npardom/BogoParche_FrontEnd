import userIcon from "../assets/userIcon.png";

function LoginButton() {
  return (
    <div className = "loginButtonContainer">
      <img src={userIcon} className = "userIcon" />
      <button className = "loginButton" >
          Ingresar/
          <br/>
          <span>&nbsp;&nbsp;Registrarse</span>
      </button>
    </div>
  );
}

export default LoginButton;
