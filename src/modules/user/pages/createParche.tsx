import { useNavigate } from "react-router-dom";
import { createParcheIcon2, addParche, CreateActivityForm, goBackIcon } from "../imports";

function CreateParche () {
  const navigate = useNavigate();
  
  // It navigates back to the parches page
  function goBackToParches() {
    navigate("/parches");
  }

  return (
    <div className="adminActivitiesCard createParcheCard">
      <div className="adminActivitiesContainer">

      <div className="twoButtonsContainer editTitleContainer">
        <button
          onClick={goBackToParches}
          className="genericButton volver volver2"
        >
          <img src={goBackIcon} className="activityFormButtonIcon" />
            Volver
        </button>
        <div className="pageTitle editActivityTitle">
          <img src={createParcheIcon2} className="pageTitleIcon" />
          <div className="pageTitleText">Crear Parche</div>
        </div>
      </div>


        <CreateActivityForm icon={addParche} text={"Añadir Parche"} classCustom={"createParcheButton"} parcheCreation ={true}/>
      </div>
    </div>
  );
}

export default CreateParche;
