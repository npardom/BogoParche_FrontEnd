import { useEffect, useState } from "react";
import { Activity } from "../../../assets/interfaces";
import { accessToken, updateRefreshToken } from "../../../assets/functionsAndConstants";
import {ParcheSmallCard, addIcon,createParcheIcon2} from "../imports";
import { useNavigate } from "react-router-dom";

function Parches() {
  const [parches, setParches] = useState([] as Activity[]);
  const navigate = useNavigate();
  
  // Receives all my parches on the database
  useEffect(() => {
    fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/activity/all-private", {
      headers: {
        "Authorization": "Bearer " + accessToken(),
      },
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.error === "Invalid jwt token"){
        alert("Ocurrió un error. Intenta de nuevo.");
        updateRefreshToken();
      }else{
        setParches(result)
      }
    });
  }, []);

  // Renders the cards showing the activities' information
  function CatalogueCards() {
    if (parches.length == 0) {
      return (
        <p className="noActivitiesText heightModified">Actualmente no tienes ningún parche.</p>
      );
    } else {
      return (
        <div className="parcheCardsContainer">
          {parches.map((activity: Activity) => (
            <ParcheSmallCard activity={activity} />
          ))}
        </div>
      );
    }
  }
  
  return (
    <div className="adminActivitiesCard adminParchesCard">
      <div className="parcheCardsContainer1">
      <div className="pageTitle">
          <img src={createParcheIcon2} className="pageTitleIcon" />
          <div className="pageTitleText">Mis Parches</div>
        </div>
        <button onClick = {()=>{navigate("/crearParche")}} className="genericButton createParcheButton2">
            <img src={addIcon} className="activityFormButtonIcon" />
            &nbsp;Crear nuevo parche
        </button>
        <CatalogueCards/>
      </div>
    </div>
  )
}

export default Parches