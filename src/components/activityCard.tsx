import { Activity} from "../assets/datos"
import { useNavigate } from "react-router-dom";

function ActivityCard({activity}: {activity:Activity}) {

  var description = activity.descripcion;
  if (activity.descripcion.length > 100){
     description = description.slice(0,100)+ "..."
  }

  const navigate = useNavigate();

  return(
  <div 
  onClick = {() => navigate("/activities/"+activity.id_actividad.toString())}
  className = "activityCard" 
  id = {activity.id_actividad.toString()}>
    <p className ="activityCardCategory"><b>{activity.id_categoria.toString()}</b></p>
    <p className = "activityCardTitle">{activity.titulo_actividad}</p>
    <p className ="activityCardLocation"><b>Ubicación: </b>{activity.ubicacion}</p>
    <p className ="activityCardDescription">{description}</p>
    <p className ="activityCardContact"><b>Mayor Información: </b>{activity.medio_contacto}</p>
  </div>
  )
}

export default ActivityCard