import { useState, useEffect } from "react";
import { Activity} from "../../../assets/interfaces";
import { pricesList, toggleCatalogueCheckbox } from "../../../assets/functionsAndConstants";
import ActivitySmallCard from "../components/ActivitySmallCard";
import { searchIcon } from "../imports";

function Catalogue() {
  const [activities, setActivities] = useState([] as Activity[]);
  const [categories, setCategories] = useState([] as any);
  const loggedInUser = localStorage.getItem("username");

  // Gets all the categories from the database
  useEffect(() => {
    fetch("/api/get-categories", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setCategories(result.data);
        }
      });
  }, []);

  // Receives all the public activities on the database
  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  function sendFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    fetch("/api/filter?" + address, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
  
  return (
    <div className="catalogueContainer">
      <form className="searchContainer" onSubmit={sendFilter}>
        <img src={searchIcon} className="searchImage"></img>
        <input
          id="searchBarId"
          placeholder="Ingresa términos de búsqueda"
          className="searchField"
        ></input>
      </form>
      {loggedInUser ? (
        <div className="favsWillAssistBarContainer">
          <div
            className="catalogueSpecialFilterOption"
            id="Favouritescheckbox"
          >
            <input
              type="checkbox"
              className="categoryCheckbox2"
              id="Favourites"
              onChange={() => toggleCatalogueCheckbox("Favourites")}
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
              onClick={() => toggleCatalogueCheckbox("EventsToAssist")}
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
            <div className="filterItem" onClick={() => toggleCatalogueCheckbox(categoryId)} id={categoryId + "checkbox"}>
              <input type="checkbox" className="categoryCheckbox" id={categoryId}/>
              <label htmlFor={categoryId}>{categories[categoryId]}</label>
            </div>
          ))}
          <p className="filterTitle">Precios</p>
          {pricesList.map((price: string) => (
            <div className="filterItem" onClick={() => toggleCatalogueCheckbox(price)} id={price + "checkbox"}>
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
