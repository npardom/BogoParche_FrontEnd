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
        - {comment.user.username}. {date}. <span className="notStarsComment">{"★".repeat(comment.calificacion)}</span><span className="starsComment">{"☆".repeat(5-comment.calificacion)}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
