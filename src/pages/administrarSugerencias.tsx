import { showSuggestionCard } from "../assets/datos"
import { useState, useEffect } from "react";
import { Activity } from "../assets/datos";
import icon from "../assets/icons/suggestAdminIcon.png";
import ActivityRequestCard from "../components/ActivityRequestCard";
import InformationSuggestion from "../components/InformationSuggestion"

function AdministrarSugerencias() {

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  const [activities, setActivities] = useState([] as Activity[]);

  function SuggestCards() {
    if (activities.length == 0) {
      return(
        <p className="noActivitiesText heightModified">No hay actividades para aceptar</p>
      );
    } else {
      return (
        <>
          {activities.map((activity: Activity) => (
            <ActivityRequestCard activity={activity} />
          ))}
        </>
      );
    }
  }

  return (
    <>
    <InformationSuggestion/>
    <div className="adminActivitiesCard paddingModified">
      <div className="adminActivitiesContainer2">
        <div className="pageTitle">
          <img src={icon} className="pageTitleIcon" />
          <div className="pageTitleText">Administrador de sugerencias</div>
        </div>
        <div className={activities.length != 0 ? "activitySuggestText" : "notShow"}>
          <div className="suggestName"><b>Nombre actividad</b></div>
          <div className="suggestUser"><b>Propuesta por</b></div>
          <div className="suggestActions"><b>Acciones</b></div>
        </div>
        <div className = "suggestsCardsContainer">
          <SuggestCards />
        </div>
      </div>
    </div>
    </> 
  )
}

export default AdministrarSugerencias