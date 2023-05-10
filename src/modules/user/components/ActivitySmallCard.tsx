import { Activity } from "../../../assets/interfaces"
import { useEffect, useState } from "react";
import { categoryNames } from "../../../assets/functionsAndConstants";
import { useNavigate } from "react-router-dom";

function ActivitySmallCard({activity}: {activity:Activity}) {
  const [categories, setCategories] = useState([] as any);
  const navigate = useNavigate();

  // Gets all the categories
  useEffect(() => {
    setCategories(categoryNames());
  }, []);

  // It navigates to the main page of the activity
  function goToActivity(id: string) {
    navigate("/actividades/" + id);
  }
 
  return(
  <div onClick = {()=>goToActivity(activity.id.toString())} className = "activityCard" id = {activity.id.toString()}>
    <p className ="activityCardCategory"><b>{categories[activity.id_categoria.toString()]}</b></p>
    <p className = "activityCardTitle">{activity.titulo_actividad}</p>
    <p className ="activityCardLocation"><b>Ubicación: </b>{activity.ubicacion}</p>
    <p className ="activityCardDescription">{activity.descripcion}</p>
    <p className ="activityCardContact"><b>Mayor Información: </b>{activity.medio_contacto}</p>
  </div>
  )
}

export default ActivitySmallCard