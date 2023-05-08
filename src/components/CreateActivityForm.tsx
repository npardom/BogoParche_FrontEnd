import {useState, useEffect} from "react";
import { pricesList } from "../assets/functionsAndConstants";

function CreateActivityForm({icon, text, classCustom}:{icon:string, text:string,classCustom: string}) {
  // Get access token
  const accessToken = localStorage.getItem("access");
  // Get refresh token
  const refreshToken = localStorage.getItem("refresh");

  // Get all categories
  useEffect(()=>{
    fetch("/api/category/get-categories", {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
      } 
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.data){
        setCategories(result.data);
      }
    });
  }, [])

  function updateRefreshToken(){
    fetch("/api/refresh", {
      method: "POST",
      mode: "cors",
      body: refreshToken,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken,
      },
    })
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
    });
  }

  // Sends the information received to the server
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPlan){
      var APIname = "/api/plan"
    } else {
      var APIname = "/api/event"
    }
    if (classCustom== "sendButton"){
      var type = "sugerencia"
    } else {
      var type = "actividad"
    }
    const body = {
      titulo_actividad: title,
      ubicacion: location,
      id_categoria: category,
      rango_precio: price,
      descripcion: description,
      restriccion_edad: ageRestriction,
      medio_contacto: contact,
      es_privada: isPrivate,
      fecha_inicio: startDate,
      fecha_fin: endDate,
      hora_inicio: startHour,
      hora_fin: endHour,
      es_plan :isPlan,
      horario_plan: schedule,
    }
    fetch(APIname, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken,
      },
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.id){
        alert("La " + type + " fue creada exitosamente.");
        window.location.reload();
      } else {
        alert("Ocurrió un error. Intenta de nuevo.");
      }
    })
    .catch(error => {
      if (error.message === '401') {
        updateRefreshToken();
      }
    });  
  };
    
  const [categories, setCategories] = useState([] as any);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(0);
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

  // Updates all fields when they change
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
    setCategory(parseInt(event.target.value));
  };
  const getTypeFromPlan = (event: any) => {
    if (event.target.checked){setIsPlan(true)}
  };
  const getTypeFromEvent = (event: any) => {
    if (event.target.checked){setIsPlan(false);}
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
  const getSchedule = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchedule(event.target.value);
  };
  const getAgeRestriction = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked === true) {
      setAgeRestriction(true);
    }else{
      setAgeRestriction(false);
    }
  };

  return (
  <form className = "formContainer" onSubmit={handleSubmit}>
        <div className="column">
          <p className="activityInputText">Nombre Actividad*</p>
          <input onChange={getTitle}
          className="activityInputField" required></input>
          <p className="activityInputText">Ubicación*</p>
          <input onChange={getLocation}
            className="activityInputField"
            required
          ></input>
          <p className="activityInputText">Descripción Actividad*</p>
          <textarea onChange={getDescription}
            maxLength={200}
            className="activityInputField descriptionInputField"
            required
          ></textarea>
        </div>
        <div className="column">
        <p className="activityInputText activityTypeText">Tipo Actividad</p>
          <div className ="activityTypeContainer">
            <input onClick={getTypeFromEvent} type="radio" className="activityCheckbox2" name="type" defaultChecked />
            <label htmlFor="html">Evento</label><br/>
            <input onClick={getTypeFromPlan} type="radio" className="activityCheckbox3"name="type"/>
            <label htmlFor="html">Plan</label><br/>
          </div>
          {isPlan ? (
            <>
              <p className="activityInputText">Horario*</p>
              <textarea
                className="activityInputField horarioInputField"
                required
                maxLength={100}
                onChange={getSchedule}
              ></textarea>
            </>
          ) : (
            <>
              <p className="activityInputText">Fecha Inicio - Fecha Fin*</p>
              <div className="dateInputContainer">
                <input
                  className="activityInputField dateField"
                  type="date"
                  onChange={getStartDate}
                  required
                ></input>
                <input
                  className="activityInputField dateField"
                  type="date"
                  onChange={getEndDate}
                  required
                ></input>
              </div>
              <p className="activityInputText">Hora Inicio - Hora Fin*</p>
              <div className="dateInputContainer">
                <input
                  type="time"
                  className="activityInputField dateField"
                  required
                  onChange={getStartHour}
                ></input>
                <input
                  type="time"
                  className="activityInputField dateField"
                  required
                  onChange={getEndHour}
                ></input>
              </div>
            </>
          )}
          <p className="activityInputText">Categoria*</p>
          <select onChange={getCategory} className="activityInputField" required>
          <option selected disabled hidden></option>
            {Object.keys(categories).map((categoryId: string) => (
              <option value={categoryId}>{categories[categoryId]}</option>
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
          <button className={"genericButton " + classCustom}>
            <img src={icon} className="activityFormButtonIcon" />
            {text}
          </button>
        </div>
      </form>
    )
}

export default CreateActivityForm