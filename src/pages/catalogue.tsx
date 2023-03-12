import {useState, useEffect} from "react";
import {actividades, Activity} from "../assets/datos"
import ActivityCard from "../components/activityCard";

function Catalogue() {
  const [activities, setActivities] = useState([] as Activity[]);

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((dato) => setActivities(dato));
  }, []);

  return (
    <div className ="catalogueContainer">
    <div className = "catalogueCardsContainer">
      {activities.map((activity: Activity)=> (
        <ActivityCard activity = {activity}/>
      ))}
    </div>
    </div>
  )
}

export default Catalogue