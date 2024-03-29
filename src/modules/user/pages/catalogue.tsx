import { useState, useEffect } from "react";
import { Activity } from "../../../assets/interfaces";
import { pricesList, toggleCatalogueCheckbox,categoryNames, loggedInUser, accessToken} from "../../../assets/functionsAndConstants";
import { searchIcon, ActivitySmallCard} from "../imports";

function Catalogue() {
  const [activities, setActivities] = useState([] as Activity[]);
  const [categories, setCategories] = useState({"":""} as any);
  const [loadedFirstTime, setLoadedFirstTime] =useState(false);
  
  // Gets all the categories
  useEffect(() => {
    if(loadedFirstTime && localStorage.getItem("categoryNames")){
      setCategories(categoryNames());
    }
  }, [loadedFirstTime]);

  // Receives all the public activities on the database
  useEffect(() => {
    fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/activity/all")
    .then((res) => res.json())
    .then((dato) =>{
      setActivities(dato)
      setLoadedFirstTime(true)
    });
  }, []);

  function sendFilter() {
    var prices = [];
    var categoriesChecked = [];
    var cats = Object.keys(categories);
    // Checks which categories are checked
    for (var i = 0; i < cats.length; i++) {
      const checkbox = document.getElementById(cats[i]) as HTMLInputElement;
      if (checkbox.checked) {
        categoriesChecked.push(categories[cats[i]]);
      }
    }
    // Checks which price options are checked
    for (var i = 0; i < pricesList.length; i++) {
      const checkbox = document.getElementById(pricesList[i]) as HTMLInputElement;
      if (checkbox.checked) {
        prices.push(pricesList[i]);
      }
    }
    // Sends the data to the filter in the server, to receive the new activities
    var search = document.getElementById("searchBarId") as HTMLInputElement;
    var address = "categories=" + categoriesChecked.join(",") + "&";
    address += "range_prices=" + prices.join(",") + "&";
    address += "search=" + search.value;
    var apiName = "https://bogoparchebackend-production-5a1a.up.railway.app/api/filter/noauth?";
    if(loggedInUser()){
      // Check if favorite and attendance options are checked
      var favoriteOption = "false";
      var assistOption = "false";
      const checkbox = document.getElementById("Favourites") as HTMLInputElement;
      const checkbox2 = document.getElementById("EventsToAssist") as HTMLInputElement;
      if (checkbox.checked) {
        favoriteOption = "true";
      }
      if (checkbox2.checked) {
        assistOption = "true";
      }
      address += "&favorite=" + favoriteOption + "&attendance=" + assistOption;
      apiName = "https://bogoparchebackend-production-5a1a.up.railway.app/api/filter/auth?";
    }
    fetch(apiName + address, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken()
      },
    })
    .then((res) => res.json())
    .then((dato) => {
      setActivities(dato);
    });
  }

  // Renders the cards showing the activities' information
  function CatalogueCards() {
    if (activities.length == 0) {
      return (
        <p className="noActivitiesText">No hay actividades para mostrar</p>
      );
    } else {
      return (
        <>
          {activities.map((activity: Activity) => (
            <ActivitySmallCard activity={activity} />
          ))}
        </>
      );
    }
  }

  // Set function for updating filter in real-time
  function updateFilter(id: string){
    toggleCatalogueCheckbox(id)
    setTimeout(sendFilter, 500)
  }
  
  return (
    <div className="catalogueContainer">
      <div className="searchContainer">
        <img src={searchIcon} className="searchImage"></img>
        <input
          id="searchBarId"
          placeholder="Ingresa términos de búsqueda"
          className="searchField"
          autoComplete="off"
          onChange={sendFilter}
        ></input>
      </div>
      {loggedInUser() ? (
        <div className="favsWillAssistBarContainer">
          <div
            className="catalogueSpecialFilterOption"
            id="Favouritescheckbox"
          >
            <input
              type="checkbox"
              className="categoryCheckbox2"
              id="Favourites"
              onChange={() => updateFilter("Favourites")}
            ></input>
            <label htmlFor="Favourites">Favoritos</label>
          </div>
          <div
            className="catalogueSpecialFilterOption"
            id="EventsToAssistcheckbox"
          >
            <input
              type="checkbox"
              className="categoryCheckbox2"
              id="EventsToAssist"
              onClick={() => updateFilter("EventsToAssist")}
            ></input>
            <label htmlFor="EventsToAssist">Eventos a asistir</label>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="catalogueContainer2">
        <div className="filterContainer">
          <p className="filterTitle filterTitle2">Categorías</p>
          {Object.keys(categories).map((categoryId: string) => (
            <div className="filterItem" onClick={() => updateFilter(categoryId)} id={categoryId + "checkbox"}>
              <input type="checkbox" className="categoryCheckbox" id={categoryId}/>
              <label htmlFor={categoryId}>{categories[categoryId]}</label>
            </div>
          ))}
          <p className="filterTitle">Precios</p>
          {pricesList.map((price: string) => (
            <div className="filterItem" onClick={() => updateFilter(price)} id={price + "checkbox"}>
              <input type="checkbox" className="categoryCheckbox" id={price}/>
              <label htmlFor={price}>{price}</label>
            </div>
          ))}
        </div>
        <div className="catalogueCardsContainer">
          <CatalogueCards />
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
