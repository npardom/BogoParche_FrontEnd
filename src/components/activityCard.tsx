import { Activity} from "../assets/datos"

function ActivityCard({activity}: {activity:Activity}) {
    var description = activity.descripcion;
    if (activity.descripcion.length > 100){
        description = description.slice(0,100)+ "..."
    }
  return <div className = "activityCard">
    <p className = "activityCardTitle">{activity.titulo_actividad}</p>
    <p className ="activityCardLocation"><b>Ubicación: </b>{activity.ubicacion}</p>
    <p>{description}</p>
    <p className ="activityCardContact"><b>Mayor Información: </b>{activity.medio_contacto}</p>
  </div>
}

export default ActivityCard