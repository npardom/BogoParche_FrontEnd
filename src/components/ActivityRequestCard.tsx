import { Activity} from "../assets/datos"
import denyIcon from "../assets/icons/denySuggestIcon.png";
import acceptIcon from "../assets/icons/acceptSuggestIcon.png";
import { useNavigate } from "react-router-dom";

function ActivityRequestCard({activity}: {activity:Activity}) {
  const navigate = useNavigate();

  return (
    <div className="activitySuggest">
    <div className="suggestName actualActivity" onClick={()=>{
      var typeOfAct = activity.es_plan ? "plan": "evento";
      navigate("/administrarSugerencia/"+ typeOfAct + activity.id.toString())
    }}>{activity.titulo_actividad}</div>
    <div className="suggestActions"> 
        <button className="genericButton updateButton">
            <img src={acceptIcon} className="activityFormButtonIcon" />
            Aceptar
        </button>
        <button type="button" className="genericButton deleteButton">
            <img src={denyIcon} className="activityFormButtonIcon" />
            Eliminar
        </button>
    </div>
    </div>
  )
}

export default ActivityRequestCard