import {useState, useEffect} from "react";
import { Activity, pricesList } from "../assets/datos";
import searchIcon from "../assets/icons/searchIcon.png";
import ActivitySmallCard from "../components/ActivitySmallCard";

function Catalogue() {
  const [activities, setActivities] = useState([] as Activity[]);
  const [categories, setCategories] = useState([] as any);
  const [user, setUser] = useState("");

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
    var search = document.getElementById("searchBarId") as HTMLInputElement;
    var prices = [];
    var categoriesChecked = [];

    var cats = Object.keys(categories);

    for (var i = 0; i < cats.length; i++) {
      const checkbox = document.getElementById(cats[i]) as HTMLInputElement;
      if (checkbox.checked){
        categoriesChecked.push(categories[cats[i]])
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
    address += "search=" + search.value;
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
    });
  }

  function CatalogueCards (){
    if (activities.length == 0){
      return <p className ="noActivitiesText">No hay actividades para mostrar</p>
    }else{
      return (
        <>
        {activities.map((activity: Activity)=> (
        <ActivitySmallCard activity = {activity} />
        ))}
      </>
      )
    }
  }

  function toggleButton(id: string) {
    var line = document.getElementById(id + "checkbox") as HTMLDivElement;
    var bttn = document.getElementById(id) as HTMLInputElement;
    if (!bttn.checked){
      line.classList.add('opacityWhole');
      bttn.checked = true;
    }else{
      line.classList.remove('opacityWhole');
      bttn.checked = false;
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <div className ="catalogueContainer">
        <form className="searchContainer" onSubmit={sendFilter} >
          <img src = {searchIcon} className ="searchImage"></img>
          <input id ="searchBarId"
              placeholder = "Ingresa términos de búsqueda" className = "searchField">
          </input>
        </form>
      {user? <div className = "favsWillAssistBarContainer">
        <div className="catalogueSpecialFilterOption {
"
        onClick = {()=>toggleButton("Favourites")} id ="Favouritescheckbox" >
          <input type ="checkbox" className="categoryCheckbox2" id ="Favourites">
          </input>
          <label>
            Favoritos
          </label>
        </div>
        <div className="catalogueSpecialFilterOption {
"
        onClick = {()=>toggleButton("EventsToAssist")} id ="EventsToAssistcheckbox">
          <input type ="checkbox" className="categoryCheckbox2" id ="EventsToAssist">
          </input>
          <label>
            Eventos a asistir
          </label>
        </div>
      </div>: <></>}
      <div className="catalogueContainer2">
        <div className="filterContainer">
          <p className="filterTitle filterTitle2">
            Categorías
          </p>
          {Object.keys(categories).map((categoryId: string)=> (
            <div className="filterItem" onClick = {()=>toggleButton(categoryId)} id ={categoryId+"checkbox"}>
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
            <div className="filterItem" onClick = {()=>toggleButton(price)} id ={price+"checkbox"}>
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