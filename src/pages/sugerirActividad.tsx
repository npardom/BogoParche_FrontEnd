import icon from "../assets/icons/suggestIcon.png";
import sendIcon from "../assets/icons/sendIcon.png";
import CreateActivityForm from "../components/CreateActivityForm";

function SugerirActividad() {
  return (
    <div className="adminActivitiesCard">
      <div className="adminActivitiesContainer">
        <div className="pageTitle">
          <img src={icon} className="pageTitleIcon" />
          <div className="pageTitleText">Sugerir una Actividad</div>
        </div>
        <CreateActivityForm icon = {sendIcon} text = "Enviar" classCustom ="sendButton" />
      </div>
    </div>
  );
}

export default SugerirActividad