import { commentIcon } from "../imports";
import { Comment } from "../../../assets/interfaces";

function CommentCard({comment} : {comment: Comment}) {
  var date: string = new Date(comment.createdAt.toString().slice(0,10)).toLocaleDateString();
  return (
    <div className="commentCard">
      <img src={commentIcon} className="userCommentIcon" />
      <div className="commentTextContainer">
        <div className="commentText">
        "{comment.texto_comentario}"
        </div>
        <div className="commentInfo">
          - {comment.id_usuario}. {date}. Calificación {comment.calificacion}/5
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
