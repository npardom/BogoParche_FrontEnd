import { commentIcon } from "../imports";
import { Comment } from "../../../assets/interfaces";

function CommentCard({comment} : {comment: Comment}) {
  return (
    <div className="commentCard">
      <img src={commentIcon} className="userCommentIcon" />
      <div className="commentTextContainer">
        <div className="commentText">
        "{comment.comment}"
        </div>
        <div className="commentInfo">
          - {comment.username}. {comment.date}. Calificación {comment.score}/5
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
