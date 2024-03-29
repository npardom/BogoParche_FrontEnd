import { useState, useEffect } from 'react';
import { Activity } from '../assets/interfaces';
import { categoryNames } from '../assets/functionsAndConstants';
import {locationIcon,categoryIcon,dateIcon,timeIcon,priceIcon,over18Icon,moreInfoIcon} from '../imports';

// It renders the main features of an activity 
function ActivityCharacteristics({activity}:{activity: Activity}) {
    const [categories, setCategories] = useState([] as any);

    // Gets all the categories
    useEffect(() => {
      setCategories(categoryNames());
    }, []);

    // It renders the date of an activity,
    // based on wheter startDate = endDate
    function Fecha(){
      if (activity.fecha_inicio === activity.fecha_fin) {
        return (
          <div className="featureText">{new Date(activity.fecha_inicio).toLocaleDateString()}</div>
        )
      } else{
        return (
        <>
          <div className="featureText">
          {"Desde " + new Date(activity.fecha_inicio.replace(/-/g, '\/')).toLocaleDateString()}
          </div>
          <div className="featureText">
          {"Hasta " + new Date(activity.fecha_fin.replace(/-/g, '\/')).toLocaleDateString()}
          </div>
        </>
        )
      }
    }

    // It renders the time of an activity,
    // based on wheter startHour = endHour
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

    // Renders the date/time info, based on whether
    // it's a plan or event
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

  return (
    <>
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
    </>
  )
}

export default ActivityCharacteristics