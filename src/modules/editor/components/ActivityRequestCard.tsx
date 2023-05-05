import { Activity} from "../../../assets/interfaces"
import { useNavigate } from "react-router-dom";
import { denyIcon, acceptIcon } from "../imports";

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
            <p className ="toggledText">Aceptar</p>
        </button>
        <button type="button" className="genericButton deleteButton">
            <img src={denyIcon} className="activityFormButtonIcon" />
            <p className ="toggledText">Eliminar</p>
        </button>
    </div>
    </div>
  )
}

export default ActivityRequestCard