import { closeIcon } from "../imports";
import ActivityCharacteristics from "../../../components/ActivityCharacteristics";
import { Activity } from "../../../assets/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Card that shows the information of a suggested activity
function InfoSuggestion() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const navigate = useNavigate();

  // Getting the desired activity from the URL
  useEffect(() => {
    var s = slug as any;
    if(s.slice(0,4) == "plan"){
      var isPlan = "true";
      var id = s.slice(4);
    }else{
      var isPlan = "false";
      var id = s.slice(6);
    }
    fetch("/api/get-activity/"+id+"/"+isPlan , {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
      } 
    })
    .then((res) => res.json())
    .then((dato) => {
      setActivity(dato)
    })
    .catch(() => {
      navigate("/");
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