import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Activity } from "../assets/datos";
import goBackIcon from "../assets/icons/goBackIcon.png";
import locationIcon from "../assets/icons/locationIcon.png";
import categoryIcon from "../assets/icons/categoryIcon.png";
import dateIcon from "../assets/icons/dateIcon.png";
import timeIcon from "../assets/icons/timeIcon.png";
import priceIcon from "../assets/icons/priceIcon.png";
import pencilIcon from "../assets/icons/pencilIcon.png";
import over18Icon from "../assets/icons/over18Icon.png";
import moreInfoIcon from "../assets/icons/moreInfoIcon.png";
import createParcheIcon from "../assets/icons/createParcheIcon.png";
import reviewIcon from "../assets/icons/reviewIcon.png";
import favoriteIcon from "../assets/icons/favoriteIcon.png";
import CommentCard from '../components/CommentCard';

function InfoActividad() {
  const { slug } = useParams();
  const [activity, setActivity] = useState({} as Activity);
  const [user, setUser] = useState("");
  const [willAssist, setWillAssist] = useState(false);

  const navigate = useNavigate();
  const [categories, setCategories] = useState([] as any);

  useEffect(()=>{
    fetch("/api/get-categories", {
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

  function goToEdit(){
    var typeOfAct = activity.es_plan ? "plan": "evento";
    navigate("/editarActividad/"+ typeOfAct + activity.id_actividad.toString())
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  function EditButton(){
    if(user){
      return (
        <button className='editActivityButton' onClick = {goToEdit}>
          <img src={pencilIcon} className="pageTitleIcon2" />
        </button>
      )
    } else {
      return <></>
    }
  }

  function goToCatalogue(){
    navigate("/")
  }

  function showPopUp (){
    var element = document.getElementById("registerPopUpBackground") as HTMLDivElement;
    element.classList.add('appeared');
    element = document.getElementById("registerPopUp") as HTMLDivElement;
    element.classList.add('movedDown');
  }

  function DateTime (){
    if (activity.es_plan){
      return (
        <div className="featureBox">
          <img src={timeIcon} className="featureIcon" />
          <div>
            <div className="featureTitleText">Horario</div>
            <div className="featureText">{activity.horario_plan}</div>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div className="featureBox">
            <img src={dateIcon} className="featureIcon" />
            <div>
              <div className="featureTitleText">Fecha</div>
              <Fecha/>
            </div>
          </div>
          <div className="featureBox">
            <img src={timeIcon} className="featureIcon" />
            <div>
              <div className="featureTitleText">Hora</div>
              <Hora/>
            </div>
          </div>
        </>
      )
    }
  }

  function Fecha(){
    if (activity.fecha_inicio === activity.fecha_fin) {
      return (
        <div className="featureText">{new Date(activity.fecha_inicio).toLocaleDateString()}</div>
      )
    } else{
      return (
      <>
        <div className="featureText">
        {"Desde " + new Date(activity.fecha_inicio).toLocaleDateString()}
        </div>
        <div className="featureText">
        {"Hasta " + new Date(activity.fecha_fin).toLocaleDateString()}
        </div>
      </>
      )
    }
  }

  function Hora(){
    if (activity.hora_inicio === activity.hora_fin) {
      return (
        <div className="featureText">{activity.hora_inicio.slice(0,5)}</div>
      )
    } else{
      return (
      <>
        <div className="featureText">
        {"Desde " + activity.hora_inicio.slice(0,5)}
        </div>
        <div className="featureText">
        {"Hasta " + activity.hora_fin.slice(0,5)}
        </div>
      </>
      )
    }
  }

  function toggleCheckbox(){
    if(user){
      var element = document.getElementById("assistCheck") as HTMLDivElement;
      if (element.classList.toString() === "assistCheckboxBackground on"){
        setWillAssist(false)
        element.classList.remove('on');
      }else{
        setWillAssist(true)
        element.classList.add('on');
      }
    }else{
      showPopUp();
    }
  }

  function addToFavorites(){
    if(user){
      return
    }else{
      showPopUp();
    }
  }

  function addComment(){
    if(user){
      return
    }else{
      showPopUp();
    }
  }

  function createParche(){
    if(user){
      return
    }else{
      showPopUp();
    }
  }

  return (
    <div className="infoBox"> 
      <div className="infoActivityContainer">
        <div className = "bottomTwoButtonsContainer">
        <Button onClick = {goToCatalogue} className="activityButton volver">
            <img src={goBackIcon} className="activityFormButtonIcon" />
            Volver
        </Button>
        <div className="pageTitle">
          <div className="pageTitleText">{activity.titulo_actividad}</div>
          <EditButton/>
        </div>
        <div className = "verticalButtonContainer">
        <Button className="activityButton favorito" onClick = {addToFavorites}>
            <img src={favoriteIcon} className="activityFormButtonIcon" />Añadir a favoritos
        </Button>
        <Button className="activityButton willAssistButton" onClick ={toggleCheckbox}>
          Planeo asistir
          <div id = "assistCheck" className="assistCheckboxBackground" >
            <div className="assistCheckbox" ></div>
          </div>
        </Button>
        </div>
        </div>
       <div className = "twoColumnsFeatureContainer">
          <div className ="columnFeaturesContainer">
            <div className="featureBox">
              <img src={locationIcon} className="featureIcon" />
              <div>
                <div className="featureTitleText">Ubicación</div>
                <div className="featureText">{activity.ubicacion}</div>
              </div>
            </div>
            <div className="featureBox">
              <img src={categoryIcon} className="featureIcon" />
              <div>
                <div className="featureTitleText">Categoría</div>
                <div className="featureText">{categories[activity.id_categoria]}</div>
              </div>
            </div>
            {activity.titulo_actividad ? <DateTime/>: <></>}
            <div className="featureBox">
              <img src={priceIcon} className="featureIcon" />
              <div>
                <div className="featureTitleText">Rango Precios</div>
                <div className="featureText">{activity.rango_precio}</div>
              </div>
            </div>
            <div className="featureBox">
              <img src={over18Icon} className="featureIcon" />
              <div>
                <div className="featureTitleText">Restricción Edad</div>
                <div className="featureText">{activity.restriccion_edad ? "Si": "No"}</div>
              </div>
            </div>
            <div className="featureBox">
              <img src={moreInfoIcon} className="featureIcon" />
              <div>
                <div className="featureTitleText">Más Información</div>
                <div className="featureText">{activity.medio_contacto}</div>
              </div>
            </div>
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
            <CommentCard color = "blue"/>
            <CommentCard color = "pink"/>
            <CommentCard color = "blue"/>
            <CommentCard color = "pink"/>
            <CommentCard color = "pink"/>
            <CommentCard color = "blue"/>
            <CommentCard color = "pink"/>
            </div>
          </div>
        </div>

        <div className = "bottomTwoButtonsContainer">
          <Button className="activityButton parche" onClick = {createParche}>
            <img src={createParcheIcon} className="activityFormButtonIcon" />Crear Parche
          </Button>
          <Button className="activityButton reseña" onClick = {addComment}>
            <img src={reviewIcon} className="activityFormButtonIcon" /> Añadir una reseña
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoActividad