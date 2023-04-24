import icon from "../assets/icons/editIcon.png";
import removeIcon from "../assets/icons/removeIcon.png";
import updateIcon from "../assets/icons/updateIcon.png";
import goBackIcon from "../assets/icons/goBackIcon.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Activity, pricesList } from "../assets/datos";

function EditarActividad() {
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

  useEffect(() => {
    fetch("/api/get-categories", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        setCategories(result.data);
      }
    });
  }, []);

  useEffect(() => {
    var s = slug as any;
    if (s.slice(0, 4) == "plan") {
      var isPlan = "true";
      var id = s.slice(4);
    } else {
      var isPlan = "false";
      var id = s.slice(6);
    }
    fetch("/api/get-activity/" + id + "/" + isPlan, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((dato) => {
      setActivity(dato);
    })
    .catch(() => {
      navigate("/");
    });
  }, []);

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
    setIsPrivate(false);
    if (activity.fecha_inicio) {
      setStartDate(activity.fecha_inicio.slice(0, 10));
      setEndDate(activity.fecha_fin.slice(0, 10));
      setStartHour(activity.hora_inicio.slice(0, 5));
      setEndHour(activity.hora_fin.slice(0, 5));
    }
    setIsPlan(activity.es_plan);
  }, [activity, categories]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      es_plan: isPlan,
      horario_plan: schedule,
      es_aprobado: true,
    };
    var id = activity.id.toString();
    var isPlan2 = activity.es_plan.toString();
    fetch("/api/edit-activity/"+id+"/"+isPlan2, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((result) => {
      alert("La actividad fue editada exitosamente.");
      var typeOfAct = activity.es_plan ? "plan" : "evento";
      navigate("/actividades/" + typeOfAct + activity.id.toString());
    });
  };

  function deleteActivity() {
    var id = activity.id.toString();
    var isPlan = activity.es_plan.toString();
    var opcion = confirm("¿Desea eliminar la actividad?");
    if (opcion == false) {
      return;
    }
    fetch("/api/delete-activity/" + id + "/" + isPlan, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then(() => {
      navigate("/");
    });
  }

  function goBack() {
    var typeOfAct = activity.es_plan ? "plan" : "evento";
    navigate("/actividades/" + typeOfAct + activity.id.toString());
  }
  
  return (
    <div className="adminActivitiesCard">
      <div className="adminActivitiesContainer">
        <div className="twoButtonsContainer">
          <button
            onClick={goBack}
            className="genericButton volver"
          >
            <img src={goBackIcon} className="activityFormButtonIcon" />
            Volver
          </button>
          <div className="pageTitle editActivityTitle">
          <img src={icon} className="pageTitleIcon" />
          <div className="pageTitleText">Editar Actividad</div>
          </div>
        </div>
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="column">
            <p className="activityInputText disabledText">Nombre Actividad</p>
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
            <p className="activityInputText">Descripción Actividad*</p>
            <textarea
              onChange={getDescription}
              maxLength={160}
              className="activityInputField descriptionInputField"
              required
              value={description}
            ></textarea>
          </div>
          <div className="column">
            <p className="activityInputText disabledText">Tipo Actividad</p>
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
              <button className="genericButton updateButton">
                <img src={updateIcon} className="activityFormButtonIcon" />
                Actualizar
              </button>
              <button type="button" className="genericButton deleteButton" onClick= {deleteActivity}>
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

export default EditarActividad;
