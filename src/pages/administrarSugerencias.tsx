import { useState, useEffect } from "react";
import { Activity } from "../assets/datos";
import icon from "../assets/icons/suggestAdminIcon.png";
import ActivityRequestCard from "../components/ActivityRequestCard";

function AdministrarSugerencias() {
  const [activities, setActivities] = useState([] as Activity[]);

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  function SuggestCards() {
    if (activities.length == 0) {
      return(
        <p className="noActivitiesText heightModified">No hay actividades a revisar.</p>
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
    <div className="adminActivitiesCard paddingModified">
      <div className="adminActivitiesContainer2">
        <div className="pageTitle">
          <img src={icon} className="pageTitleIcon" />
          <div className="pageTitleText">Administrador de sugerencias</div>
        </div>
        <div className={activities.length != 0 ? "activitySuggestText" : "notShow"}>
          <div className="suggestName2 tableTitle"><b>Nombre actividad</b></div>
          <div className="suggestActions2 tableTitle"><b>Acciones</b></div>
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