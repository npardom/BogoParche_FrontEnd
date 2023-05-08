import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Activity,  Comment } from "../../../assets/interfaces";
import { togglePopUp } from "../../../assets/functionsAndConstants";
import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';
import ActivityCharacteristics from '../../../components/ActivityCharacteristics';
import { goBackIcon, pencilIcon, createParcheIcon, reviewIcon, favoriteIcon, minusIcon } from '../imports';

// Card that shows the full information of a public activity
function InfoActividad() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const [willAssist, setWillAssist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [commentList, setCommentList] = useState([] as Comment[]);
  const [favoriteId, setFavoriteId] = useState(0);
  const navigate = useNavigate();
  // This will allow us to restrict buttons if the user is not signed up
  const loggedInUser = localStorage.getItem("username");

  useEffect(() => {
    var id = slug as any;
    if(activity.titulo_actividad){
      fetch("/api/activity/get-comments/" + id + "/" + activity.es_plan, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setCommentList(response);
        }
      });
    }
  }, [activity]);


  // Getting the activity from the URL
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
    .then((dato) => {setActivity(dato)})
    .catch(() => {navigate("/")});
  }, []);

  // Checking if an activity is marked as favorite
  useEffect(()=>{
    if (activity.titulo_actividad && loggedInUser){
      const body = {
        id_actividad: activity.id,
        username: loggedInUser,
        es_plan:activity.es_plan,
      }
      /*
      fetch("/api/get-favorites", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(body),
        headers: {
        "Content-Type": "application/json"
        } 
      })
      .then((res) => res.json())
      .then((dato) => {
        if (dato.error){
          setFavoriteId(0)
          setIsFavorite(false)
        }else{
          setFavoriteId(dato)
          setIsFavorite(true)
        }
      })*/
    }
  }, [activity,isFavorite])

  // Redirects to the editing page for the current activity
  function goToEdit(){
    navigate("/editarActividad/"+ activity.id.toString())
  }
  
  // Sets the Edit Button
  function EditButton(){
    if(loggedInUser){
      return (
        <button className='editActivityButton' onClick = {goToEdit}>
          <img src={pencilIcon} className="pageTitleIcon2" />
        </button>
      )
    } else {
      return <></>
    }
  }

  // Toggles the "Will Assist" state of an activity
  function handleWillAssist(){
    if(loggedInUser){
      if (willAssist){
        setWillAssist(false)
      }else{
        setWillAssist(true)
      }
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  // Toggles the "Favorite" state of an activity
  // and sends the state to the server
  function switchFavorites(){
    if(loggedInUser){
      if (isFavorite){
        fetch("/api/delete-favorites/" + favoriteId, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then(() => {setIsFavorite(false)})
        .catch(() => {alert("Ocurrió un error.")});
      }else{
        const body = {
          id_actividad: activity.id,
          username: loggedInUser,
          es_plan:activity.es_plan,
        }
        fetch("/api/add-favorites" , {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
          headers: {
          "Content-Type": "application/json"
          } 
        })
        .then((res) => res.json())
        .then(() => {setIsFavorite(true)})
        .catch(() => {alert("Ocurrió un error.")});
      }
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  function addComment(){
    if(loggedInUser){
      togglePopUp("commentForm", false);
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  function createParche(){
    if(loggedInUser){
      return
    }else{
      togglePopUp("registerPopUp", false);
    }
  }

  // It renders the comment section
  function CommentCards() {
    if (commentList.length == 0) {
      return (
        <p className="noCommentsText">No hay comentarios para esta actividad</p>
      );
    } else {
      return (
        <>
          {commentList.map((comentario: Comment) => (
            <CommentCard comment = {comentario}/>
          ))}
        </>
      );
    }
  }
  
  return (
    <div className="infoBox"> 
      <div className="infoActivityContainer">
        <div className = "bottomTwoButtonsContainer">
        <button onClick = {()=>navigate("/")} className="genericButton volver">
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
                <div className="featureTitleText">Acerca de la actividad</div>
                <div className="featureText">{activity.descripcion}</div>
              </div>
            </div>
            <div className="featureTitleText specialFeatureTitle">¿Que dice la gente?</div>
            <div className = "containerComments">
              <CommentCards/>
            </div>
          </div>
        </div>

        <div className = "bottomTwoButtonsContainer">
          <button className="genericButton parche" onClick = {createParche}>
            <img src={createParcheIcon} className="activityFormButtonIcon" />Crear Parche
          </button>
          <button className="genericButton reseña" onClick = {addComment}>
            <img src={reviewIcon} className="activityFormButtonIcon" /> Añadir una reseña
          </button>
        </div>
      </div>
      {loggedInUser?<CommentForm id ={activity.id} isPlan={activity.es_plan} />: <></>}
    </div>
  );
}

export default InfoActividad