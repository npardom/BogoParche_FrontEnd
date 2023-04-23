import { NavLink } from "react-router-dom";
import locationIcon from "../assets/icons/locationIcon.png";
import categoryIcon from "../assets/icons/categoryIcon.png";
import dateIcon from "../assets/icons/dateIcon.png";
import timeIcon from "../assets/icons/timeIcon.png";
import priceIcon from "../assets/icons/priceIcon.png";
import over18Icon from "../assets/icons/over18Icon.png";
import moreInfoIcon from "../assets/icons/moreInfoIcon.png";
import closeIcon from "../assets/icons/closeIcon.png";
import React, { useState } from "react";


function InfoWindow() {
  const [isAppeared, setIsAppeared] = useState(false);
  const showPopUp = () => {
    setIsAppeared(true);
    var element = document.getElementById("informationPopUpBackground") as HTMLDivElement;
    element.classList.add('appeared')
    element = document.getElementById("informationPopUp") as HTMLDivElement;
  }

  const hidePopUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsAppeared(false);
    var element = document.getElementById("informationPopUpBackground") as HTMLDivElement;
    element.classList.remove('appeared')
    element = document.getElementById("informationPopUp") as HTMLDivElement;
  }

  return (
    <div>
      <button onClick={showPopUp}>Mostrar Pop-up</button>
      <div className={`informationPopUpWhole ${isAppeared ? 'appeared' : ''}`} id="informationPopUpBackground" onClick={hidePopUp}>
        <div className="informationPopUpCard" id="informationPopUp" onClick={(e) => e.stopPropagation()}>
          <img src={closeIcon} alt="Cerrar" className="closeIcon" onClick={hidePopUp} />
          <div className="informationPopUpContainer">
          <h2 className="title">Sugerencia 1</h2>
            <div className="informationGrid">
            <div className="informationSection">
              <img src={locationIcon} alt="Ubicación" className="icon" />
              <div className="titleAndDescription">
              <span className="subtitle">Ubicación</span>
              <p className="description">Acá va la ubi</p>
              </div>
            </div>
            <div className="informationSection">
              <img src={categoryIcon} alt="Categoría" className="icon" />
              <div className="titleAndDescription">
              <span className="subtitle">Categoría</span>
              <p className="description">Acá la categoria</p>
              </div>
            </div>
            <div className="informationSection">
              <img src={dateIcon} alt="Fecha" className="icon" />
              <div className="titleAndDescription">
              <span className="subtitle">Fecha</span>
              <p className="description">acá la fecha</p>
              </div>
            </div>
            <div className="informationSection">
              <img src={timeIcon} alt="Hora" className="icon" />
              <div className="titleAndDescription">
              <span className="subtitle">Hora</span>
              <p className="description">acá la hora</p>
              </div>
            </div>
            <div className="informationSection">
              <img src={priceIcon} alt="Precio" className="icon" />
              <div className="titleAndDescription">
              <span className="subtitle">Precio</span>
              <p className="description">acá el precio</p>
              </div>
            </div>
            <div className="informationSection">
              <img src={over18Icon} alt="Mayores de 18" className="icon" />
              <div className="titleAndDescription">
              <span className="subtitle">Edad</span>
              <p className="description">n0 o si</p>
              </div>
            </div>
            <div className="informationSection">
              <img src={moreInfoIcon} alt="Más Información" className="icon" />
              <div className="titleAndDescription">
              <span className="subtitle">URL</span>
              <NavLink to="url" className = "description">
              <p className="description">ola.com</p>
              </NavLink>&nbsp;
              </div>
              <div className="aboutActivity">
              <h3>Acerca de la Actividad</h3>
              <p className="description2">Buajaja acá iría una descripcion si esto tuviera descripción</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoWindow;
