import { Activity, showSuggestionCard} from "../assets/datos"
import denyIcon from "../assets/icons/denySuggestIcon.png";
import acceptIcon from "../assets/icons/acceptSuggestIcon.png";

function ActivityRequestCard({activity}: {activity:Activity}) {
  return (
    <div className="activitySuggest">
    <div className="suggestName" onClick={showSuggestionCard}>{activity.titulo_actividad}</div>
    <div className="suggestUser">usuario</div>
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