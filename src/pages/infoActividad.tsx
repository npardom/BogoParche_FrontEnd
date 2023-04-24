import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Activity, showPopUp, showComentForm, Comment } from "../assets/datos";
import goBackIcon from "../assets/icons/goBackIcon.png";
import pencilIcon from "../assets/icons/pencilIcon.png";
import createParcheIcon from "../assets/icons/createParcheIcon.png";
import reviewIcon from "../assets/icons/reviewIcon.png";
import favoriteIcon from "../assets/icons/favoriteIcon.png";
import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';
import ActivityCharacteristics from '../components/ActivityCharacteristics';

function InfoActividad() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const [willAssist, setWillAssist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const loggedInUser = localStorage.getItem("username");
  const navigate = useNavigate();

  const comentarios: Comment[] = [{
    calificacion: "2",
    comentario: "Este es un comentario de prueba. Será implementado en un futuro sprint.",
    usuario: "usuario1",
    fecha: "24/11/2022"
  },{
    calificacion: "4",
    comentario: "Este es un comentario de prueba. Será implementado en un futuro sprint.",
    usuario: "usuario2",
    fecha: "28/02/2022"
  },{
    calificacion: "5",
    comentario: "Este es un comentario de prueba. Será implementado en un futuro sprint.",
    usuario: "usuario3",
    fecha: "25/4/2022"
  }]

  useEffect(() => {
    var s = slug as any;
    if(s.slice(0,4) == "plan"){
      var isPlan = "true";
      var id = s.slice(4);
    }else{
      var isPlan = "false";
      var id = s.slice(6);
    }
    fetch("/api/get-activity/"+id+"/"+isPlan , {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json"
      } 
    })
    .then((res) => res.json())
    .then((dato) => {
      setActivity(dato)
    })
    .catch(() => {
      navigate("/");
    });
  }, []);

  useEffect(()=>{
    console.log(JSON.stringify(activity))
  }, [activity])

  function goToEdit(){
    var typeOfAct = activity.es_plan ? "plan": "evento";
    navigate("/editarActividad/"+ typeOfAct + activity.id.toString())
  }

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

  function handleWillAssist(){
    if(loggedInUser){
      if (willAssist){
        setWillAssist(false)
      }else{
        setWillAssist(true)
      }
    }else{
      showPopUp();
    }
  }

  function addToFavorites(){
    if(loggedInUser){
      if (isFavorite){
        alert("Ocurrió un e")
      }else{
        const body = {
          id_actividad: activity.id,
          username: localStorage.getItem("username"),
          es_plan:activity.es_plan,
        }
        alert(JSON.stringify(body))
        fetch("/api/add-favorites" , {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
          headers: {
          "Content-Type": "application/json"
          } 
        })
        .then((res) => res.json())
        .then((dato) => {
          setIsFavorite(true)
        })
        .catch(() => {
          alert("Ocurrió un error.")
        });
      }
    }else{
      showPopUp();
    }
  }

  function addComment(){
    if(loggedInUser){
      showComentForm();
    }else{
      showPopUp();
    }
  }

  function createParche(){
    if(loggedInUser){
      return
    }else{
      showPopUp();
    }
  }

  function CommentCards() {
    if (comentarios.length == 0) {
      return (
        <p className="noCommentsText">No hay comentarios para esta actividad</p>
      );
    } else {
      return (
        <>
          {comentarios.map((comentario: Comment) => (
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
        <button className={isFavorite?"genericButton favorito yesFavorito":"genericButton favorito"} onClick = {addToFavorites} id ="favoriteButton">
            <img src={favoriteIcon} className="activityFormButtonIcon" />
            {isFavorite? "Quitar de favoritos": "Añadir a favoritos"}
        </button>
        <button className={willAssist?"genericButton willAssistButton onButton":"genericButton willAssistButton"} onClick ={handleWillAssist}>
         {willAssist? "Sí pienso asistir": "No pienso asistir"}
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
      {loggedInUser?<CommentForm id ="commentForm" />: <></>}
    </div>
  );
}

export default InfoActividad