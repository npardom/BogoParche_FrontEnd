import {useState, useEffect} from "react";
import { Activity, pricesList } from "../assets/datos";
import searchIcon from "../assets/icons/searchIcon.png";
import ActivityCard from "../components/activityCard";

function Catalogue() {
  const [activities, setActivities] = useState([] as Activity[]);
  const [searchTerms,setSearchTerms] = useState("");
  const [categories, setCategories] = useState([] as any);

  const getSearchTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(event.target.value);
  };

  useEffect(()=>{
    fetch("/api/get-categories", {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
    } 
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.data){
        setCategories(result.data);
      }
    });
  }, [])

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  function sendFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    var prices = [];
    var categoriesChecked = [];
    for (var element in Object.keys(categories)) {
      const checkbox = document.getElementById(element) as HTMLInputElement;
      if (checkbox.checked){
        categoriesChecked.push(categories[element])
      }
    }
    for (var i = 0; i < pricesList.length; i++) {
      const checkbox = document.getElementById(pricesList[i]) as HTMLInputElement;
      if (checkbox.checked){
        prices.push(pricesList[i])
      }
    }
    var address = "categories=" + categoriesChecked.join(',') +"&";
    address += "range_prices=" + prices.join(',') + "&";
    address += "search=" + searchTerms;
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
          <p className="filterTitle filterTitle2">
            Categorías
          </p>
          {Object.keys(categories).map((categoryId: string)=> (
            <div className="filterItem">
            <div className = "filterCheckboxContainer">
            <input type ="checkbox" className="categoryCheckbox" id={categoryId}/>
            </div>
            <label>{categories[categoryId]}</label>
            </div>
          ))}
          <p className="filterTitle">
            Precios
          </p>
          {pricesList.map((price: string)=> (
            <div className="filterItem">
            <div className = "filterCheckboxContainer">
            <input type ="checkbox" className="categoryCheckbox" id={price}/>
            </div>
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