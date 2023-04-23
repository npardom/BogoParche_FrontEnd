import icon from "../assets/icons/createIcon.png";
import addIcon from "../assets/icons/addIcon.png";
import CreateActivityForm from "../components/CreateActivityForm";

function AñadirActividad () {
  return (
    <div className="adminActivitiesCard">
      <div className="adminActivitiesContainer">
        <div className="pageTitle">
          <img src={icon} className="pageTitleIcon" />
          <div className="pageTitleText">Añadir Actividad</div>
        </div>
        <CreateActivityForm icon={addIcon} text={"Crear Actividad"} classCustom={"createButton"}/>
      </div>
    </div>
  );
}

export default AñadirActividad;
