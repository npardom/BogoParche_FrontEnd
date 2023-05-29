import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Activity } from "../../../assets/interfaces";
import { pricesList,accessToken ,updateRefreshToken, categoryNames, loggedInUser} from "../../../assets/functionsAndConstants";
import { editIcon, removeIcon, updateIcon, goBackIcon,closeIcon2 } from "../imports";

function EditActivity() {
  const { slug } = useParams();
  const [userList, setUserList] = useState([] as string[]);
  const [foundUserList, setFoundUserList] = useState([] as string[]);
  const [selectedUsers, setSelectedUsers] = useState([] as string[]);
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
  const [image, setImage] = useState(null as any);
  const navigate = useNavigate();

  const imageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const files:any = e.target.files;
    const file = files[0];
    resizeImage(file, 900, 900, function(resizedBase64:any) {
      setImage(resizedBase64);
    });
  }

  function resizeImage(file:any, maxWidth:number, maxHeight:number, callback:any) {
    var reader = new FileReader();
    reader.onload = function(event:any) {
      var image = new Image();
      image.onload = function() {
        var width = image.width;
        var height = image.height;
        if (width > maxWidth || height > maxHeight) {
          var ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d') as any;
        ctx.drawImage(image, 0, 0, width, height);
        var resizedBase64 = canvas.toDataURL('image/jpeg');
        callback(resizedBase64);
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  
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

  // If parche creation, it gets list of usernames
  useEffect(() => {
    fetch("/api/user/usernames", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((response) => response.json())
    .then((result) => {
      var res = result as string[]
      var newArray = res.filter(item => item !== loggedInUser());
      setUserList(newArray)
    });
  }, []);

  // If not parche, show image
  useEffect(()=>{
    if(!activity.es_privada && activity.titulo_actividad){
      var element= document.getElementById("imageContainerFormId") as any;element.style.backgroundImage = "url('" + image +"')";
    }
  },[image])

  // Gets the activity from the URL
  useEffect(() => {
    var id = slug as any;
    fetch("/api/activity/"+id , {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken()
      } 
    })
    .then((res) => res.json())
    .then((dato) => {
      if(dato.error === "Invalid jwt token"){
        alert("Ocurrió un error. Intenta de nuevo.");
        updateRefreshToken();
        navigate("/");
      }else if (dato.error){
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
    setImage(activity.image)
    if(activity.es_privada){
      setSelectedUsers(activity.users)
    }
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
      image: image,
      users:selectedUsers
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

  // Function for removing an image file
  function removeImage(){
    var element = document.getElementById('upload-photo') as any;
    element.value = "";
    setImage(null)
  }

  function findUsers(event: React.ChangeEvent<HTMLInputElement>){
    if(event.target.value ==""){
      setFoundUserList([]);
    }else{
      setFoundUserList(userList.filter(user => user.startsWith(event.target.value)).slice(0, 5));
    }
  }

  function addToSelected(user: string){
    if(selectedUsers.length >= 20 && !selectedUsers.includes(user)){
      alert("Puedes añadir máximo 20 personas.")
    }else{
      if(!selectedUsers.includes(user)){
        setSelectedUsers(selectedUsers.concat([user]))
      }
      var element = document.getElementById("userSearchFieldId") as any;
      element.value = "";
      setFoundUserList([]);
    }
    element.focus();
  }

  function removeFromSelected(user: string){
    if(selectedUsers.includes(user)){
      var newArray = selectedUsers.filter(item => item !== user);
      setSelectedUsers(newArray);
    }
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
            <p className="activityInputText">Contacto para información*</p>
            <input
              onChange={getContact}
              className="activityInputField"
              required
              value={contact}
            ></input>
          </div>
          <div className="column">
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

            {activity.es_privada && activity.titulo_actividad ? 
          <>
          <p className="activityInputText">Seleccionar usuarios</p>
          <div className="userSearchContainer">
            <input 
            className="userSearchField"
            onChange={findUsers}
            id="userSearchFieldId"
            >
            </input>
            <div className ="foundUsersContainer" id = "foundUsersContainerId">
            {foundUserList.map((user: string) => (
                <div className ="foundUserItem" onClick={()=>addToSelected(user)}>{user}</div>
            ))}
            </div>
          </div> 
          <div className ="selectedUsersContainer">
          {selectedUsers.map((user: string) => (
              <div className ="selectedUserContainer">
                {user != loggedInUser() ?
                <img src={closeIcon2} className="closeButton4" onClick={()=>removeFromSelected(user)} title="Quitar"/>:<></>}
                {user}
              </div>    
          ))}
          </div>
          </>
          :
          <></>
          }

            {activity.es_privada ? <></>:
          <>
           <div className="uploadContainer">
          <p className="activityInputText">Imagen</p>
          <label htmlFor="upload-photo" className ="uploadImageButton">Seleccionar</label>
            <input type="file" onChange={imageUpload} className ="notShow3" id="upload-photo" ></input>
          </div>
          </>
          }
          {activity.es_privada ? <></>: 
          <div className ={image == null ? "imageContainerForm notShow3":"imageContainerForm"} id="imageContainerFormId">
            <img src={closeIcon2} className="closeButton3" onClick={removeImage} title="Remover Imagen"/>
          </div>
          }
            <div className="twoButtonsContainer someExtraSpace">
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
