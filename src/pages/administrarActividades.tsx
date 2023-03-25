import icon from "../assets/icons/editIcon.png";
import addIcon from "../assets/icons/addIcon.png";
import removeIcon from "../assets/icons/removeIcon.png";
import {useState, useEffect} from "react";

function AdministrarActividades() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ageRestriction, setAgeRestriction] = useState(false);
  const [contact, setContact] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [isPlan, setIsPlan] = useState(false);
      
  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const getLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const getPrice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(event.target.value);
  };

  const getDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const getCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const getTypeFromPlan = (event: any) => {
    if (event.target.checked){
      setIsPlan(true);
    }
  };

  const getTypeFromEvent = (event: any) => {
    if (event.target.checked){
      setIsPlan(false);
    }
  };

  const getStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const getEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const getStartHour = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartHour(event.target.value);
  };

  const getEndHour = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndHour(event.target.value);
  };

  const getContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };

  const getAgeRestriction = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked === true) {
      setAgeRestriction(true);
    }else{
      setAgeRestriction(false);
    }
  };

  function Date(){
    if(isPlan){
      return (
        <>
          <p className="activityInputText">Horario*</p>
            <input className="activityInputField" required></input>
            <p className="notShow">Fecha*</p>
        </>
      )
    }else{
      return (
        <>
          <p className="activityInputText">Fecha Inicio - Fecha Fin*</p>
          <div className ="dateInputContainer">
          <input className="activityInputField dateField" required
            type ="date" id = "fechaInicio"></input>
          <input className="activityInputField dateField" required
            type ="date" id = "fechaFin"></input>
            </div>
            <p className="activityInputText">Hora Inicio - Hora Fin*</p>
            <div className ="dateInputContainer">
            <input
              type ="time"
              className="activityInputField dateField"
              required
              id = "horaInicio"
            ></input>
            <input
              type ="time"
              className="activityInputField dateField"
              required
              id = "horaFin"
            ></input>
            </div>
        </>
      )
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStartHour((document.getElementById("horaInicio") as HTMLInputElement).value);
    setEndHour((document.getElementById("horaFin") as HTMLInputElement).value);
    setStartDate((document.getElementById("fechaInicio") as HTMLInputElement).value);
    setEndDate((document.getElementById("fechaFin") as HTMLInputElement).value);

    const body = {
      titulo_actividad: title,
      ubicacion: location,
      categoria: category,
      rango_precio: price,
      description: description,
      restriccion_edad: ageRestriction,
      medio_contacto: contact,
      es_privada: isPrivate,
      fecha_inicio: startDate,
      fecha_fin: endDate,
      hora_inicio: startHour,
      hora_fin: endHour,
      es_plan :isPlan
    }
    fetch("/api/create-activity", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
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
            <input onChange={getTitle}
            value={title} className="activityInputField" required></input>
            <p className="activityInputText">Ubicación*</p>
            <input onChange={getLocation}
              className="activityInputField"
              required
            ></input>
            <p className="activityInputText">Descripción Actividad*</p>
            <textarea onChange={getDescription}
              maxLength={160}
              className="activityInputField descriptionInputField"
              required
            ></textarea>
          </div>
          <div className="column">
          <p className="activityInputText">Tipo</p>
            <div className ="activityTypeContainer">
              <input onClick={getTypeFromEvent} type="radio" className="activityCheckbox2" name="type" defaultChecked />
              <label htmlFor="html">Evento</label><br/>
              <input onClick={getTypeFromPlan} type="radio" className="activityCheckbox3"name="type"/>
              <label htmlFor="html">Plan</label><br/>
            </div>
            <Date/>
            <p className="activityInputText">Categoria*</p>
            <select onChange={getCategory} className="activityInputField" required >
            <option value="Cultural">Cultural</option>
              <option value="Ambiental">Ambiental</option>
              <option value="Turismo">Turismo</option>
              <option value="Actividad Física">Actividad Física</option>
              <option value="Bares y Discotecas">Bares y Discotecas</option>
              <option value="Gastronomía">Gastronomía</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Otros">Otros</option>
            </select >
          </div>
          <div className="column">
            <p className="activityInputText">Contacto para información*</p>
            <input onChange={getContact} className="activityInputField" required></input>
            <p className="activityInputText">Precios*</p>
            <select onChange={getPrice} className="activityInputField" required >
              <option value="Gratis">Gratis</option>
              <option value="1k - 10k">1k - 10k</option>
              <option value="10k - 50k">10k - 50k</option>
              <option value="50k - 100k">50k - 100k</option>
              <option value="100k - 150k">100k - 150k</option>
              <option value="+ 150k">+ 150k</option>
            </select >
            <div className ="ageLimitContainer">
              <p className="activityInputText endingField">Mayoria de edad</p>
              <input onChange={getAgeRestriction} className="activityCheckbox" type="checkbox"></input>
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
