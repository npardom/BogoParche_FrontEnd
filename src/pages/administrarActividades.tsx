import icon from "../assets/icons/editIcon.png";
import addIcon from "../assets/icons/addIcon.png";
import removeIcon from "../assets/icons/removeIcon.png";

function AdministrarActividades() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify("holaEnvio"),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="adminActivitiesCard">
      <div className="adminActivitiesContainer">
        <div className="pageTitle">
          <img src={icon} className="pageTitleIcon" />
          <div className="pageTitleText">Administrador de Actividades</div>
        </div>
        <form className = "formContainer" onSubmit={handleSubmit}>
          <div className="column">
            <p className="activityInputText">Nombre Actividad*</p>
            <input className="activityInputField" required></input>
            <p className="activityInputText">Ubicación*</p>
            <input
              className="activityInputField"
              required
            ></input>
            <p className="activityInputText">Descripción Actividad*</p>
            <textarea
              maxLength={160}
              className="activityInputField descriptionInputField"
              required
            ></textarea>
          </div>
          <div className="column">
            <p className="activityInputText">Fecha*</p>
            <input className="activityInputField" required
            type ="date"></input>
            <p className="activityInputText">Hora*</p>
            <input
              type ="time"
              className="activityInputField"
              required
            ></input>
            <p className="activityInputText">Categoria*</p>
            <select  className="activityInputField" required >
              <option value="volvo">Hola</option>
              <option value="volvo">Hola</option>
            </select >
            <p className="activityInputText">Contacto para información*</p>
            <input className="activityInputField" required></input>
          </div>
          <div className="column">
            <p className="activityInputText">Precios*</p>
            <input className="activityInputField" required></input>
            <div className ="ageLimitContainer">
              <p className="activityInputText endingField">Mayoria de edad*</p>
              <input className="activityCheckbox" type="checkbox"></input>
            </div>
            <p className="textStyle1">(*) Campo Obligatorio</p>
           <div className = "twoButtonsContainer">
            <button className="createButton">
              <img src={addIcon} className="activityFormButtonIcon" />
              Crear/ Actualizar
            </button>
            <button className="deleteButton">
              <img src={removeIcon} className="activityFormButtonIcon" />
              Eliminar
            </button>
            </div> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdministrarActividades;
