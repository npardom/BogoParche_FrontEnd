import { commentIcon, closeIcon } from "../imports";
import { Comment } from "../../../assets/interfaces";
import { accessToken, updateRefreshToken} from "../../../assets/functionsAndConstants";

function CommentCard({comment} : {comment: Comment}) {
  var date: string = new Date(comment.created_at.toString().slice(0,10)).toLocaleDateString();

  function deleteComment(){
    fetch("/api/comment/" + comment.id_comentario, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken()
      },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.msg === "Comment succesfully deleted") {
        window.location.reload();
      }else {
        updateRefreshToken();
      }
    });
  }

  return (
    <div className="commentCard">
      {comment.owned ? 
      <img src={closeIcon} alt="Cerrar" className="closeButton2" onClick={deleteComment} title="Eliminar Comentario"/>: <></>}
      <img src={commentIcon} className="userCommentIcon" />
      <div className="commentTextContainer">
        <div className="commentText">
        "{comment.texto_comentario}"
        </div>
        <div className="commentInfo">
        - {comment.username}. {date}. <span className="notStarsComment">{"★".repeat(comment.calificacion)}</span><span className="starsComment">{"☆".repeat(5-comment.calificacion)}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
