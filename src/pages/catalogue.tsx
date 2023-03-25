import {useState, useEffect} from "react";
import {Activity} from "../assets/datos"
import searchIcon from "../assets/icons/searchIcon.png";
import ActivityCard from "../components/activityCard";

function Catalogue() {
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

  const [activities, setActivities] = useState([] as Activity[]);
  const [searchTerms,setSearchTerms] = useState("");

  const getSearchTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(event.target.value);
  };

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  function sendFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    var categories = [];
    var prices = [];
    for (var i = 0; i < categoriesList.length; i++) {
      const checkbox = document.getElementById(categoriesList[i]) as HTMLInputElement;
      if (checkbox.checked){
        categories.push(categoriesList[i])
      }
    }
    for (var i = 0; i < pricesList.length; i++) {
      const checkbox = document.getElementById(pricesList[i]) as HTMLInputElement;
      if (checkbox.checked){
        prices.push(pricesList[i])
      }
    }
    console.log(categories.join(','))
    console.log(prices.join(','))
    var address = "categories=" + categories.join(',') +"&";
    address += "range_prices=" + prices.join(',') + "&";
    address += "search=" + searchTerms;
    console.log(address)
    fetch("/api/filter?" + address, {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
    } 
    })
    .then((res) => res.json())
    .then((dato) => {
      setActivities(dato)
      console.log(dato)
    });
  }

  function CatalogueCards (){
    if (activities.length == 0){
      return <p className ="noActivitiesText">No hay actividades para mostrar</p>
    }else{
      return (
        <>
        {activities.map((activity: Activity)=> (
        <ActivityCard activity = {activity} />
        ))}
      </>
      )
    }
  }

  return (
    <div className ="catalogueContainer">
        <form className="searchContainer" onSubmit={sendFilter} >
          <img src = {searchIcon} className ="searchImage"></img>
          <input onChange={getSearchTerms}
              placeholder = "Ingresa términos de búsqueda" className = "searchField">
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
          <CatalogueCards/>
        </div>
      </div>
    </div>
  )

  
}

export default Catalogue