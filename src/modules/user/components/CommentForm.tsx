import { useState } from "react";
import { togglePopUp } from "../../../assets/functionsAndConstants";
import { sendIcon, cancelIcon } from "../imports";

function CommentForm({id, isPlan}: {id: number,isPlan: boolean}) {
  const [score, setScore] = useState(1);
  const [comment, setComment] = useState("");
  // Get access token
  const accessToken = localStorage.getItem("access");
  // Get refresh token
  const refreshToken = localStorage.getItem("refresh");

  // It gets the input of the comment from the input fields
  const handleScoreChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setScore(parseInt(e.target.value));
  }
  const getComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  function updateRefreshToken(){
    fetch("/api/refresh", {
      method: "POST",
      mode: "cors",
      body: refreshToken,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken,
      },
    })
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
    });
  }

  // It sends the comment to the server to be stored
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      calificacion: score,
      texto_comentario: comment,
      id_actividad: id,
      es_plan: isPlan,
    }
    fetch("/api/activity/comment", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken,
      },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.result){
        alert("Comentario creado exitosamente.");
        window.location.reload();
      } else {
        alert("Ocurrió un error. Intenta de nuevo.");
      }
    })
    .catch(error => {
      if (error.message === '401') {
        updateRefreshToken();
      }
    });
  };

  return (
    <>
    <div className ="registerPopUpWhole" id = "commentFormBackground" onClick ={()=>togglePopUp("commentForm", true)}>
    </div>
    <div id = "commentForm" className = "commentFormCard">
        <p className="commentFormTitle">Cuentanos tu opinión</p>
        <form onSubmit={handleSubmit}>
            <div className="featureTitleText darkerColor">Calificación</div>
            <form className="star-rating" onChange={handleScoreChange}>
                <input className="radio-input" type="radio" id="star5" name="star-input" value="5" />
                <label className="radio-label" htmlFor="star5"></label>
                <input className="radio-input" type="radio" id="star4" name="star-input" value="4" />
                <label className="radio-label" htmlFor="star4"></label>
                <input className="radio-input" type="radio" id="star3" name="star-input" value="3" />
                <label className="radio-label" htmlFor="star3"></label>
                <input className="radio-input" type="radio" id="star2" name="star-input" value="2" />
                <label className="radio-label" htmlFor="star2"></label>
                <input className="radio-input" type="radio" id="star1" name="star-input" value="1" defaultChecked/>
                <label className="radio-label" htmlFor="star1"></label>
            </form>
            <div className="featureTitleText darkerColor">Comentarios</div>
            <textarea
            onChange={getComment}
            className="activityInputField commentInputField"
            required
            maxLength={150}
            ></textarea>
            <div className="twoButtonsContainer">
              <button className="genericButton sendButton2">
                <img src={sendIcon} className="activityFormButtonIcon" />
                Enviar
              </button>
              <button type="button" className="genericButton cancel" onClick= {()=>togglePopUp("commentForm", true)}>
                  <img src={cancelIcon} className="activityFormButtonIcon" />
                  Cancelar
              </button>
            </div>
        </form>
    </div>
    </>
  );
}

export default CommentForm;
