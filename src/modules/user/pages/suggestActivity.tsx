import { suggestIcon,sendIcon2, CreateActivityForm } from "../imports";

function SuggestActivity() {
  return (
    <div className="adminActivitiesCard">
      <div className="adminActivitiesContainer">
        <div className="pageTitle">
          <img src={suggestIcon} className="pageTitleIcon" />
          <div className="pageTitleText">Sugerir una Actividad</div>
        </div>
        <CreateActivityForm icon = {sendIcon2} text = "Enviar" classCustom ="sendButton" />
      </div>
    </div>
  );
}

export default SuggestActivity