import {useState, useEffect} from "react";
import {actividades, Activity} from "../assets/datos"
import ActivityCard from "../components/activityCard";

function Catalogue() {
  const [activities, setActivities] = useState([] as Activity[]);

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  function haceralgo() {
    console.log("Hello there :D")
  }
  return (
    <div className ="catalogueContainer">
        <form onSubmit = {haceralgo}>
          <input
              placeholder = "Ingresa términos de búsqueda" className = "searchField" required>
          </input>
        </form>
      {/*<div className="favsContainer">
        <label>
          <input type ="checkbox">
          </input> Favoritos
        </label>
      </div>
      <div className="assistContainer">
        <label>
          <input type ="checkbox">
          </input> Eventos a asistir
        </label>
      </div>*/}
      <div className="catalogueContainer2">
        <div className="filterContainer">
          <p className="filterTitle">
            Categorías
          </p>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Actividad Física
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Ambiental
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Bares y Discotecas
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Cultural
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Entretenimiento
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Gastronomía
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Turismo
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Otros
          </label>
          <p className="filterTitle">
            Precios
          </p>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> Gratis
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> 1k - 10k
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> 10k - 50k
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> 50k - 100k
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> 100k - 150k
          </label>
          <label className="filterItem">
            <input type ="checkbox" className="categoryCheckbox">
            </input> +150k
          </label>
        </div>
        <div className = "catalogueCardsContainer">
          {activities.map((activity: Activity)=> (
            <ActivityCard activity = {activity}/>
          ))}
        </div>
      </div>
    </div>
  )

  
}

export default Catalogue