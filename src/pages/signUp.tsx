function SignUp(){
    return <div className="card">
        <div className = "cardContainer">
        <div className = "titleCard">Registrarse</div>
      <form>
        <input placeholder = "Nombre de Usuario" className = "loginField">
        </input>
        <input placeholder = "Correo electrónico" className = "loginField">
        </input>
        <input placeholder = "Contraseña" type = "password" className = "loginField">
        </input>
        <input placeholder = "Confirmar contraseña" type = "password" className = "loginField">
        </input>
        <button className = "loginButton2">Crear cuenta</button>
      </form>
        </div>
    </div>
}

export default SignUp