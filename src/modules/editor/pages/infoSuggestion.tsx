import { closeIcon, ActivityCharacteristics } from "../imports";
import { Activity } from "../../../assets/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Card that shows the information of a suggested activity
function InfoSuggestion() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const navigate = useNavigate();

  // Gets the activity from the URL
  useEffect(() => {
    var id = slug as any;
    fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/activity/"+id , {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
      } 
    })
    .then((res) => res.json())
    .then((dato) => {
      if(dato.error){
        navigate("/");
      }else{
        setActivity(dato);
      }
    });
  }, []);

  return (
    <>
    <div className ="suggestionPopUpBackground" onClick={()=>navigate("/administrarSugerencias")}>
    </div>
    <div className="informationPopUpCard">
      <img src={closeIcon} alt="Cerrar" className="closeButton" onClick={()=>navigate("/administrarSugerencias")} />
      <div className="informationPopUpContainer">
        <h3 className = "suggestionPopUpSubtitle">{activity.es_plan? "Plan " :"Evento "}Sugerido</h3>
        <h2 className = "suggestionPopUpTitle">{activity.titulo_actividad}</h2>
        <div className="informationGrid">
        <ActivityCharacteristics activity = {activity}/>
        </div>
        <div className="featureBox featureBox2">
          <div>
            <div className="featureTitleText">Acerca de la Actividad</div>
            <div className="featureText">{activity.descripcion}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default InfoSuggestion;
