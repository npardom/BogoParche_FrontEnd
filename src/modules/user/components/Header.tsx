import TitleBox from "./TitleBox";
import MainMenu from "./MainMenu";
import LoginButton from "./LoginButton";

function Header() {
  return (
    <div className = "header">
      <div className ="planeContainer" id = "plane"></div>
      <TitleBox />
      <MainMenu />
      <LoginButton />
    </div>
  );
}

export default Header;
