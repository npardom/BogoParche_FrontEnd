import closeIcon from "../assets/icons/closeIcon.png";
import ActivityCharacteristics from "./ActivityCharacteristics";
import { hideSuggestionCard } from "../assets/datos";

function InformationSuggestion() {
  const testActivity = {
    id_actividad: 52,
    titulo_actividad: 'Filbo',
    ubicacion: 'Corferias',
    id_categoria: 1,
    rango_precio: '10k - 50k',
    descripcion: '¡Hola! es una revista semanal española especializada en noticias de celebridades',
    restriccion_edad: false,
    medio_contacto: 'filbo.gov.co',
    fecha_inicio: '2023-04-18',
    fecha_fin: '2023-05-02',
    hora_inicio: '08:00',
    horario_plan: "gjkfhk gjk fhkgj kfhkg jkf hkgjkfh k",
    hora_fin: '20:00',
    es_plan: false
  }

  return (
    <>
    <div className ="registerPopUpWhole" id = "informationPopUpBackground" onClick ={hideSuggestionCard}>
    </div>
    <div className="informationPopUpCard" id="informationPopUp">
      <img src={closeIcon} alt="Cerrar" className="closeButton" onClick={hideSuggestionCard} />
      <div className="informationPopUpContainer">
        <h2 className = "suggestionPopUpTitle">{testActivity.titulo_actividad}</h2>
        <div className="informationGrid">
          <ActivityCharacteristics activity = {testActivity}/>
        </div>
        <div className="featureBox featureBox2">
          <div>
            <div className="featureTitleText">Acerca de la Actividad</div>
            <div className="featureText">{testActivity.descripcion}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default InformationSuggestion;
