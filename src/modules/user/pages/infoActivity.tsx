import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Activity,  Comment } from "../../../assets/interfaces";
import { togglePopUp, loggedInUser, isAdmin, accessToken, updateRefreshToken} from "../../../assets/functionsAndConstants";
import { goBackIcon, pencilIcon, createParcheIcon, reviewIcon, favoriteIcon, minusIcon, CommentCard, CommentForm, ActivityCharacteristics,parcheOutIcon} from '../imports';

// Card that shows the full information of a public activity
function InfoActivity() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const [image, setImage] = useState(null as any);
  const [willAssist, setWillAssist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [commentList, setCommentList] = useState([] as Comment[]);
  const navigate = useNavigate();

  // Gets the activity from the URL
  useEffect(() => {
    var id = slug as any;
    fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/activity/"+id , {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken()
      } 
    })
    .then((res) => res.json())
    .then((dato) => {
      if(dato.error){
        navigate("/");
      }else{
        setImage(dato.image)
        setActivity(dato);
        setCommentList(dato.comments);
        if(dato.attendance){
          setWillAssist(true)
        }else{
          setWillAssist(false)
        }
        if(dato.favorite){
          setIsFavorite(true)
        }else{
          setIsFavorite(false)
        }
      }
    });
  }, []);


  useEffect(() => {
    if(!activity.es_privada){
      var element= document.getElementById("imageContainerFormId") as any;
      element.style.backgroundImage = "url('" + image +"')";
    }
  }, [image]);

  // Redirects to the editing page for the current activity
  function goToEdit(id: string){
    navigate("/editarActividad/"+ id);
  }

  function leaveParche(){
    var opcion = confirm("¿Desea salir de este parche?");
    if (opcion == false) {return};
    fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/visibility/"+activity.id , {
      method: "DELETE",
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken()
      } 
    })
    .then((res) => res.json())
    .then((dato) => {
      if(dato.msg =="Visibility succesfully deleted"){
        navigate("/parches");
      }else{
        alert("Ocurrió un error. Intenta de nuevo.")
        updateRefreshToken();
      }
    });
  }

  // Sets the Edit Button
  function EditButton(){
    if(isAdmin() && !activity.es_privada || (loggedInUser() && activity.es_privada && activity.owned)){
      return (
        <button className='editActivityButton' onClick = {()=> goToEdit(activity.id.toString())} title ={activity.es_privada ? "Editar parche": "Editar actividad"}>
          <img src={pencilIcon} className="pageTitleIcon2" />
        </button>
      )
    }else if(loggedInUser() && activity.es_privada && !activity.owned){
      return (
        <button className='editActivityButton outOfParcheButton' onClick = {leaveParche} title ="Salir del parche">
          <img src={parcheOutIcon} className="pageTitleIcon2" />
        </button>
      )
    } else {
      return <></>
    }
  }

  // Toggles the "Will Assist" state of an activity
  function handleWillAssist(){
    if(loggedInUser()){
      if (willAssist){
        fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/attendance/" + activity.id, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken(),
          },
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.msg =="Attendance succesfully deleted"){
            setWillAssist(false)
          }else{
            updateRefreshToken();
          }
        })
      }else{
        const body = {
          id_actividad: activity.id,
        }
        fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/attendance", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken(),
          },
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.msg =="Attendance succesfully added"){
            setWillAssist(true)
          }else{
            updateRefreshToken();
          }
        })
      }
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  // Toggles the "Favorite" state of an activity
  function switchFavorites(){
    if(loggedInUser()){
      if (isFavorite){
        fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/favorite/" + activity.id, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken(),
          },
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.msg =="Favorite succesfully deleted"){
            setIsFavorite(false)
          }else{
            updateRefreshToken();
          }
        })
      }else{
        const body = {
          id_actividad: activity.id,
        }
        fetch("https://bogoparchebackend-production-5a1a.up.railway.app/api/favorite", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken(),
          },
        })
        .then((res) => res.json())
        .then((res) => {
          if(res.msg =="Favorite succesfully added"){
            setIsFavorite(true)
          }else{
            updateRefreshToken();
          }
        })
      }
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  // Shows the comment fields if logged in
  function showCommentBox(){
    if(loggedInUser()){
      togglePopUp("commentForm", false);
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  // Handle the parche button
  function createParche(){
    if(loggedInUser()){
      createParcheInstance();
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  // Creates the parche
  function createParcheInstance() {
    if (activity.es_plan){
      var APIname = "https://bogoparchebackend-production-5a1a.up.railway.app/api/plan"
    } else {
      var APIname = "https://bogoparchebackend-production-5a1a.up.railway.app/api/event"
    }
    var horaInicio = activity.es_plan ? activity.hora_inicio:activity.hora_inicio.slice(0,5);
    var horaFin = activity.es_plan ? activity.hora_fin:activity.hora_fin.slice(0,5);
    const body = {
      titulo_actividad: activity.titulo_actividad,
      ubicacion: activity.ubicacion,
      id_categoria: activity.id_categoria,
      rango_precio: activity.rango_precio,
      descripcion: activity.descripcion,
      restriccion_edad: activity.restriccion_edad,
      medio_contacto: activity.medio_contacto,
      es_privada: true,
      fecha_inicio: activity.fecha_inicio,
      fecha_fin: activity.fecha_fin,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      es_plan: activity.es_plan,
      horario_plan: activity.horario_plan,
      users: [],
      image: null,
      id_related_public_activity: activity.id
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
        alert("Parche creado exitosamente.");
        navigate("/parches")
      } else {
        alert("Ocurrió un error. Intenta de nuevo.");
        updateRefreshToken();
      }
    });  
  };

  // It renders the comment section
  function CommentCards() {
    if (commentList.length == 0) {
      return (
        <p className="noCommentsText">No hay comentarios para {activity.es_privada ?"este parche": "esta actividad"}</p>
      );
    } else {
      return (
        <>
          {commentList.map((comentario: Comment) => (
            <CommentCard comment = {comentario} isPrivate = {activity.es_privada}/>
          ))}
        </>
      );
    }
  }

  function goBack(){
    if(activity.es_privada){
      navigate("/parches")
    }else{
      navigate("/")
    }
  }
  
  return (
    <div className={activity.es_privada ? "infoBox createParcheCard":"infoBox"}> 
      <div className="infoActivityContainer">
        <div className = "bottomTwoButtonsContainer">
        <button onClick = {goBack} className="genericButton volver">
            <img src={goBackIcon} className="activityFormButtonIcon" />
            Volver
        </button>
        <div className="pageTitle">
          <div className="pageTitleText">{activity.titulo_actividad}</div>
          <EditButton/>
        </div>
        <div className = "verticalButtonContainer">
        <button className={isFavorite?"genericButton favorito yesFavorito":"genericButton favorito"} onClick = {switchFavorites} id ="favoriteButton">
          {isFavorite?
          <img src={minusIcon} className="activityFormButtonIcon" />
          :
          <img src={favoriteIcon} className="activityFormButtonIcon" />
          }
          <p className = "toggledText">{isFavorite? "Quitar de favoritos": "Añadir a favoritos"}</p>
        </button>
        <button className={willAssist?"genericButton willAssistButton onButton":"genericButton willAssistButton"} onClick ={handleWillAssist}>
         <p className = "toggledText">{willAssist? "Sí pienso asistir": "No pienso asistir"}</p>
          <div className={willAssist?"assistCheckboxBackground onCheckbox":"assistCheckboxBackground"} >
            <div className="assistCheckbox" ></div>
          </div>
        </button>
        </div>
        </div>
       <div className = "twoColumnsFeatureContainer">
          <div className ="columnFeaturesContainer">
            {activity.es_privada ? <></>: 
            <div className="imageContainerDecor">
              <div className ={image == null ? "imageContainerBack notShow3":"imageContainerBack"}>
              </div>
              <div className ={image == null ? "imageContainerForm2 notShow3":"imageContainerForm2"} id="imageContainerFormId">
              </div>
            </div>
            }
            <ActivityCharacteristics activity = {activity}/>
          </div>
          <div className ="columnDescriptionReviewsContainer">
            <div className="featureBox">
              <div>
                <div className="featureTitleText">Acerca {activity.es_privada ? "del parche":"de la actividad"}</div>
                <div className="featureText">{activity.descripcion}</div>
              </div>
            </div>
            <div className="featureTitleText specialFeatureTitle">¿Qué dice la gente?</div>
            <div className = "containerComments">
              <CommentCards/>
            </div>
          </div>
        </div>

        <div className = "bottomTwoButtonsContainer2">
          {activity.es_privada ? <></>:<button className="genericButton parche" onClick = {createParche}>
            <img src={createParcheIcon} className="activityFormButtonIcon" />Crear Parche
          </button>}
          <button className="genericButton reseña" onClick = {showCommentBox}>
            <img src={reviewIcon} className="activityFormButtonIcon" /> Añadir {activity.es_privada ? "comentario": "reseña"}
          </button>
        </div>
      </div>
      {loggedInUser()?<CommentForm id ={activity.id} isPrivate= {activity.es_privada}/>: <></>}
    </div>
  );
}

export default InfoActivity