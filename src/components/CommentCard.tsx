import commentBlueIcon from "../assets/icons/commentBlueIcon.png";
import commentPinkIcon from "../assets/icons/commentPinkIcon.png";

function CommentCard({color} : {color:string}) {
  if (color =="pink") {
    color = commentPinkIcon
  } else {
    color = commentBlueIcon
  }
  return (
    <div className="commentCard">
      <img src={color} className="userCommentIcon" />
      <div className="commentTextContainer">
        <div className="commentText">
          "Este es un comentario de prueba. Así se verá en pantalla. En proximos sprints se desarrollará
          esta funcionalidad"
        </div>
        <div className="commentInfo">
          - UsuarioX. 26/03/2023. Calificación 2/5
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
