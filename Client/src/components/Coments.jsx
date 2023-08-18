import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, deleteComment } from '../redux/actions';

const CommentsList = ({ productId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getComments(productId));
  }, [dispatch, productId]);

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
