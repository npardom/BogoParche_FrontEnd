import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Activity } from "../../../assets/interfaces";
import { pricesList,accessToken ,updateRefreshToken, categoryNames} from "../../../assets/functionsAndConstants";
import { editIcon, removeIcon, updateIcon, goBackIcon } from "../imports";

function EditActivity() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const [categories, setCategories] = useState({} as any);
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
  const navigate = useNavigate();
  
  // Getting all the modified information from the input fields
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
    if (event.target.checked === true) {
      setAgeRestriction(true);
    } else {
      setAgeRestriction(false);
    }
  };

  // Gets all the categories
  useEffect(() => {
    setCategories(categoryNames());
  }, []);

  // Gets the activity from the URL
  useEffect(() => {
    var id = slug as any;
    fetch("/api/activity/"+id , {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
      } 
    })
    .then((res) => res.json())
    .then((dato) => {
      if(dato.error){
        navigate("/");
      }else{
        setActivity(dato);
      }
    });
  }, []);

  // Updating the fields when the page is loaded
  useEffect(() => {
    setTitle(activity.titulo_actividad);
    if (JSON.stringify(categories) != "{}" && activity.titulo_actividad) {
      setCategory(activity.id_categoria);
    }
    setLocation(activity.ubicacion);
    setSchedule(activity.horario_plan);
    setPrice(activity.rango_precio);
    setDescription(activity.descripcion);
    setAgeRestriction(activity.restriccion_edad);
    setContact(activity.medio_contacto);
    setIsPrivate(activity.es_privada);
    if (activity.fecha_inicio) {
      setStartDate(activity.fecha_inicio.slice(0, 10));
      setEndDate(activity.fecha_fin.slice(0, 10));
      setStartHour(activity.hora_inicio.slice(0, 5));
      setEndHour(activity.hora_fin.slice(0, 5));
    }
    setIsPlan(activity.es_plan);
  }, [activity, categories]);

  // It sends a request to update the activity
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var id = activity.id.toString();
    if (isPlan){
      var APIname = "/api/plan/" + id;
    } else {
      var APIname = "/api/event/" + id;
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
      horario_plan: schedule,
    };
    fetch(APIname, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken(),
      },
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.id){
        alert(activity.es_privada ? "El parche fue editado exitosamente.":"La actividad fue editada exitosamente.");
        goBackToActivity(activity.id.toString())
      }else if (result.error === "You don't have access to this activity"){
        alert("No tienes permisos para modificar esta actividad.")
      }else if (result.error === "Invalid jwt token"){
        updateRefreshToken();
      }
    });
  };

  // It sends a request to delete the activity
  function deleteActivity() {
    var id = activity.id.toString();
    var opcion = confirm(activity.es_privada ? "¿Desea eliminar este parche?":"¿Desea eliminar esta actividad?");
    if (opcion == false) {return};
    fetch("/api/activity/" + id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken(),
      },
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.titulo_actividad){
        if(activity.es_privada){
          navigate("/parches");
        }else{
          navigate("/");
        }
      }else if (result.error === "You don't have access to this activity"){
        alert("No tienes permisos para eliminar esta actividad.")
      }else if (result.error === "Invalid jwt token"){
        updateRefreshToken();
      }
    });
  }

  // It navigates back to the main page of the activity
  function goBackToActivity(id: string) {
    navigate("/actividades/" + id);
  }
  
  return (
    <div className={activity.es_privada ? "adminActivitiesCard createParcheCard":"adminActivitiesCard"}>
      <div className="adminActivitiesContainer">
        <div className="twoButtonsContainer editTitleContainer">
          <button
            onClick={()=>goBackToActivity(activity.id.toString())}
            className="genericButton volver volver2"
          >
            <img src={goBackIcon} className="activityFormButtonIcon" />
            Volver
          </button>
          <div className="pageTitle editActivityTitle">
          <img src={editIcon} className="pageTitleIcon" />
          <div className="pageTitleText">Editar {activity.es_privada ?"Parche":"Actividad"}</div>
          </div>
        </div>
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="column">
            <p className="activityInputText disabledText">Nombre {activity.es_privada ?"Parche":"Actividad"}</p>
            <p className="activityIsPlanPlainText">
              {title}
            </p>
            <p className="activityInputText">Ubicación*</p>
            <input
              onChange={getLocation}
              className="activityInputField"
              required
              value={location}
            ></input>
            <p className="activityInputText">Descripción*</p>
            <textarea
              onChange={getDescription}
              maxLength={200}
              className="activityInputField descriptionInputField"
              required
              value={description}
            ></textarea>
          </div>
          <div className="column">
            <p className="activityInputText disabledText activityTypeText">Tipo {activity.es_privada ?"Parche":"Actividad"}</p>
            <p className="activityIsPlanPlainText">
              {isPlan ? "Plan" : "Evento"}
            </p>
            {isPlan ? (
              <>
                <p className="activityInputText">Horario*</p>
                <textarea
                  className="activityInputField horarioInputField"
                  required
                  maxLength={100}
                  onChange={getSchedule}
                  value={schedule}
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
                    value={startDate}
                  ></input>
                  <input
                    className="activityInputField dateField"
                    type="date"
                    onChange={getEndDate}
                    required
                    value={endDate}
                  ></input>
                </div>
                <p className="activityInputText">Hora Inicio - Hora Fin*</p>
                <div className="dateInputContainer">
                  <input
                    type="time"
                    className="activityInputField dateField"
                    required
                    onChange={getStartHour}
                    value={startHour}
                  ></input>
                  <input
                    type="time"
                    className="activityInputField dateField"
                    required
                    onChange={getEndHour}
                    value={endHour}
                  ></input>
                </div>
              </>
            )}
            <p className="activityInputText">Categoria*</p>
            <select
              onChange={getCategory}
              className="activityInputField"
              required
            >
              {JSON.stringify(categories) != "{}" &&
              activity.titulo_actividad ? (
                <>
                  {Object.keys(categories).map((categoryId: string) => (
                    <option
                      value={categoryId}
                      selected={activity.id_categoria.toString() === categoryId}
                    >
                      {categories[categoryId]}
                    </option>
                  ))}
                </>
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="column">
            <p className="activityInputText">Contacto para información*</p>
            <input
              onChange={getContact}
              className="activityInputField"
              required
              value={contact}
            ></input>
            <p className="activityInputText">Precios*</p>
            <select onChange={getPrice} className="activityInputField" required>
              {pricesList.map((price: string) => (
                <option
                  value={price}
                  selected={activity.rango_precio === price}
                >
                  {price}
                </option>
              ))}
            </select>
            <div className="ageLimitContainer">
              <p className="activityInputText endingField">Mayoria de edad</p>
              <input
                onChange={getAgeRestriction}
                className="activityCheckbox"
                type="checkbox"
                checked={ageRestriction}
              ></input>
            </div>
            <p className="textStyle1">(*) Campo Obligatorio</p>
            <div className="twoButtonsContainer">
              <button className="genericButton updateButton updateButton2">
                <img src={updateIcon} className="activityFormButtonIcon" />
                Actualizar
              </button>
              <button type="button" className="genericButton deleteButton deleteButton2" onClick= {deleteActivity}>
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

export default EditActivity;