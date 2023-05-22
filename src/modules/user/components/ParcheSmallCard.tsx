import { Activity } from "../../../assets/interfaces"
import { useEffect, useState } from "react";
import { categoryNames } from "../../../assets/functionsAndConstants";
import { useNavigate } from "react-router-dom";

function ParcheSmallCard({activity}: {activity:Activity}) {
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
  <div onClick = {()=>goToActivity(activity.id.toString())} className = "parcheCard" id = {activity.id.toString()}>
    <div>
    <p className = "titleParcheSmallCard">{activity.titulo_actividad}</p>
    <hr className="middleLine2"></hr>
    <p className ="descriptionParcheSmallCard"><b>Haz click</b> para abrir el parche</p>
    </div>
  </div>
  )
}

export default ParcheSmallCard