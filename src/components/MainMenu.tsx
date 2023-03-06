import { NavLink as Link } from "react-router-dom";
import styled from "styled-components"

const NavLink = styled(Link)
`
  display: block;
  text-decoration: none;
  font-size: 16px;
  border: 2px solid white;
  background-color: rgba(0,0,0,0);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.165);
  border-radius: 8px;
  padding:6px 15px 6px 15px;
  margin: 0 4px 0 4px;
  height:fit-content;
  transition: 0.5s;
  color: white;

  &:visited {
    color: white;
  }

  &:hover{
    color: #2b085a;
    font-size: 17px;
    padding:6px 20px 6px 20px;
    background-color: white;
    transition: 0.5s;
  }

  &.active {
    border: 2px solid #ED87C6;
    background-color: #ED87C6;
    color: white;
    transition: 0.5s;
  }
`;

function MainMenu() {
  return (
    <div className="mainMenu">
      <NavLink to="/">Catálogo</NavLink>
      <NavLink to="/parches">Tus Parches</NavLink>
      <NavLink to="/sugerirActividad">Sugerir Actividad</NavLink>
      <NavLink to="/acercaDe">Sobre Nosotros</NavLink>
    </div>
  );
}

export default MainMenu;
