import icon from "../assets/icons/editIcon.png";
import addIcon from "../assets/icons/addIcon.png";
import removeIcon from "../assets/icons/removeIcon.png";
import {useState, useEffect} from "react";

function AdministrarActividades() {
  const pricesList = ["Gratis",
    "1k - 10k",
    "10k - 50k",
    "50k - 100k",
    "100k - 150k",
    "+150k"
  ]

  const categoriesList = [ "Actividad Física",
    "Ambiental",
    "Bares y Discotecas",
    "Cultural",
    "Entretenimiento",
    "Gastronomía",
    "Turismo",
    "Otros"
  ]
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoriesList[0]);
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [price, setPrice] = useState(pricesList[0]);
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

  const getContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
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

  const getSchedule = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchedule(event.target.value);
  };

  const getAgeRestriction = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked === true) {
      setAgeRestriction(true);
    }else{
      setAgeRestriction(false);
    }
  };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      es_plan :isPlan,
      horario_plan: schedule
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
        if (result.id){
          alert("La actividad fue creada exitosamente.");
          window.location.reload();
        } else {
          alert("Ocurrió un error. Intenta de nuevo.");
        }
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
      <>
          <p className={isPlan?"activityInputText":"notShow"}>Horario*</p>
            <input className = {isPlan ? "activityInputField":"notShow"} required = {isPlan?true:false}
            onChange={getSchedule}></input>
          <p className={isPlan?"notShow":"activityInputText"}>Fecha Inicio - Fecha Fin*</p>
          <div className={isPlan?"notShow":"dateInputContainer"}>
          <input className="activityInputField dateField" 
            type ="date" onChange={getStartDate}
            required = {!isPlan?true:false}></input>
          <input className="activityInputField dateField" 
            type ="date" onChange={getEndDate}
            required = {!isPlan?true:false}></input>
            </div>
            <p className={isPlan?"notShow":"activityInputText"}>Hora Inicio - Hora Fin*</p>
            <div className={isPlan?"notShow":"dateInputContainer"}>
            <input
              type ="time"
              className="activityInputField dateField"
              required = {!isPlan?true:false}
              onChange={getStartHour}
            ></input>
            <input
              type ="time"
              className="activityInputField dateField"
              required = {!isPlan?true:false}
              onChange={getEndHour}
            ></input>
            </div>
        </>
            <p className="activityInputText">Categoria*</p>
            <select onChange={getCategory} className="activityInputField" required >
              {categoriesList.map((category: string)=> (
                <option value={category}>{category}</option>
              ))}
            </select >
          </div>
          <div className="column">
            <p className="activityInputText">Contacto para información*</p>
            <input onChange={getContact} className="activityInputField" required></input>
            <p className="activityInputText">Precios*</p>
            <select onChange={getPrice} className="activityInputField" required >
              {pricesList.map((price: string)=> (
                <option value={price}>{price}</option>
              ))}
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
