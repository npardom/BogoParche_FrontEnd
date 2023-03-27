import { Activity} from "../assets/datos"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ActivityCard({activity}: {activity:Activity}) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([] as any);

  useEffect(()=>{
    fetch("/api/get-categories", {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
    } 
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.data){
        setCategories(result.data);
      }
    });
  }, [])
 
  return(
  <div onClick = {() => {
    var typeOfAct = activity.es_plan ? "plan": "evento";
    navigate("/actividades/"+ typeOfAct + activity.id_actividad.toString())
  }} className = "activityCard" 
  id = {activity.id_actividad.toString()}>
    <p className ="activityCardCategory"><b>{categories[activity.id_categoria.toString()]}</b></p>
    <p className = "activityCardTitle">{activity.titulo_actividad}</p>
    <p className ="activityCardLocation"><b>Ubicación: </b>{activity.ubicacion}</p>
    <p className ="activityCardDescription">{activity.descripcion}</p>
    <p className ="activityCardContact"><b>Mayor Información: </b>{activity.medio_contacto}</p>
  </div>
  )
}

export default ActivityCard