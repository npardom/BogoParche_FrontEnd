import commentIcon from "../assets/icons/commentIcon.png";
import { Comment } from "../assets/datos";

function CommentCard({comment} : {comment: Comment}) {
  return (
    <div className="commentCard">
      <img src={commentIcon} className="userCommentIcon" />
      <div className="commentTextContainer">
        <div className="commentText">
        "{comment.comentario}"
        </div>
        <div className="commentInfo">
          - {comment.usuario}. {comment.fecha}. Calificación {comment.calificacion}/5
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
