import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Activity,  Comment } from "../../../assets/interfaces";
import { togglePopUp, loggedInUser, isAdmin, accessToken, updateRefreshToken} from "../../../assets/functionsAndConstants";
import { goBackIcon, pencilIcon, createParcheIcon, reviewIcon, favoriteIcon, minusIcon, CommentCard, CommentForm, ActivityCharacteristics} from '../imports';

// Card that shows the full information of a public activity
function InfoActivity() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const [willAssist, setWillAssist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [commentList, setCommentList] = useState([] as Comment[]);
  const navigate = useNavigate();

  // Gets the comments from the activity
  useEffect(() => {
    var id = slug as any;
    if(activity.titulo_actividad){
      fetch("/api/comment/" + id, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken()
        },
      })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setCommentList(response);
        }else {
          updateRefreshToken();
        }
      });
    }
  }, [activity]);

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

  // Redirects to the editing page for the current activity
  function goToEdit(id: string){
    navigate("/editarActividad/"+ id);
  }

  // Sets the Edit Button
  function EditButton(){
    if(isAdmin() || (loggedInUser() && activity.es_privada)){
      return (
        <button className='editActivityButton' onClick = {()=> goToEdit(activity.id.toString())} title ={activity.es_privada ? "Editar parche": "Editar actividad"}>
          <img src={pencilIcon} className="pageTitleIcon2" />
        </button>
      )
    } else {
      return <></>
    }
  }

  // Checking if an activity is marked as favorite
  useEffect(()=>{
    if (activity.titulo_actividad && loggedInUser()){
      fetch("/api/favorite/" + activity.id, {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken(),
        } 
      })
      .then((res) => res.json())
      .then((dato) => {
        if (dato.exists === true){
          setIsFavorite(true)
        } else if (dato.exists === false){
          setIsFavorite(false)
        } else {
          updateRefreshToken();
        }
      })
    }
  }, [activity])

  // Checking if an activity is marked as willAssist
  useEffect(()=>{
    if (activity.titulo_actividad && loggedInUser()){
      fetch("/api/attendance/" + activity.id, {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken(),
        } 
      })
      .then((res) => res.json())
      .then((dato) => {
        if (dato.exists === true){
          setWillAssist(true)
        } else if (dato.exists === false){
          setWillAssist(false)
        } else {
          updateRefreshToken();
        }
      })
    }
  }, [activity])

  // Toggles the "Will Assist" state of an activity
  function handleWillAssist(){
    if(loggedInUser()){
      if (willAssist){
        fetch("/api/attendance/" + activity.id, {
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
        fetch("/api/attendance", {
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
        fetch("/api/favorite/" + activity.id, {
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
        fetch("/api/favorite", {
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

  // Creates an instance of parche
  function createParche(){
    if(loggedInUser()){
      return
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

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
            <ActivityCharacteristics activity = {activity}/>
          </div>
          <div className ="columnDescriptionReviewsContainer">
            <div className="featureBox">
              <div>
                <div className="featureTitleText">Acerca {activity.es_privada ? "del parche":"de la actividad"}</div>
                <div className="featureText">{activity.descripcion}</div>
              </div>
            </div>
            <div className="featureTitleText specialFeatureTitle">¿Que dice la gente?</div>
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