import { Activity} from "../../../assets/interfaces"
import { accessToken, updateRefreshToken } from "../../../assets/functionsAndConstants";
import { useNavigate } from "react-router-dom";
import { denyIcon, acceptIcon } from "../imports";

function ActivityRequestCard({activity}: {activity:Activity}) {
  const navigate = useNavigate();

  // It sends a request to delete the activity
  function deleteActivity() {
    var id = activity.id.toString();
    var opcion = confirm("¿Desea eliminar la actividad?");
    if (opcion == false) {return};
    fetch("/api/activity/" + id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken(),
      },
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.titulo_actividad){
        window.location.reload();
      }else if (result.error === "Invalid jwt token"){
        updateRefreshToken();
      }
    });
  }

  // It sends a request to delete the activity
  function approveActivity() {
    var id = activity.id.toString();
    var opcion = confirm("¿Desea aprobar la actividad?");
    if (opcion == false) {return};
    fetch("/api/activity/approve/" + id, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken(),
      },
    })
    .then((response) => response.json())
    .then((result) => {
      alert(JSON.stringify(result))
      if (result.msg === "Approve succesfully"){
        window.location.reload();
      }else if (result.error === "Invalid jwt token"){
        updateRefreshToken();
      }
    });
  }

  return (
    <div className="activitySuggest">
    <div className="suggestName actualActivity" onClick={()=>{navigate("/sugerencia/"+ activity.id.toString())}}>
      {activity.titulo_actividad}
    </div>
    <div className="suggestActions"> 
        <button className="genericButton updateButton" onClick={approveActivity}>
            <img src={acceptIcon} className="activityFormButtonIcon" />
            <p className ="toggledText">Aceptar</p>
        </button>
        <button className="genericButton deleteButton" onClick={deleteActivity}>
            <img src={denyIcon} className="activityFormButtonIcon" />
            <p className ="toggledText">Eliminar</p>
        </button>
    </div>
    </div>
  )
}

export default ActivityRequestCard