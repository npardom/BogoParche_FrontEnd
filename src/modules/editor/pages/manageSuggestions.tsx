import { useState, useEffect } from "react";
import { Activity } from "../../../assets/interfaces";
import { suggestAdminIcon, ActivityRequestCard } from "../imports";

function ManageSuggestions() {
  const [activities, setActivities] = useState([] as Activity[]);

  // Receives all the private activities on the database
  useEffect(() => {
    fetch("/api/activity/all-not-approved")
    .then((res) => res.json())
    .then((dato) =>{setActivities(dato)});
  }, []);

  // Render each activity in the page
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
          <img src={suggestAdminIcon} className="pageTitleIcon" />
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

export default ManageSuggestions