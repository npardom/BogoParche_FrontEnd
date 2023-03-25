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

  return (
    <div className ="catalogueContainer">
      <div className ="catalogueSearchBar">
        <form>
          <input type="search"
              placeholder = "Ingresa términos de búsqueda" className = "searchField" required>
          </input>
          <button className = "searchButton">&#x1F50D;</button>
        </form>
      </div>
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
            <input type ="checkbox">
            </input> Entretenimiento
          </label>
          <label className="filterItem">
            <input type ="checkbox">
            </input> Gastronomía
          </label>
          <p className="filterTitle">
            Precios
          </p>
          <label className="filterItem">
            <input type ="checkbox">
            </input> Gratis
          </label>
          <label className="filterItem">
            <input type ="checkbox">
            </input> 1k - 10k
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