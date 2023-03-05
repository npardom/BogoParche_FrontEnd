import logo from "../assets/website-logo.png";

function TitleBox() {
  return (
    <div className = "titleBox">
      <img src={logo} className = "websiteLogo"/>
      <div className = "websiteSlogan">Descubre los mejores planes en Bogotá</div>
    </div>
  );
}

export default TitleBox;
