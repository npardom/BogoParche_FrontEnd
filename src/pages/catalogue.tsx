import {useState, useEffect} from "react";
import {Activity} from "../assets/datos"
import ActivityCard from "../components/activityCard";

function Catalogue() {
  const [activities, setActivities] = useState([] as Activity[]);

  const pricesList = ["Gratis",
    "1k - 10k",
    "10k - 50k",
    "50k - 100k",
    "100k - 150k",
    "+150k"
  ]

  const categoriesList = [ "Actividad Física",
    "Ambiental",
    "Bares y Discotecas",
    "Cultural",
    "Entretenimiento",
    "Gastronomía",
    "Turismo",
    "Otros"
  ]

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  return (
    <div className ="catalogueContainer">
        <form >
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
          {categoriesList.map((category: string)=> (
            <div className="filterItem">
            <input type ="checkbox" className="categoryCheckbox" id={category}/>
            <label>{category}</label>
            </div>
          ))}
          <p className="filterTitle">
            Precios
          </p>
          {pricesList.map((price: string)=> (
            <div className="filterItem">
            <input type ="checkbox" className="categoryCheckbox" id={price}/>
            <label>{price}</label>
            </div>
          ))}
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