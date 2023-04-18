import { useState, useEffect } from "react";
import sendIcon from "../assets/icons/sendIcon2.png";
import cancelIcon from "../assets/icons/cancelIcon.png";

function CommentForm({id}: {id:string}) {

  const [score, setScore] = useState(1);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setScore(parseInt(e.target.value));
  }

  function hideComentForm() {
    var element = document.getElementById("commentForm") as HTMLDivElement;
    element.classList.remove("opacityWhole2")
  }

  const getComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      calificacion: score,
      comentario: comment,
      usuario: user,
      fecha: new Date().toLocaleDateString()
    }
    alert(JSON.stringify(body));
    /*
    fetch("API", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.id){
        alert("La sugerencia fue enviada exitosamente.");
        window.location.reload();
      } else {
        alert("Ocurrió un error. Intenta de nuevo.");
      }
    });
    */
  };

  return (
    <div id = {id} className = "commentFormCard">
        <p className="commentFormTitle">Cuentanos tu opinión</p>
        <form onSubmit={handleSubmit}>
            <div className="featureTitleText darkerColor">Calificación</div>
            <form className="star-rating" onChange={handleFormChange}>
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
              <button className="sendButton">
                <img src={sendIcon} className="activityFormButtonIcon" />
                Enviar
              </button>
              <button type="button" className="sendButton cancel" onClick= {hideComentForm}>
                  <img src={cancelIcon} className="activityFormButtonIcon" />
                  Cancelar
              </button>
            </div>
        </form>
    </div>
  );
}

export default CommentForm;
