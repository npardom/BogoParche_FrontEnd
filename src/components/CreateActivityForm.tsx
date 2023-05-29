import { useState, useEffect } from "react";
import { pricesList, categoryNames, updateRefreshToken, accessToken, loggedInUser } from "../assets/functionsAndConstants";
import {closeIcon2} from "../imports"
import { useNavigate } from "react-router-dom";

function CreateActivityForm({icon, text, classCustom,parcheCreation}:{icon:string, text:string,classCustom: string,parcheCreation:boolean}) {
  const [userList, setUserList] = useState([] as string[]);
  const [foundUserList, setFoundUserList] = useState([] as string[]);
  const [selectedUsers, setSelectedUsers] = useState([loggedInUser()] as string[]);
  const [image, setImage] = useState(null as any);
  const [categories, setCategories] = useState([] as any);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(0);
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [price, setPrice] = useState(pricesList[0]);
  const [description, setDescription] = useState("");
  const [ageRestriction, setAgeRestriction] = useState(false);
  const [contact, setContact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [isPlan, setIsPlan] = useState(false);
  const navigate = useNavigate();

  // Gets all the categories
  useEffect(() => {
    setCategories(categoryNames());
  }, []);


  // If parche creation, it gets list of usernames
  useEffect(() => {
    if(parcheCreation){
      fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/user/usernames", {
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
    }
  }, []);

  // Sends the received information to the server
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPlan){
      var APIname = "https://bogoparchebackend-production-5a1a.up.railway.app/api/plan"
    } else {
      var APIname = "https://bogoparchebackend-production-5a1a.up.railway.app/api/event"
    }
    if (classCustom== "sendButton"){
      var type = "sugerencia"
    } else {
      var type = "actividad"
    }
    var isPrivate = false;
    if(parcheCreation){
      isPrivate = true;
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
      users: selectedUsers,
      image: image
    }
    fetch(APIname, {
      method: "POST",
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
        if(parcheCreation){
          alert("Parche creado exitosamente.");
          navigate("/parches");
        }else{
          alert("La " + type + " fue creada exitosamente.");
          navigate("/");
        }
      } else {
        alert("Ocurrió un error. Intenta de nuevo.");
        updateRefreshToken();
      }
    });  
  };

  const imageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const files:any = e.target.files;
    const file = files[0];
    resizeImage(file, 900, 900, function(resizedBase64:any) {
      setImage(resizedBase64);
      var element= document.getElementById("imageContainerFormId") as any;
      element.style.backgroundImage = "url('" + resizedBase64 +"')";
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

  window.addEventListener("click", function hideSearchBar(e: any){
    var element = e.target as any;
    var element2 = document.getElementById("foundUsersContainerId") as HTMLDivElement;
    if(element.className != 'foundUserItem' && element.className != 'userSearchField'){
      element2.style.display = "none";
    }
    if(element.className == 'userSearchField'){
      element2.style.display = "block";
    }
  });

  return (
  <form className = "formContainer" onSubmit={handleSubmit} id ="formId">
        <div className="column">
          <p className="activityInputText">{parcheCreation? "Nombre Parche*":"Nombre Actividad*"} </p>
          <input onChange={getTitle}
          className="activityInputField" required></input>
          <p className="activityInputText">Ubicación*</p>
          <input onChange={getLocation}
            className="activityInputField"
            required
          ></input>
          <p className="activityInputText">Descripción*</p>
          <textarea onChange={getDescription}
            maxLength={200}
            className="activityInputField descriptionInputField"
            required
          ></textarea>
          <p className="activityInputText">Categoria*</p>
          <select onChange={getCategory} className="activityInputField" required>
          <option selected disabled hidden></option>
            {Object.keys(categories).map((categoryId: string) => (
              <option value={categoryId}>{categories[categoryId]}</option>
            ))}
          </select >
        </div>
        <div className="column">
          <p className="activityInputText activityTypeText">{parcheCreation? "Tipo Parche*":"Tipo Actividad*"}</p>
          <div className ="activityTypeContainer">
            <input onClick={getTypeFromEvent} type="radio" className="activityCheckbox2" name="type" defaultChecked  title="Actividad ocasional de duración finita (ej. Festival Estereo Picnic, Concierto Coldplay, etc)."/>
            <label htmlFor="html" title="Actividad ocasional de duración finita (ej. Festival Estereo Picnic, Feria del Libro, etc).">Evento</label><br/>
            <input onClick={getTypeFromPlan} type="radio" className="activityCheckbox3"name="type"
            title="Actividad recurrente, usualmente disponible todo el año (ej. Museo del Oro, Monserrate, etc)"/>
            <label htmlFor="html" title="Actividad recurrente, usualmente disponible todo el año (ej. Museo del Oro, Monserrate, etc)">Plan</label><br/>
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
          <p className="activityInputText">Contacto para información*</p>
          <input onChange={getContact} className="activityInputField" required></input>
        </div>
        <div className="column">
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

          {parcheCreation ? 
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
                <img src={closeIcon2} className="closeButton4" onClick={()=>removeFromSelected(user)} title="Quitar"/>
                :<></>}
                {user}
              </div>    
          ))}
          </div>
          </>
          :
          <></>
          }

          {parcheCreation ? <></>:
          <>
           <div className="uploadContainer">
          <p className="activityInputText">Imagen</p>
          <label htmlFor="upload-photo" className ="uploadImageButton">Seleccionar</label>
            <input type="file" onChange={imageUpload} className ="notShow3" id="upload-photo" ></input>
          </div>
          </>
          }
          {parcheCreation ? <></>: 
          <div className ={image == null ? "imageContainerForm notShow3":"imageContainerForm"} id="imageContainerFormId">
            <img src={closeIcon2} className="closeButton3" onClick={removeImage} title="Quitar Imagen"/>
          </div>
          }
          <button className={"genericButton " + classCustom}>
            <img src={icon} className="activityFormButtonIcon" />
            {text}
          </button>
        </div>
      </form>
    )
}

export default CreateActivityForm