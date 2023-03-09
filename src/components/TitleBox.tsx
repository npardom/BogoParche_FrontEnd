import logo from "../assets/websiteLogo.png";
import { NavLink } from "react-router-dom";

function TitleBox() {
  return (
    <div className = "titleBox">
      <NavLink to="/">
        <img src={logo} className = "websiteLogo"/>
      </NavLink>
      <div className = "websiteSlogan">Descubre los mejores planes en Bogotá</div>
    </div>
  );
}

export default TitleBox;
