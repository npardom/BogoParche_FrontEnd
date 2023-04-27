import { Activity } from "../../../assets/interfaces"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ActivitySmallCard({activity}: {activity:Activity}) {
  const [categories, setCategories] = useState([] as any);
  const navigate = useNavigate();

  // Gets all categories
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
    navigate("/actividades/"+ typeOfAct + activity.id.toString())
  }} className = "activityCard" 
  id = {activity.id.toString()}>
    <p className ="activityCardCategory"><b>{categories[activity.id_categoria.toString()]}</b></p>
    <p className = "activityCardTitle">{activity.titulo_actividad}</p>
    <p className ="activityCardLocation"><b>Ubicación: </b>{activity.ubicacion}</p>
    <p className ="activityCardDescription">{activity.descripcion}</p>
    <p className ="activityCardContact"><b>Mayor Información: </b>{activity.medio_contacto}</p>
  </div>
  )
}

export default ActivitySmallCard