import TitleBox from "./TitleBox";
import MainMenu from "./MainMenu";
import LoginButton from "./LoginButton";

function Header() {
  return (
    <div className = "header">
      <TitleBox />
      <MainMenu />
      <LoginButton />
    </div>
  );
}

export default Header;
